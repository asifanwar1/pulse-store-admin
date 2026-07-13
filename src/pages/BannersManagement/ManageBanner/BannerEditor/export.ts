import type Konva from "konva";

import {
    DEFAULT_CANVAS_HEIGHT,
    DEFAULT_CANVAS_WIDTH,
    type BannerDesign,
    type BannerElement,
} from "./BannerEditor.types";

export const exportStageToBlob = async (
    stage: Konva.Stage,
    design: BannerDesign,
    pixelRatio = 2,
): Promise<Blob> => {
    const previousScale = stage.scale();
    const previousWidth = stage.width();
    const previousHeight = stage.height();

    stage.scale({ x: 1, y: 1 });
    stage.width(design.canvasWidth);
    stage.height(design.canvasHeight);
    stage.batchDraw();

    const dataUrl = stage.toDataURL({ pixelRatio, mimeType: "image/png" });

    stage.scale(previousScale ?? { x: 1, y: 1 });
    stage.width(previousWidth);
    stage.height(previousHeight);
    stage.batchDraw();

    const response = await fetch(dataUrl);
    return response.blob();
};

export const blobToFile = (blob: Blob, fileName: string): File => {
    return new File([blob], fileName, {
        type: blob.type || "image/png",
    });
};

const isBannerElement = (value: unknown): value is BannerElement => {
    if (!value || typeof value !== "object") return false;
    const candidate = value as Record<string, unknown>;
    return (
        typeof candidate.id === "string" &&
        (candidate.type === "text" ||
            candidate.type === "image" ||
            candidate.type === "shape")
    );
};

export const parseDesign = (
    value: Record<string, unknown> | null | undefined,
): BannerDesign => {
    if (!value) {
        return {
            canvasWidth: DEFAULT_CANVAS_WIDTH,
            canvasHeight: DEFAULT_CANVAS_HEIGHT,
            backgroundColor: "#ffffff",
            backgroundImage: null,
            elements: [],
        };
    }

    const width = Number(value.canvasWidth);
    const height = Number(value.canvasHeight);
    const elements = Array.isArray(value.elements)
        ? value.elements.filter(isBannerElement)
        : [];

    return {
        canvasWidth:
            Number.isFinite(width) && width > 0 ? width : DEFAULT_CANVAS_WIDTH,
        canvasHeight:
            Number.isFinite(height) && height > 0
                ? height
                : DEFAULT_CANVAS_HEIGHT,
        backgroundColor:
            typeof value.backgroundColor === "string"
                ? value.backgroundColor
                : "#ffffff",
        backgroundImage:
            typeof value.backgroundImage === "string"
                ? value.backgroundImage
                : null,
        elements,
    };
};

export const serializeDesign = (
    design: BannerDesign,
): Record<string, unknown> => {
    return JSON.parse(JSON.stringify(design));
};
