import type Konva from "konva";
import { Text } from "react-konva";

import type { BannerElement, TextBannerElement } from "../BannerEditor.types";

type TextElementProps = {
    element: TextBannerElement;
    isSelected: boolean;
    visible: boolean;
    onSelect: () => void;
    onChange: (patch: Partial<BannerElement>) => void;
    onDblClick: () => void;
    registerRef: (node: Konva.Node | null) => void;
};

const TextElement: React.FC<TextElementProps> = ({
    element,
    visible,
    onSelect,
    onChange,
    onDblClick,
    registerRef,
}) => {
    return (
        <Text
            ref={registerRef}
            visible={visible}
            x={element.x}
            y={element.y}
            width={element.width}
            text={element.text}
            fontSize={element.fontSize}
            fontFamily={element.fontFamily}
            fontStyle={element.fontStyle}
            align={element.align}
            fill={element.fill}
            rotation={element.rotation}
            draggable
            onClick={onSelect}
            onTap={onSelect}
            onDblClick={onDblClick}
            onDblTap={onDblClick}
            onDragEnd={(e) => {
                onChange({ x: e.target.x(), y: e.target.y() });
            }}
            onTransformEnd={(e) => {
                const node = e.target;
                const scaleX = node.scaleX();
                onChange({
                    x: node.x(),
                    y: node.y(),
                    rotation: node.rotation(),
                    width: Math.max(20, node.width() * scaleX),
                    fontSize: Math.max(
                        4,
                        Math.round(element.fontSize * node.scaleY()),
                    ),
                });
                node.scaleX(1);
                node.scaleY(1);
            }}
        />
    );
};

export default TextElement;
