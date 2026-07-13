import { useRef } from "react";
import {
    Bold,
    Circle as CircleIcon,
    Image as ImageIcon,
    Italic,
    MoveDown,
    MoveUp,
    Redo2,
    Square,
    Trash2,
    Type,
    Undo2,
    X,
} from "lucide-react";

import Button from "@/components/custom/CustomButton/CustomButton";
import { cn } from "@/lib/utils";
import {
    CANVAS_SIZE_PRESETS,
    type BannerElement,
    type ShapeType,
} from "./BannerEditor.types";

const FONT_FAMILIES = [
    "sans-serif",
    "serif",
    "monospace",
    "Arial",
    "Georgia",
    "Verdana",
];

type ToolbarProps = {
    selectedElement: BannerElement | null;
    canvasWidth: number;
    canvasHeight: number;
    backgroundColor: string;
    hasBackgroundImage: boolean;
    canUndo: boolean;
    canRedo: boolean;
    onAddText: () => void;
    onAddImage: (file: File) => void;
    onAddShape: (shapeType: ShapeType) => void;
    onUpdateSelected: (patch: Partial<BannerElement>) => void;
    onDeleteSelected: () => void;
    onMoveSelected: (direction: "forward" | "backward") => void;
    onSetBackgroundColor: (color: string) => void;
    onSetBackgroundImage: (file: File | null) => void;
    onSetCanvasSize: (width: number, height: number) => void;
    onUndo: () => void;
    onRedo: () => void;
};

const ToolbarButton: React.FC<{
    onClick: () => void;
    title: string;
    children: React.ReactNode;
    disabled?: boolean;
}> = ({ onClick, title, children, disabled }) => (
    <span title={title} className="inline-flex">
        <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label={title}
            onClick={onClick}
            disabled={disabled}
            className="h-9 w-9 bg-white"
        >
            {children}
        </Button>
    </span>
);

const Toolbar: React.FC<ToolbarProps> = ({
    selectedElement,
    canvasWidth,
    canvasHeight,
    backgroundColor,
    hasBackgroundImage,
    canUndo,
    canRedo,
    onAddText,
    onAddImage,
    onAddShape,
    onUpdateSelected,
    onDeleteSelected,
    onMoveSelected,
    onSetBackgroundColor,
    onSetBackgroundImage,
    onSetCanvasSize,
    onUndo,
    onRedo,
}) => {
    const imageInputRef = useRef<HTMLInputElement>(null);
    const backgroundInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="flex flex-col gap-3 rounded-xl border border-pulse-cream-dark bg-white p-3">
            <div className="flex flex-wrap items-center gap-2">
                <ToolbarButton onClick={onAddText} title="Add text">
                    <Type className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => imageInputRef.current?.click()}
                    title="Add image"
                >
                    <ImageIcon className="h-4 w-4" />
                </ToolbarButton>
                <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) onAddImage(file);
                        e.target.value = "";
                    }}
                />
                <ToolbarButton
                    onClick={() => onAddShape("rect")}
                    title="Add rectangle"
                >
                    <Square className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => onAddShape("circle")}
                    title="Add circle"
                >
                    <CircleIcon className="h-4 w-4" />
                </ToolbarButton>

                <div className="mx-1 h-6 w-px bg-pulse-cream-dark" />

                <ToolbarButton
                    onClick={onUndo}
                    title="Undo"
                    disabled={!canUndo}
                >
                    <Undo2 className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                    onClick={onRedo}
                    title="Redo"
                    disabled={!canRedo}
                >
                    <Redo2 className="h-4 w-4" />
                </ToolbarButton>

                <div className="mx-1 h-6 w-px bg-pulse-cream-dark" />

                <label className="flex items-center gap-2 text-xs font-medium text-pulse-green">
                    Background
                    <input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => onSetBackgroundColor(e.target.value)}
                        className="h-8 w-8 cursor-pointer rounded border border-pulse-cream-dark"
                        title="Background color"
                    />
                </label>
                <ToolbarButton
                    onClick={() => backgroundInputRef.current?.click()}
                    title="Set background image"
                >
                    <ImageIcon className="h-4 w-4" />
                </ToolbarButton>
                {hasBackgroundImage && (
                    <ToolbarButton
                        onClick={() => onSetBackgroundImage(null)}
                        title="Remove background image"
                    >
                        <X className="h-4 w-4" />
                    </ToolbarButton>
                )}
                <input
                    ref={backgroundInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) onSetBackgroundImage(file);
                        e.target.value = "";
                    }}
                />
            </div>

            <div className="flex flex-wrap items-center gap-2 border-t border-pulse-cream-dark pt-3">
                <span className="text-xs font-medium text-pulse-green">
                    Canvas size
                </span>
                {CANVAS_SIZE_PRESETS.map((preset) => (
                    <Button
                        key={preset.label}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                            onSetCanvasSize(preset.width, preset.height)
                        }
                        className={cn(
                            "h-8 bg-white text-xs",
                            canvasWidth === preset.width &&
                                canvasHeight === preset.height &&
                                "border-pulse-green-dark text-pulse-green-dark",
                        )}
                    >
                        {preset.label} ({preset.width}×{preset.height})
                    </Button>
                ))}
                <input
                    type="number"
                    min={50}
                    max={2000}
                    value={canvasWidth}
                    onChange={(e) =>
                        onSetCanvasSize(
                            Number(e.target.value) || canvasWidth,
                            canvasHeight,
                        )
                    }
                    className="h-8 w-20 rounded-md border border-pulse-cream-dark bg-white px-2 text-sm text-pulse-green-dark"
                    title="Canvas width (px)"
                    aria-label="Canvas width"
                />
                <span className="text-xs text-pulse-green/60">×</span>
                <input
                    type="number"
                    min={50}
                    max={2000}
                    value={canvasHeight}
                    onChange={(e) =>
                        onSetCanvasSize(
                            canvasWidth,
                            Number(e.target.value) || canvasHeight,
                        )
                    }
                    className="h-8 w-20 rounded-md border border-pulse-cream-dark bg-white px-2 text-sm text-pulse-green-dark"
                    title="Canvas height (px)"
                    aria-label="Canvas height"
                />
                <span className="text-xs text-pulse-green/60">
                    Match the size your storefront placement expects — see the
                    banner integration docs.
                </span>
            </div>

            {selectedElement && (
                <div className="flex flex-wrap items-center gap-2 border-t border-pulse-cream-dark pt-3">
                    {selectedElement.type === "text" && (
                        <>
                            <select
                                value={selectedElement.fontFamily}
                                onChange={(e) =>
                                    onUpdateSelected({
                                        fontFamily: e.target.value,
                                    })
                                }
                                className="h-9 rounded-md border border-pulse-cream-dark bg-white px-2 text-sm text-pulse-green-dark"
                                title="Font family"
                            >
                                {FONT_FAMILIES.map((font) => (
                                    <option key={font} value={font}>
                                        {font}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                min={4}
                                max={200}
                                value={selectedElement.fontSize}
                                onChange={(e) =>
                                    onUpdateSelected({
                                        fontSize: Number(e.target.value) || 4,
                                    })
                                }
                                className="h-9 w-16 rounded-md border border-pulse-cream-dark bg-white px-2 text-sm text-pulse-green-dark"
                                title="Font size"
                            />
                            <ToolbarButton
                                onClick={() =>
                                    onUpdateSelected({
                                        fontStyle:
                                            selectedElement.fontStyle.includes(
                                                "bold",
                                            )
                                                ? selectedElement.fontStyle.includes(
                                                      "italic",
                                                  )
                                                    ? "italic"
                                                    : "normal"
                                                : selectedElement.fontStyle.includes(
                                                        "italic",
                                                    )
                                                  ? "bold italic"
                                                  : "bold",
                                    })
                                }
                                title="Bold"
                            >
                                <Bold
                                    className={cn(
                                        "h-4 w-4",
                                        selectedElement.fontStyle.includes(
                                            "bold",
                                        ) && "text-pulse-green-dark",
                                    )}
                                />
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={() =>
                                    onUpdateSelected({
                                        fontStyle:
                                            selectedElement.fontStyle.includes(
                                                "italic",
                                            )
                                                ? selectedElement.fontStyle.includes(
                                                      "bold",
                                                  )
                                                    ? "bold"
                                                    : "normal"
                                                : selectedElement.fontStyle.includes(
                                                        "bold",
                                                    )
                                                  ? "bold italic"
                                                  : "italic",
                                    })
                                }
                                title="Italic"
                            >
                                <Italic
                                    className={cn(
                                        "h-4 w-4",
                                        selectedElement.fontStyle.includes(
                                            "italic",
                                        ) && "text-pulse-green-dark",
                                    )}
                                />
                            </ToolbarButton>
                            <input
                                type="color"
                                value={selectedElement.fill}
                                onChange={(e) =>
                                    onUpdateSelected({ fill: e.target.value })
                                }
                                className="h-9 w-9 cursor-pointer rounded border border-pulse-cream-dark"
                                title="Text color"
                            />
                        </>
                    )}

                    {selectedElement.type === "shape" && (
                        <input
                            type="color"
                            value={selectedElement.fill}
                            onChange={(e) =>
                                onUpdateSelected({ fill: e.target.value })
                            }
                            className="h-9 w-9 cursor-pointer rounded border border-pulse-cream-dark"
                            title="Fill color"
                        />
                    )}

                    <div className="mx-1 h-6 w-px bg-pulse-cream-dark" />

                    <ToolbarButton
                        onClick={() => onMoveSelected("forward")}
                        title="Bring forward"
                    >
                        <MoveUp className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => onMoveSelected("backward")}
                        title="Send backward"
                    >
                        <MoveDown className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={onDeleteSelected}
                        title="Delete element"
                    >
                        <Trash2 className="h-4 w-4 text-red-500" />
                    </ToolbarButton>
                </div>
            )}
        </div>
    );
};

export default Toolbar;
