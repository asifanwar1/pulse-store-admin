import type Konva from "konva";
import { Image as KonvaImage } from "react-konva";
import useImage from "use-image";

import type { BannerElement, ImageBannerElement } from "../BannerEditor.types";

type ImageElementProps = {
    element: ImageBannerElement;
    isSelected: boolean;
    onSelect: () => void;
    onChange: (patch: Partial<BannerElement>) => void;
    registerRef: (node: Konva.Node | null) => void;
};

const ImageElement: React.FC<ImageElementProps> = ({
    element,
    onSelect,
    onChange,
    registerRef,
}) => {
    const [image] = useImage(element.src, "anonymous");

    return (
        <KonvaImage
            ref={registerRef}
            image={image}
            x={element.x}
            y={element.y}
            width={element.width}
            height={element.height}
            rotation={element.rotation}
            draggable
            onClick={onSelect}
            onTap={onSelect}
            onDragEnd={(e) => {
                onChange({ x: e.target.x(), y: e.target.y() });
            }}
            onTransformEnd={(e) => {
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
            }}
        />
    );
};

export default ImageElement;
