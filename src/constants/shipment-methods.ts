import { injectBaseConstantMethods } from "./base.constants";

export const ShipmentMethod = {
    STANDARD: "STANDARD",
    EXPRESS: "EXPRESS",
    OVERNIGHT: "OVERNIGHT",
    PICKUP: "PICKUP",
};

export const SHIPMENT_METHODS_OPTIONS = [
    { value: "STANDARD", label: "Standard" },
    { value: "EXPRESS", label: "Express" },
    { value: "OVERNIGHT", label: "Overnight" },
    { value: "PICKUP", label: "Pickup" },
];

const shipmentMethodTextKeys = {
    [ShipmentMethod.STANDARD]: "Standard",
    [ShipmentMethod.EXPRESS]: "Express",
    [ShipmentMethod.OVERNIGHT]: "Overnight",
    [ShipmentMethod.PICKUP]: "Pickup",
};

const shipmentMethodLabelClasses = {
    [ShipmentMethod.STANDARD]: "bg-green-100 text-green-800",
    [ShipmentMethod.EXPRESS]: "bg-red-100 text-red-800",
    [ShipmentMethod.OVERNIGHT]: "bg-yellow-100 text-yellow-800",
    [ShipmentMethod.PICKUP]: "bg-red-100 text-red-800",
};

export const shipmentMethodWithHelpers = injectBaseConstantMethods(
    ShipmentMethod,
    shipmentMethodTextKeys,
    shipmentMethodLabelClasses,
);

export type ProductStatusType =
    (typeof ShipmentMethod)[keyof typeof ShipmentMethod];
