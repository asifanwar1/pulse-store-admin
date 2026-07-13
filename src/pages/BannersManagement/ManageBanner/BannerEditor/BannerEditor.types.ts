export type BannerElementBase = {
    id: string;
    x: number;
    y: number;
    rotation: number;
};

export type TextBannerElement = BannerElementBase & {
    type: "text";
    text: string;
    fontSize: number;
    fontFamily: string;
    fill: string;
    fontStyle: "normal" | "bold" | "italic" | "bold italic";
    align: "left" | "center" | "right";
    width: number;
};

export type ImageBannerElement = BannerElementBase & {
    type: "image";
    src: string;
    width: number;
    height: number;
};

export type ShapeType = "rect" | "circle";

export type ShapeBannerElement = BannerElementBase & {
    type: "shape";
    shapeType: ShapeType;
    width: number;
    height: number;
    fill: string;
};

export type BannerElement =
    | TextBannerElement
    | ImageBannerElement
    | ShapeBannerElement;

export type BannerDesign = {
    canvasWidth: number;
    canvasHeight: number;
    backgroundColor: string;
    backgroundImage?: string | null;
    elements: BannerElement[];
};

export const DEFAULT_CANVAS_WIDTH = 1200;
export const DEFAULT_CANVAS_HEIGHT = 400;

// Quick-select sizes for the canvas-size control. These are conventions, not
// enforced server-side — the public API never returns canvas dimensions, so
// the storefront/mobile app size each placement's container to match these
// same presets. Picking a different size still works (images render via
// object-cover/contentFit=cover) but may crop unexpectedly on the storefront.
export const CANVAS_SIZE_PRESETS = [
    { label: "Hero", width: 1200, height: 400 },
    { label: "Strap", width: 1200, height: 180 },
] as const;

export const createEmptyDesign = (): BannerDesign => ({
    canvasWidth: DEFAULT_CANVAS_WIDTH,
    canvasHeight: DEFAULT_CANVAS_HEIGHT,
    backgroundColor: "#ffffff",
    backgroundImage: null,
    elements: [],
});

export type BannerEditorHandle = {
    getDesign: () => BannerDesign;
    exportImage: (pixelRatio?: number) => Promise<Blob>;
    resetDesign: (design: BannerDesign) => void;
    hasElements: () => boolean;
    getPendingImageFiles: () => Map<string, File>;
    getPendingBackgroundFile: () => File | null;
};
