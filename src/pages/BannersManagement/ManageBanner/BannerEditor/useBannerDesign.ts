import { useCallback, useEffect, useRef, useState } from "react";

import {
    createEmptyDesign,
    type BannerDesign,
    type BannerElement,
    type ShapeType,
} from "./BannerEditor.types";

const MAX_HISTORY = 30;
const MAX_IMAGE_PREVIEW_WIDTH = 400;
// Konva re-rasterizes whatever resolution it's given on every drag/redraw, so
// handing it an unresized multi-thousand-pixel upload makes the canvas hang
// (and can crash the tab) while dragging or scrolling. 2400px comfortably
// covers a full-bleed image at the largest size we actually export (a
// 1200-wide canvas preset at pixelRatio 2 — see export.ts) with no visible
// quality loss, while cutting typical raw photo/stock-graphic uploads down
// from 10s of megapixels to a few.
const MAX_EDITOR_IMAGE_DIMENSION = 2400;

let idCounter = 0;
const nextId = (prefix: string) => `${prefix}-${Date.now()}-${idCounter++}`;

const TEXT_DEFAULTS = {
    fontSize: 24,
    fontFamily: "sans-serif",
    fill: "#000000",
    fontStyle: "normal" as const,
    align: "left" as const,
    width: 260,
};

const SHAPE_DEFAULTS: Record<ShapeType, { width: number; height: number }> = {
    rect: { width: 200, height: 120 },
    circle: { width: 120, height: 120 },
};

const loadImageElement = (src: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = src;
    });

type PreparedImage = {
    file: File;
    src: string;
    width: number;
    height: number;
};

// Loads the file, and if it exceeds MAX_EDITOR_IMAGE_DIMENSION, downsamples it
// via an offscreen canvas so the resulting file/object-URL is what actually
// gets fed into Konva (and later uploaded) — never the raw original.
const prepareImageFile = async (file: File): Promise<PreparedImage> => {
    const originalSrc = URL.createObjectURL(file);

    let img: HTMLImageElement;
    try {
        img = await loadImageElement(originalSrc);
    } catch {
        return { file, src: originalSrc, width: 200, height: 200 };
    }

    const { naturalWidth, naturalHeight } = img;
    const longestEdge = Math.max(naturalWidth, naturalHeight);

    if (longestEdge <= MAX_EDITOR_IMAGE_DIMENSION) {
        return { file, src: originalSrc, width: naturalWidth, height: naturalHeight };
    }

    const scale = MAX_EDITOR_IMAGE_DIMENSION / longestEdge;
    const width = Math.max(1, Math.round(naturalWidth * scale));
    const height = Math.max(1, Math.round(naturalHeight * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    const blob = ctx
        ? await new Promise<Blob | null>((resolve) => {
              ctx.drawImage(img, 0, 0, width, height);
              canvas.toBlob(resolve, "image/png");
          })
        : null;

    URL.revokeObjectURL(originalSrc);

    if (!blob) {
        return {
            file,
            src: URL.createObjectURL(file),
            width: naturalWidth,
            height: naturalHeight,
        };
    }

    const resizedFile = new File([blob], file.name, { type: "image/png" });
    return {
        file: resizedFile,
        src: URL.createObjectURL(resizedFile),
        width,
        height,
    };
};

export const useBannerDesign = (initialDesign?: BannerDesign) => {
    const [design, setDesignState] = useState<BannerDesign>(
        () => initialDesign ?? createEmptyDesign(),
    );
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [past, setPast] = useState<BannerDesign[]>([]);
    const [future, setFuture] = useState<BannerDesign[]>([]);

    const pendingImageFilesRef = useRef<Map<string, File>>(new Map());
    const pendingBackgroundFileRef = useRef<File | null>(null);
    const objectUrlsRef = useRef<Set<string>>(new Set());

    useEffect(() => {
        const objectUrls = objectUrlsRef.current;
        return () => {
            objectUrls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, []);

    const setDesign = useCallback(
        (updater: (prev: BannerDesign) => BannerDesign) => {
            setDesignState((prev) => {
                const next = updater(prev);
                setPast((history) => [...history, prev].slice(-MAX_HISTORY));
                setFuture([]);
                return next;
            });
        },
        [],
    );

    const resetDesign = useCallback((next: BannerDesign) => {
        setDesignState(next);
        setPast([]);
        setFuture([]);
        setSelectedId(null);
        pendingImageFilesRef.current.clear();
        pendingBackgroundFileRef.current = null;
    }, []);

    const undo = useCallback(() => {
        if (past.length === 0) return;
        const previous = past[past.length - 1];
        setPast(past.slice(0, -1));
        setFuture([design, ...future]);
        setDesignState(previous);
    }, [past, future, design]);

    const redo = useCallback(() => {
        if (future.length === 0) return;
        const [next, ...rest] = future;
        setFuture(rest);
        setPast([...past, design].slice(-MAX_HISTORY));
        setDesignState(next);
    }, [past, future, design]);

    const canUndo = past.length > 0;
    const canRedo = future.length > 0;

    const addText = useCallback(() => {
        const id = nextId("text");
        setDesign((prev) => ({
            ...prev,
            elements: [
                ...prev.elements,
                {
                    id,
                    type: "text",
                    x: prev.canvasWidth / 2 - TEXT_DEFAULTS.width / 2,
                    y: prev.canvasHeight / 2 - 20,
                    rotation: 0,
                    text: "Double-click to edit",
                    ...TEXT_DEFAULTS,
                },
            ],
        }));
        setSelectedId(id);
    }, [setDesign]);

    const addImage = useCallback(
        async (file: File) => {
            const {
                file: preparedFile,
                src,
                width: naturalWidth,
                height: naturalHeight,
            } = await prepareImageFile(file);
            objectUrlsRef.current.add(src);
            const ratio =
                naturalWidth > MAX_IMAGE_PREVIEW_WIDTH
                    ? MAX_IMAGE_PREVIEW_WIDTH / naturalWidth
                    : 1;
            const width = Math.max(1, Math.round(naturalWidth * ratio));
            const height = Math.max(1, Math.round(naturalHeight * ratio));
            const id = nextId("image");
            pendingImageFilesRef.current.set(id, preparedFile);

            setDesign((prev) => ({
                ...prev,
                elements: [
                    ...prev.elements,
                    {
                        id,
                        type: "image",
                        x: prev.canvasWidth / 2 - width / 2,
                        y: prev.canvasHeight / 2 - height / 2,
                        rotation: 0,
                        src,
                        width,
                        height,
                    },
                ],
            }));
            setSelectedId(id);
        },
        [setDesign],
    );

    const addShape = useCallback(
        (shapeType: ShapeType) => {
            const id = nextId("shape");
            const { width, height } = SHAPE_DEFAULTS[shapeType];
            setDesign((prev) => ({
                ...prev,
                elements: [
                    ...prev.elements,
                    {
                        id,
                        type: "shape",
                        shapeType,
                        x: prev.canvasWidth / 2 - width / 2,
                        y: prev.canvasHeight / 2 - height / 2,
                        rotation: 0,
                        width,
                        height,
                        fill: "#2A5C42",
                    },
                ],
            }));
            setSelectedId(id);
        },
        [setDesign],
    );

    const updateElement = useCallback(
        (id: string, patch: Partial<BannerElement>) => {
            setDesign((prev) => ({
                ...prev,
                elements: prev.elements.map((el) =>
                    el.id === id ? ({ ...el, ...patch } as BannerElement) : el,
                ),
            }));
        },
        [setDesign],
    );

    const removeElement = useCallback(
        (id: string) => {
            pendingImageFilesRef.current.delete(id);
            setDesign((prev) => ({
                ...prev,
                elements: prev.elements.filter((el) => el.id !== id),
            }));
            setSelectedId((current) => (current === id ? null : current));
        },
        [setDesign],
    );

    const deleteSelected = useCallback(() => {
        if (!selectedId) return;
        removeElement(selectedId);
    }, [selectedId, removeElement]);

    const moveElement = useCallback(
        (id: string, direction: "forward" | "backward") => {
            setDesign((prev) => {
                const index = prev.elements.findIndex((el) => el.id === id);
                if (index === -1) return prev;
                const targetIndex =
                    direction === "forward" ? index + 1 : index - 1;
                if (targetIndex < 0 || targetIndex >= prev.elements.length) {
                    return prev;
                }
                const elements = [...prev.elements];
                const [moved] = elements.splice(index, 1);
                elements.splice(targetIndex, 0, moved);
                return { ...prev, elements };
            });
        },
        [setDesign],
    );

    const setBackgroundColor = useCallback(
        (color: string) => {
            setDesign((prev) => ({ ...prev, backgroundColor: color }));
        },
        [setDesign],
    );

    const setBackgroundImageFile = useCallback(
        async (file: File | null) => {
            if (!file) {
                pendingBackgroundFileRef.current = null;
                setDesign((prev) => ({ ...prev, backgroundImage: null }));
                return;
            }
            const { file: preparedFile, src } = await prepareImageFile(file);
            objectUrlsRef.current.add(src);
            pendingBackgroundFileRef.current = preparedFile;
            setDesign((prev) => ({ ...prev, backgroundImage: src }));
        },
        [setDesign],
    );

    const setCanvasSize = useCallback(
        (width: number, height: number) => {
            setDesign((prev) => ({
                ...prev,
                canvasWidth: width,
                canvasHeight: height,
            }));
        },
        [setDesign],
    );

    const getPendingImageFiles = useCallback(
        () => new Map(pendingImageFilesRef.current),
        [],
    );

    const getPendingBackgroundFile = useCallback(
        () => pendingBackgroundFileRef.current,
        [],
    );

    return {
        design,
        selectedId,
        canUndo,
        canRedo,
        setSelectedId,
        undo,
        redo,
        addText,
        addImage,
        addShape,
        updateElement,
        removeElement,
        deleteSelected,
        moveElement,
        setBackgroundColor,
        setBackgroundImageFile,
        setCanvasSize,
        getPendingImageFiles,
        getPendingBackgroundFile,
        resetDesign,
    };
};

export type UseBannerDesignReturn = ReturnType<typeof useBannerDesign>;
