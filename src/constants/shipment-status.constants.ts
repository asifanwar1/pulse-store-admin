export const SHIPMENT_STATUS_OPTIONS = [
    { value: "pending", label: "Pending" },
    { value: "in_transit", label: "In Transit" },
    { value: "out_for_delivery", label: "Out for Delivery" },
    { value: "delivered", label: "Delivered" },
    { value: "failed", label: "Failed" },
    { value: "returned", label: "Returned" },
] as const;

export const CARRIER_OPTIONS = [
    { value: "fedex", label: "FedEx" },
    { value: "ups", label: "UPS" },
    { value: "dhl", label: "DHL" },
    { value: "usps", label: "USPS" },
    { value: "blue_dart", label: "Blue Dart" },
] as const;
