import type Konva from "konva";
import { Circle, Rect } from "react-konva";

import type { BannerElement, ShapeBannerElement } from "../BannerEditor.types";

type ShapeElementProps = {
    element: ShapeBannerElement;
    isSelected: boolean;
    onSelect: () => void;
    onChange: (patch: Partial<BannerElement>) => void;
    registerRef: (node: Konva.Node | null) => void;
};

const ShapeElement: React.FC<ShapeElementProps> = ({
    element,
    onSelect,
    onChange,
    registerRef,
}) => {
    const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
        onChange({ x: e.target.x(), y: e.target.y() });
    };

    const handleTransformEnd = (e: Konva.KonvaEventObject<Event>) => {
        const node = e.target;
        onChange({
            x: node.x(),
            y: node.y(),
            rotation: node.rotation(),
            width: Math.max(5, node.width() * node.scaleX()),
            height: Math.max(5, node.height() * node.scaleY()),
        });
        node.scaleX(1);
        node.scaleY(1);
    };

    if (element.shapeType === "circle") {
        const radius = element.width / 2;
        return (
            <Circle
                ref={registerRef}
                x={element.x + radius}
                y={element.y + radius}
                radius={radius}
                fill={element.fill}
                rotation={element.rotation}
                draggable
                onClick={onSelect}
                onTap={onSelect}
                onDragEnd={(e) => {
                    onChange({
                        x: e.target.x() - radius,
                        y: e.target.y() - radius,
                    });
                }}
                onTransformEnd={(e) => {
                    const node = e.target;
                    const nextRadius = Math.max(
                        3,
                        radius * ((node.scaleX() + node.scaleY()) / 2),
                    );
                    onChange({
                        x: node.x() - nextRadius,
                        y: node.y() - nextRadius,
                        rotation: node.rotation(),
                        width: nextRadius * 2,
                        height: nextRadius * 2,
                    });
                    node.scaleX(1);
                    node.scaleY(1);
                }}
            />
        );
    }

    return (
        <Rect
            ref={registerRef}
            x={element.x}
            y={element.y}
            width={element.width}
            height={element.height}
            fill={element.fill}
            rotation={element.rotation}
            draggable
            onClick={onSelect}
            onTap={onSelect}
            onDragEnd={handleDragEnd}
            onTransformEnd={handleTransformEnd}
        />
    );
};

export default ShapeElement;
