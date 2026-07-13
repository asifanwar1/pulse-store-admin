import {
    Circle as CircleIcon,
    Image as ImageIcon,
    MoveDown,
    MoveUp,
    Square,
    Trash2,
    Type,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { BannerElement } from "./BannerEditor.types";

type LayersPanelProps = {
    elements: BannerElement[];
    selectedId: string | null;
    onSelect: (id: string) => void;
    onMove: (id: string, direction: "forward" | "backward") => void;
    onDelete: (id: string) => void;
};

const getElementIcon = (element: BannerElement) => {
    if (element.type === "text") return Type;
    if (element.type === "image") return ImageIcon;
    return element.shapeType === "circle" ? CircleIcon : Square;
};

const getElementLabel = (element: BannerElement) => {
    if (element.type === "text") return element.text || "Text";
    if (element.type === "image") return "Image";
    return element.shapeType === "circle" ? "Circle" : "Rectangle";
};

const LayersPanel: React.FC<LayersPanelProps> = ({
    elements,
    selectedId,
    onSelect,
    onMove,
    onDelete,
}) => {
    const orderedElements = [...elements].reverse();

    return (
        <div className="flex flex-col gap-2 rounded-xl border border-pulse-cream-dark bg-white p-3">
            <h4 className="text-sm font-semibold text-pulse-green-dark">
                Layers
            </h4>
            {orderedElements.length === 0 && (
                <p className="text-xs text-pulse-green/70">
                    No elements yet — use the toolbar to add one.
                </p>
            )}
            <div className="flex flex-col gap-1">
                {orderedElements.map((element) => {
                    const Icon = getElementIcon(element);
                    const isSelected = element.id === selectedId;
                    return (
                        <div
                            key={element.id}
                            className={cn(
                                "flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors",
                                isSelected
                                    ? "bg-pulse-cream-dark/60 text-pulse-green-dark"
                                    : "text-pulse-green hover:bg-pulse-cream-dark/30",
                            )}
                        >
                            <button
                                type="button"
                                onClick={() => onSelect(element.id)}
                                className="flex min-w-0 flex-1 items-center gap-2 text-left"
                            >
                                <Icon className="h-3.5 w-3.5 shrink-0" />
                                <span className="truncate">
                                    {getElementLabel(element)}
                                </span>
                            </button>
                            <div className="flex shrink-0 items-center gap-0.5">
                                <button
                                    type="button"
                                    onClick={() =>
                                        onMove(element.id, "forward")
                                    }
                                    className="rounded p-1 hover:bg-white"
                                    aria-label="Bring forward"
                                    title="Bring forward"
                                >
                                    <MoveUp className="h-3.5 w-3.5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        onMove(element.id, "backward")
                                    }
                                    className="rounded p-1 hover:bg-white"
                                    aria-label="Send backward"
                                    title="Send backward"
                                >
                                    <MoveDown className="h-3.5 w-3.5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => onDelete(element.id)}
                                    className="rounded p-1 text-red-500 hover:bg-white"
                                    aria-label="Delete layer"
                                    title="Delete layer"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LayersPanel;
