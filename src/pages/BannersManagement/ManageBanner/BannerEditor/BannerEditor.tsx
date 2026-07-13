import { forwardRef, useImperativeHandle, useRef } from "react";
import type Konva from "konva";

import EditorCanvas from "./EditorCanvas";
import Toolbar from "./Toolbar";
import LayersPanel from "./LayersPanel";
import { useBannerDesign } from "./useBannerDesign";
import { exportStageToBlob } from "./export";
import type { BannerDesign, BannerEditorHandle } from "./BannerEditor.types";

type BannerEditorProps = {
    initialDesign?: BannerDesign;
};

const BannerEditor = forwardRef<BannerEditorHandle, BannerEditorProps>(
    ({ initialDesign }, ref) => {
        const stageRef = useRef<Konva.Stage>(null);
        const {
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
        } = useBannerDesign(initialDesign);

        const selectedElement = selectedId
            ? (design.elements.find((el) => el.id === selectedId) ?? null)
            : null;

        useImperativeHandle(
            ref,
            () => ({
                getDesign: () => design,
                hasElements: () => design.elements.length > 0,
                resetDesign,
                getPendingImageFiles,
                getPendingBackgroundFile,
                exportImage: async (pixelRatio = 2) => {
                    const stage = stageRef.current;
                    if (!stage) {
                        throw new Error("Canvas is not ready yet");
                    }

                    stage
                        .find("Transformer")
                        .forEach((transformer) =>
                            (transformer as Konva.Transformer).nodes([]),
                        );
                    stage.batchDraw();
                    setSelectedId(null);

                    return exportStageToBlob(stage, design, pixelRatio);
                },
            }),
            [
                design,
                resetDesign,
                getPendingImageFiles,
                getPendingBackgroundFile,
                setSelectedId,
            ],
        );

        return (
            <div
                className="flex flex-col gap-3"
                onKeyDown={(e) => {
                    const target = e.target as HTMLElement;
                    if (
                        target.tagName === "INPUT" ||
                        target.tagName === "TEXTAREA" ||
                        target.tagName === "SELECT"
                    ) {
                        return;
                    }
                    if (e.key === "Delete" || e.key === "Backspace") {
                        e.preventDefault();
                        deleteSelected();
                    }
                }}
                tabIndex={-1}
            >
                <Toolbar
                    selectedElement={selectedElement}
                    canvasWidth={design.canvasWidth}
                    canvasHeight={design.canvasHeight}
                    backgroundColor={design.backgroundColor}
                    hasBackgroundImage={!!design.backgroundImage}
                    canUndo={canUndo}
                    canRedo={canRedo}
                    onAddText={addText}
                    onAddImage={addImage}
                    onAddShape={addShape}
                    onUpdateSelected={(patch) =>
                        selectedId && updateElement(selectedId, patch)
                    }
                    onDeleteSelected={deleteSelected}
                    onMoveSelected={(direction) =>
                        selectedId && moveElement(selectedId, direction)
                    }
                    onSetBackgroundColor={setBackgroundColor}
                    onSetBackgroundImage={setBackgroundImageFile}
                    onSetCanvasSize={setCanvasSize}
                    onUndo={undo}
                    onRedo={redo}
                />

                <div className="flex flex-col gap-3 lg:flex-row">
                    <div className="min-w-0 flex-1">
                        <EditorCanvas
                            design={design}
                            selectedId={selectedId}
                            onSelect={setSelectedId}
                            updateElement={updateElement}
                            stageRef={stageRef}
                        />
                    </div>
                    <div className="w-full shrink-0 lg:w-64">
                        <LayersPanel
                            elements={design.elements}
                            selectedId={selectedId}
                            onSelect={setSelectedId}
                            onMove={moveElement}
                            onDelete={removeElement}
                        />
                    </div>
                </div>
            </div>
        );
    },
);

BannerEditor.displayName = "BannerEditor";

export default BannerEditor;
