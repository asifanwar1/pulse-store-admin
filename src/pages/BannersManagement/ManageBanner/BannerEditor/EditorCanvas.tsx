import { useCallback, useEffect, useRef, useState } from "react";
import type Konva from "konva";
import { Layer, Rect, Stage, Transformer, Image as KonvaImage } from "react-konva";
import useImage from "use-image";

import TextElement from "./elements/TextElement";
import ImageElement from "./elements/ImageElement";
import ShapeElement from "./elements/ShapeElement";
import type { BannerDesign, BannerElement } from "./BannerEditor.types";

type EditorCanvasProps = {
    design: BannerDesign;
    selectedId: string | null;
    onSelect: (id: string | null) => void;
    updateElement: (id: string, patch: Partial<BannerElement>) => void;
    stageRef: React.RefObject<Konva.Stage | null>;
};

const useContainerWidth = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (entry) setWidth(entry.contentRect.width);
        });
        observer.observe(el);
        setWidth(el.getBoundingClientRect().width);

        return () => observer.disconnect();
    }, []);

    return { ref, width };
};

const BackgroundImage: React.FC<{
    src: string;
    width: number;
    height: number;
}> = ({ src, width, height }) => {
    const [image] = useImage(src, "anonymous");
    if (!image) return null;
    return (
        <KonvaImage
            image={image}
            x={0}
            y={0}
            width={width}
            height={height}
            listening={false}
        />
    );
};

const EditorCanvas: React.FC<EditorCanvasProps> = ({
    design,
    selectedId,
    onSelect,
    updateElement,
    stageRef,
}) => {
    const { ref: containerRef, width: containerWidth } = useContainerWidth();
    const transformerRef = useRef<Konva.Transformer>(null);
    const shapeRefsRef = useRef<Map<string, Konva.Node>>(new Map());
    const [editingTextId, setEditingTextId] = useState<string | null>(null);
    const [editingValue, setEditingValue] = useState("");

    const scale =
        containerWidth > 0
            ? Math.min(1, containerWidth / design.canvasWidth)
            : 1;

    const registerShapeRef = useCallback(
        (id: string, node: Konva.Node | null) => {
            if (node) shapeRefsRef.current.set(id, node);
            else shapeRefsRef.current.delete(id);
        },
        [],
    );

    useEffect(() => {
        const transformer = transformerRef.current;
        if (!transformer) return;

        if (!selectedId) {
            transformer.nodes([]);
            transformer.getLayer()?.batchDraw();
            return;
        }

        const node = shapeRefsRef.current.get(selectedId);
        transformer.nodes(node ? [node] : []);
        transformer.getLayer()?.batchDraw();
    }, [selectedId, design.elements]);

    const handleStagePointerDown = (
        e: Konva.KonvaEventObject<MouseEvent | TouchEvent>,
    ) => {
        if (e.target === e.target.getStage()) {
            onSelect(null);
        }
    };

    const startEditingText = (id: string, currentText: string) => {
        onSelect(id);
        setEditingTextId(id);
        setEditingValue(currentText);
    };

    const commitTextEdit = () => {
        if (editingTextId) {
            updateElement(editingTextId, { text: editingValue });
        }
        setEditingTextId(null);
    };

    const editingElement = editingTextId
        ? design.elements.find(
              (el): el is Extract<BannerElement, { type: "text" }> =>
                  el.id === editingTextId && el.type === "text",
          )
        : undefined;

    return (
        <div
            ref={containerRef}
            className="relative w-full overflow-hidden rounded-xl border border-pulse-cream-dark bg-slate-100"
            style={{ height: Math.max(1, design.canvasHeight * scale) }}
        >
            <Stage
                ref={stageRef}
                width={design.canvasWidth * scale}
                height={design.canvasHeight * scale}
                scaleX={scale}
                scaleY={scale}
                onMouseDown={handleStagePointerDown}
                onTouchStart={handleStagePointerDown}
            >
                <Layer listening={false}>
                    <Rect
                        x={0}
                        y={0}
                        width={design.canvasWidth}
                        height={design.canvasHeight}
                        fill={design.backgroundColor}
                    />
                    {design.backgroundImage && (
                        <BackgroundImage
                            src={design.backgroundImage}
                            width={design.canvasWidth}
                            height={design.canvasHeight}
                        />
                    )}
                </Layer>
                <Layer>
                    {design.elements.map((element) => {
                        const isSelected = element.id === selectedId;
                        const onSelectElement = () => onSelect(element.id);
                        const onChangeElement = (
                            patch: Partial<BannerElement>,
                        ) => updateElement(element.id, patch);
                        const registerRef = (node: Konva.Node | null) =>
                            registerShapeRef(element.id, node);

                        if (element.type === "text") {
                            return (
                                <TextElement
                                    key={element.id}
                                    element={element}
                                    isSelected={isSelected}
                                    visible={editingTextId !== element.id}
                                    onSelect={onSelectElement}
                                    onChange={onChangeElement}
                                    onDblClick={() =>
                                        startEditingText(
                                            element.id,
                                            element.text,
                                        )
                                    }
                                    registerRef={registerRef}
                                />
                            );
                        }
                        if (element.type === "image") {
                            return (
                                <ImageElement
                                    key={element.id}
                                    element={element}
                                    isSelected={isSelected}
                                    onSelect={onSelectElement}
                                    onChange={onChangeElement}
                                    registerRef={registerRef}
                                />
                            );
                        }
                        return (
                            <ShapeElement
                                key={element.id}
                                element={element}
                                isSelected={isSelected}
                                onSelect={onSelectElement}
                                onChange={onChangeElement}
                                registerRef={registerRef}
                            />
                        );
                    })}
                    <Transformer
                        ref={transformerRef}
                        rotateEnabled
                        flipEnabled={false}
                        boundBoxFunc={(oldBox, newBox) => {
                            if (newBox.width < 10 || newBox.height < 10) {
                                return oldBox;
                            }
                            return newBox;
                        }}
                    />
                </Layer>
            </Stage>

            {editingElement && (
                <textarea
                    autoFocus
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                    onBlur={commitTextEdit}
                    onKeyDown={(e) => {
                        if (e.key === "Escape") {
                            setEditingTextId(null);
                        }
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            commitTextEdit();
                        }
                    }}
                    className="absolute resize-none border border-dashed border-pulse-green bg-white/90 p-0 leading-tight outline-none"
                    style={{
                        top: editingElement.y * scale,
                        left: editingElement.x * scale,
                        width: (editingElement.width || 200) * scale,
                        minHeight: editingElement.fontSize * scale * 1.4,
                        fontSize: editingElement.fontSize * scale,
                        fontFamily: editingElement.fontFamily,
                        color: editingElement.fill,
                        fontWeight: editingElement.fontStyle.includes("bold")
                            ? "bold"
                            : "normal",
                        fontStyle: editingElement.fontStyle.includes("italic")
                            ? "italic"
                            : "normal",
                        textAlign: editingElement.align,
                        transformOrigin: "top left",
                    }}
                />
            )}
        </div>
    );
};

export default EditorCanvas;
