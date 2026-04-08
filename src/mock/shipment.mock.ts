// ─── Types ────────────────────────────────────────────────────────────────────

export type ShipmentStatus =
    | "pending"
    | "in_transit"
    | "out_for_delivery"
    | "delivered"
    | "failed"
    | "returned";

export type ShipmentCarrier =
    | "fedex"
    | "ups"
    | "dhl"
    | "usps"
    | "blue_dart";

export interface ShipmentStatItem {
    value: number;
    trend: number;
    trendDirection: "up" | "down";
    prefix?: string;
    suffix?: string;
}

export interface ShipmentStats {
    totalShipments: ShipmentStatItem;
    inTransit: ShipmentStatItem;
    delivered: ShipmentStatItem;
    failed: ShipmentStatItem;
}

export interface Shipment {
    id: string;
    orderId: string;
    customer: string;
    initials: string;
    email: string;
    carrier: ShipmentCarrier;
    trackingNumber: string;
    status: ShipmentStatus;
    origin: string;
    destination: string;
    weight: number;
    estimatedDelivery: string;
    createdAt: string;
}

export interface ShipmentAddress {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

export interface ShipmentItem {
    id: string;
    productName: string;
    sku: string;
    initials: string;
    quantity: number;
    weight: number;
}

export interface ShipmentDetail {
    items: ShipmentItem[];
    originAddress: ShipmentAddress;
    destinationAddress: ShipmentAddress;
    weight: number;
    dimensions: string;
    shippingCost: number;
    notes?: string;
    deliveredAt?: string;
    createdAt: string;
    updatedAt: string;
}

// ─── Shipment Stats ───────────────────────────────────────────────────────────

export const shipmentStatsData: ShipmentStats = {
    totalShipments: { value: 1423, trend: 6.2, trendDirection: "up" },
    inTransit: { value: 312, trend: 4.1, trendDirection: "up" },
    delivered: { value: 1054, trend: 9.8, trendDirection: "up" },
    failed: { value: 57, trend: 12.3, trendDirection: "down" },
};

// ─── Shipments List ───────────────────────────────────────────────────────────

export const shipmentsListData: Shipment[] = [
    {
        id: "SHP-4421",
        orderId: "ORD-7842",
        customer: "Alex Johnson",
        initials: "AJ",
        email: "alex.johnson@example.com",
        carrier: "fedex",
        trackingNumber: "1Z999AA10123456790",
        status: "delivered",
        origin: "San Jose, CA",
        destination: "San Francisco, CA",
        weight: 2.3,
        estimatedDelivery: "2026-04-08",
        createdAt: "2026-04-05",
    },
    {
        id: "SHP-4420",
        orderId: "ORD-7841",
        customer: "Sarah Williams",
        initials: "SW",
        email: "sarah.williams@example.com",
        carrier: "ups",
        trackingNumber: "1Z999AA10123456791",
        status: "in_transit",
        origin: "Dallas, TX",
        destination: "Austin, TX",
        weight: 1.1,
        estimatedDelivery: "2026-04-09",
        createdAt: "2026-04-05",
    },
    {
        id: "SHP-4419",
        orderId: "ORD-7840",
        customer: "Michael Chen",
        initials: "MC",
        email: "michael.chen@example.com",
        carrier: "dhl",
        trackingNumber: "1234567890",
        status: "out_for_delivery",
        origin: "Portland, OR",
        destination: "Seattle, WA",
        weight: 0.8,
        estimatedDelivery: "2026-04-08",
        createdAt: "2026-04-04",
    },
    {
        id: "SHP-4418",
        orderId: "ORD-7839",
        customer: "Emma Davis",
        initials: "ED",
        email: "emma.davis@example.com",
        carrier: "usps",
        trackingNumber: "9400111899223447520489",
        status: "pending",
        origin: "Phoenix, AZ",
        destination: "Denver, CO",
        weight: 3.5,
        estimatedDelivery: "2026-04-12",
        createdAt: "2026-04-04",
    },
    {
        id: "SHP-4417",
        orderId: "ORD-7838",
        customer: "James Wilson",
        initials: "JW",
        email: "james.wilson@example.com",
        carrier: "fedex",
        trackingNumber: "1Z999AA10123456792",
        status: "delivered",
        origin: "Chicago, IL",
        destination: "Detroit, MI",
        weight: 0.6,
        estimatedDelivery: "2026-04-06",
        createdAt: "2026-04-03",
    },
    {
        id: "SHP-4416",
        orderId: "ORD-7837",
        customer: "Olivia Brown",
        initials: "OB",
        email: "olivia.brown@example.com",
        carrier: "ups",
        trackingNumber: "1Z999AA10123456793",
        status: "returned",
        origin: "Miami, FL",
        destination: "Orlando, FL",
        weight: 1.9,
        estimatedDelivery: "2026-04-07",
        createdAt: "2026-04-03",
    },
    {
        id: "SHP-4415",
        orderId: "ORD-7836",
        customer: "Noah Martinez",
        initials: "NM",
        email: "noah.martinez@example.com",
        carrier: "dhl",
        trackingNumber: "1234567891",
        status: "in_transit",
        origin: "Los Angeles, CA",
        destination: "Las Vegas, NV",
        weight: 4.2,
        estimatedDelivery: "2026-04-10",
        createdAt: "2026-04-02",
    },
    {
        id: "SHP-4414",
        orderId: "ORD-7835",
        customer: "Ava Thompson",
        initials: "AT",
        email: "ava.thompson@example.com",
        carrier: "fedex",
        trackingNumber: "1Z999AA10123456794",
        status: "delivered",
        origin: "Boston, MA",
        destination: "New York, NY",
        weight: 2.7,
        estimatedDelivery: "2026-04-05",
        createdAt: "2026-04-02",
    },
    {
        id: "SHP-4413",
        orderId: "ORD-7834",
        customer: "Liam Anderson",
        initials: "LA",
        email: "liam.anderson@example.com",
        carrier: "usps",
        trackingNumber: "9400111899223447520490",
        status: "in_transit",
        origin: "Nashville, TN",
        destination: "Atlanta, GA",
        weight: 1.4,
        estimatedDelivery: "2026-04-11",
        createdAt: "2026-04-01",
    },
    {
        id: "SHP-4412",
        orderId: "ORD-7833",
        customer: "Sophia Lee",
        initials: "SL",
        email: "sophia.lee@example.com",
        carrier: "fedex",
        trackingNumber: "1Z999AA10123456795",
        status: "failed",
        origin: "Houston, TX",
        destination: "San Antonio, TX",
        weight: 0.5,
        estimatedDelivery: "2026-04-04",
        createdAt: "2026-04-01",
    },
    {
        id: "SHP-4411",
        orderId: "ORD-7832",
        customer: "Ethan Clark",
        initials: "EC",
        email: "ethan.clark@example.com",
        carrier: "ups",
        trackingNumber: "1Z999AA10123456796",
        status: "delivered",
        origin: "Philadelphia, PA",
        destination: "Baltimore, MD",
        weight: 5.1,
        estimatedDelivery: "2026-04-03",
        createdAt: "2026-03-31",
    },
    {
        id: "SHP-4410",
        orderId: "ORD-7831",
        customer: "Mia Lewis",
        initials: "ML",
        email: "mia.lewis@example.com",
        carrier: "blue_dart",
        trackingNumber: "8754321234",
        status: "pending",
        origin: "Minneapolis, MN",
        destination: "Milwaukee, WI",
        weight: 1.8,
        estimatedDelivery: "2026-04-13",
        createdAt: "2026-03-31",
    },
    {
        id: "SHP-4409",
        orderId: "ORD-7830",
        customer: "Oliver Hall",
        initials: "OH",
        email: "oliver.hall@example.com",
        carrier: "dhl",
        trackingNumber: "1234567892",
        status: "delivered",
        origin: "Portland, OR",
        destination: "Eugene, OR",
        weight: 0.3,
        estimatedDelivery: "2026-04-02",
        createdAt: "2026-03-30",
    },
];

// ─── Shipment Details Map ─────────────────────────────────────────────────────

export const shipmentDetailsMap: Record<string, ShipmentDetail> = {
    "SHP-4421": {
        items: [
            {
                id: "SITEM-001",
                productName: 'MacBook Pro 14"',
                sku: "APP-MBP14-M3",
                initials: "MB",
                quantity: 1,
                weight: 2.3,
            },
        ],
        originAddress: {
            street: "100 Tech Park Blvd",
            city: "San Jose",
            state: "CA",
            zip: "95110",
            country: "United States",
        },
        destinationAddress: {
            street: "142 Maple Drive",
            city: "San Francisco",
            state: "CA",
            zip: "94105",
            country: "United States",
        },
        weight: 2.3,
        dimensions: "35 × 24 × 5 cm",
        shippingCost: 0,
        deliveredAt: "2026-04-08",
        createdAt: "2026-04-05T09:24:00Z",
        updatedAt: "2026-04-08T10:00:00Z",
    } as ShipmentDetail & { trackingNumber: string },
    "SHP-4420": {
        items: [
            {
                id: "SITEM-002",
                productName: "Nike Air Max 270",
                sku: "NK-AM270-BLK-10",
                initials: "NA",
                quantity: 1,
                weight: 0.6,
            },
            {
                id: "SITEM-003",
                productName: "Nike Running Socks (3-Pack)",
                sku: "NK-SOCK-3PK-M",
                initials: "NS",
                quantity: 1,
                weight: 0.5,
            },
        ],
        originAddress: {
            street: "500 Logistics Way",
            city: "Dallas",
            state: "TX",
            zip: "75201",
            country: "United States",
        },
        destinationAddress: {
            street: "88 Oak Street",
            city: "Austin",
            state: "TX",
            zip: "78701",
            country: "United States",
        },
        weight: 1.1,
        dimensions: "40 × 30 × 15 cm",
        shippingCost: 9.99,
        notes: "Fragile – handle with care",
        createdAt: "2026-04-05T11:10:00Z",
        updatedAt: "2026-04-06T08:45:00Z",
    },
    "SHP-4419": {
        items: [
            {
                id: "SITEM-004",
                productName: "Sony WH-1000XM5",
                sku: "SNY-WH1000XM5",
                initials: "SW",
                quantity: 1,
                weight: 0.8,
            },
        ],
        originAddress: {
            street: "200 Warehouse Rd",
            city: "Portland",
            state: "OR",
            zip: "97201",
            country: "United States",
        },
        destinationAddress: {
            street: "21 Birch Avenue",
            city: "Seattle",
            state: "WA",
            zip: "98101",
            country: "United States",
        },
        weight: 0.8,
        dimensions: "28 × 20 × 10 cm",
        shippingCost: 0,
        createdAt: "2026-04-04T14:00:00Z",
        updatedAt: "2026-04-07T09:20:00Z",
    },
    "SHP-4418": {
        items: [
            {
                id: "SITEM-005",
                productName: "Levi's 501 Jeans",
                sku: "LV-501-BLU-32",
                initials: "LJ",
                quantity: 2,
                weight: 1.0,
            },
            {
                id: "SITEM-006",
                productName: "Cotton T-Shirt",
                sku: "CT-TSH-WHT-M",
                initials: "CT",
                quantity: 1,
                weight: 0.3,
            },
        ],
        originAddress: {
            street: "45 Distribution Center Rd",
            city: "Phoenix",
            state: "AZ",
            zip: "85001",
            country: "United States",
        },
        destinationAddress: {
            street: "309 Elm Street",
            city: "Denver",
            state: "CO",
            zip: "80203",
            country: "United States",
        },
        weight: 3.5,
        dimensions: "45 × 35 × 12 cm",
        shippingCost: 12.5,
        notes: "Leave at door if no one answers",
        createdAt: "2026-04-04T16:30:00Z",
        updatedAt: "2026-04-04T16:30:00Z",
    },
};
