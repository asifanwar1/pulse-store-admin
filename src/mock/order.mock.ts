// ─── Types ────────────────────────────────────────────────────────────────────

export type OrderStatus =
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";

export type PaymentMethod =
    | "credit_card"
    | "debit_card"
    | "paypal"
    | "bank_transfer"
    | "cash_on_delivery";

export interface OrderStatItem {
    value: number;
    trend: number;
    trendDirection: "up" | "down";
    prefix?: string;
    suffix?: string;
}

export interface OrderStats {
    totalOrders: OrderStatItem;
    pendingOrders: OrderStatItem;
    shippedOrders: OrderStatItem;
    revenue: OrderStatItem;
}

export interface Order {
    id: string;
    customer: string;
    initials: string;
    email: string;
    phone: string;
    itemCount: number;
    total: number;
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    date: string;
}

export interface OrderItem {
    id: string;
    productId: string;
    productName: string;
    sku: string;
    category: string;
    initials: string;
    quantity: number;
    unitPrice: number;
    total: number;
}

export interface OrderAddress {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

export interface OrderDetail {
    items: OrderItem[];
    subtotal: number;
    shippingCost: number;
    tax: number;
    discount: number;
    shippingAddress: OrderAddress;
    billingAddress: OrderAddress;
    notes?: string;
    trackingNumber?: string;
    estimatedDelivery?: string;
    createdAt: string;
    updatedAt: string;
}

// ─── Order Stats ──────────────────────────────────────────────────────────────

export const orderStatsData: OrderStats = {
    totalOrders: { value: 2847, trend: 8.4, trendDirection: "up" },
    pendingOrders: { value: 143, trend: 18.2, trendDirection: "down" },
    shippedOrders: { value: 612, trend: 5.3, trendDirection: "up" },
    revenue: { value: 184293, trend: 11.2, trendDirection: "up", prefix: "$" },
};

// ─── Orders List ──────────────────────────────────────────────────────────────

export const ordersListData: Order[] = [
    {
        id: "ORD-7842",
        customer: "Alex Johnson",
        initials: "AJ",
        email: "alex.johnson@example.com",
        phone: "5551234567",
        itemCount: 1,
        total: 1899,
        status: "delivered",
        paymentMethod: "credit_card",
        date: "2026-04-05",
    },
    {
        id: "ORD-7841",
        customer: "Sarah Williams",
        initials: "SW",
        email: "sarah.williams@example.com",
        phone: "5552345678",
        itemCount: 2,
        total: 298,
        status: "shipped",
        paymentMethod: "paypal",
        date: "2026-04-05",
    },
    {
        id: "ORD-7840",
        customer: "Michael Chen",
        initials: "MC",
        email: "michael.chen@example.com",
        phone: "5553456789",
        itemCount: 1,
        total: 349,
        status: "processing",
        paymentMethod: "debit_card",
        date: "2026-04-04",
    },
    {
        id: "ORD-7839",
        customer: "Emma Davis",
        initials: "ED",
        email: "emma.davis@example.com",
        phone: "5554567890",
        itemCount: 3,
        total: 267,
        status: "pending",
        paymentMethod: "credit_card",
        date: "2026-04-04",
    },
    {
        id: "ORD-7838",
        customer: "James Wilson",
        initials: "JW",
        email: "james.wilson@example.com",
        phone: "5555678901",
        itemCount: 1,
        total: 229,
        status: "delivered",
        paymentMethod: "bank_transfer",
        date: "2026-04-03",
    },
    {
        id: "ORD-7837",
        customer: "Olivia Brown",
        initials: "OB",
        email: "olivia.brown@example.com",
        phone: "5556789012",
        itemCount: 1,
        total: 599,
        status: "cancelled",
        paymentMethod: "credit_card",
        date: "2026-04-03",
    },
    {
        id: "ORD-7836",
        customer: "Noah Martinez",
        initials: "NM",
        email: "noah.martinez@example.com",
        phone: "5557890123",
        itemCount: 1,
        total: 1299,
        status: "shipped",
        paymentMethod: "credit_card",
        date: "2026-04-02",
    },
    {
        id: "ORD-7835",
        customer: "Ava Thompson",
        initials: "AT",
        email: "ava.thompson@example.com",
        phone: "5558901234",
        itemCount: 4,
        total: 512,
        status: "delivered",
        paymentMethod: "paypal",
        date: "2026-04-02",
    },
    {
        id: "ORD-7834",
        customer: "Liam Anderson",
        initials: "LA",
        email: "liam.anderson@example.com",
        phone: "5559012345",
        itemCount: 2,
        total: 748,
        status: "processing",
        paymentMethod: "credit_card",
        date: "2026-04-01",
    },
    {
        id: "ORD-7833",
        customer: "Sophia Lee",
        initials: "SL",
        email: "sophia.lee@example.com",
        phone: "5550123456",
        itemCount: 1,
        total: 129,
        status: "delivered",
        paymentMethod: "debit_card",
        date: "2026-04-01",
    },
    {
        id: "ORD-7832",
        customer: "Ethan Clark",
        initials: "EC",
        email: "ethan.clark@example.com",
        phone: "5551122334",
        itemCount: 3,
        total: 1540,
        status: "shipped",
        paymentMethod: "bank_transfer",
        date: "2026-03-31",
    },
    {
        id: "ORD-7831",
        customer: "Mia Lewis",
        initials: "ML",
        email: "mia.lewis@example.com",
        phone: "5552233445",
        itemCount: 2,
        total: 390,
        status: "pending",
        paymentMethod: "cash_on_delivery",
        date: "2026-03-31",
    },
    {
        id: "ORD-7830",
        customer: "Oliver Hall",
        initials: "OH",
        email: "oliver.hall@example.com",
        phone: "5553344556",
        itemCount: 1,
        total: 89,
        status: "delivered",
        paymentMethod: "credit_card",
        date: "2026-03-30",
    },
    {
        id: "ORD-7829",
        customer: "Isabella Young",
        initials: "IY",
        email: "isabella.young@example.com",
        phone: "5554455667",
        itemCount: 5,
        total: 2340,
        status: "delivered",
        paymentMethod: "credit_card",
        date: "2026-03-30",
    },
    {
        id: "ORD-7828",
        customer: "Lucas Walker",
        initials: "LW",
        email: "lucas.walker@example.com",
        phone: "5555566778",
        itemCount: 1,
        total: 459,
        status: "cancelled",
        paymentMethod: "paypal",
        date: "2026-03-29",
    },
    {
        id: "ORD-7827",
        customer: "Charlotte King",
        initials: "CK",
        email: "charlotte.king@example.com",
        phone: "5556677889",
        itemCount: 2,
        total: 618,
        status: "processing",
        paymentMethod: "debit_card",
        date: "2026-03-28",
    },
];

// ─── Order Details Map ────────────────────────────────────────────────────────

export const orderDetailsMap: Record<string, OrderDetail> = {
    "ORD-7842": {
        items: [
            {
                id: "ITEM-001",
                productId: "PRD-0001",
                productName: 'MacBook Pro 14"',
                sku: "APP-MBP14-M3",
                category: "Electronics",
                initials: "MB",
                quantity: 1,
                unitPrice: 1899,
                total: 1899,
            },
        ],
        subtotal: 1899,
        shippingCost: 0,
        tax: 170.91,
        discount: 0,
        shippingAddress: {
            street: "142 Maple Drive",
            city: "San Francisco",
            state: "CA",
            zip: "94105",
            country: "United States",
        },
        billingAddress: {
            street: "142 Maple Drive",
            city: "San Francisco",
            state: "CA",
            zip: "94105",
            country: "United States",
        },
        trackingNumber: "1Z999AA10123456790",
        estimatedDelivery: "2026-04-08",
        createdAt: "2026-04-05T09:24:00Z",
        updatedAt: "2026-04-07T14:30:00Z",
    },
    "ORD-7841": {
        items: [
            {
                id: "ITEM-002",
                productId: "PRD-0012",
                productName: "Nike Air Max 270",
                sku: "NK-AM270-BLK-10",
                category: "Sports",
                initials: "NA",
                quantity: 1,
                unitPrice: 149,
                total: 149,
            },
            {
                id: "ITEM-003",
                productId: "PRD-0013",
                productName: "Nike Running Socks (3-Pack)",
                sku: "NK-SOCK-3PK-M",
                category: "Sports",
                initials: "NS",
                quantity: 1,
                unitPrice: 149,
                total: 149,
            },
        ],
        subtotal: 298,
        shippingCost: 9.99,
        tax: 26.82,
        discount: 15,
        shippingAddress: {
            street: "88 Oak Street",
            city: "Austin",
            state: "TX",
            zip: "78701",
            country: "United States",
        },
        billingAddress: {
            street: "88 Oak Street",
            city: "Austin",
            state: "TX",
            zip: "78701",
            country: "United States",
        },
        trackingNumber: "1Z999AA10123456791",
        estimatedDelivery: "2026-04-09",
        createdAt: "2026-04-05T11:10:00Z",
        updatedAt: "2026-04-06T08:45:00Z",
    },
    "ORD-7840": {
        items: [
            {
                id: "ITEM-004",
                productId: "PRD-0002",
                productName: "Sony WH-1000XM5",
                sku: "SNY-WH1000XM5",
                category: "Electronics",
                initials: "SW",
                quantity: 1,
                unitPrice: 349,
                total: 349,
            },
        ],
        subtotal: 349,
        shippingCost: 0,
        tax: 31.41,
        discount: 0,
        shippingAddress: {
            street: "21 Birch Avenue",
            city: "Seattle",
            state: "WA",
            zip: "98101",
            country: "United States",
        },
        billingAddress: {
            street: "21 Birch Avenue",
            city: "Seattle",
            state: "WA",
            zip: "98101",
            country: "United States",
        },
        createdAt: "2026-04-04T15:33:00Z",
        updatedAt: "2026-04-04T15:33:00Z",
    },
    "ORD-7839": {
        items: [
            {
                id: "ITEM-005",
                productId: "PRD-0025",
                productName: "Levi's 501 Original Jeans",
                sku: "LVS-501-BLU-32",
                category: "Clothing",
                initials: "LJ",
                quantity: 2,
                unitPrice: 89,
                total: 178,
            },
            {
                id: "ITEM-006",
                productId: "PRD-0026",
                productName: "Levi's White T-Shirt",
                sku: "LVS-TEE-WHT-M",
                category: "Clothing",
                initials: "LT",
                quantity: 1,
                unitPrice: 89,
                total: 89,
            },
        ],
        subtotal: 267,
        shippingCost: 5.99,
        tax: 24.03,
        discount: 20,
        shippingAddress: {
            street: "503 Pine Road",
            city: "Chicago",
            state: "IL",
            zip: "60601",
            country: "United States",
        },
        billingAddress: {
            street: "503 Pine Road",
            city: "Chicago",
            state: "IL",
            zip: "60601",
            country: "United States",
        },
        notes: "Please leave at front door if no one is home.",
        createdAt: "2026-04-04T08:12:00Z",
        updatedAt: "2026-04-04T08:12:00Z",
    },
    "ORD-7838": {
        items: [
            {
                id: "ITEM-007",
                productId: "PRD-0040",
                productName: "Garden Tool Set (12 Piece)",
                sku: "GRD-TOOL-12PC",
                category: "Home & Garden",
                initials: "GT",
                quantity: 1,
                unitPrice: 229,
                total: 229,
            },
        ],
        subtotal: 229,
        shippingCost: 12.99,
        tax: 20.61,
        discount: 0,
        shippingAddress: {
            street: "77 Elm Court",
            city: "Denver",
            state: "CO",
            zip: "80202",
            country: "United States",
        },
        billingAddress: {
            street: "77 Elm Court",
            city: "Denver",
            state: "CO",
            zip: "80202",
            country: "United States",
        },
        trackingNumber: "1Z999AA10123456792",
        estimatedDelivery: "2026-04-06",
        createdAt: "2026-04-03T10:00:00Z",
        updatedAt: "2026-04-05T09:30:00Z",
    },
    "ORD-7837": {
        items: [
            {
                id: "ITEM-008",
                productId: "PRD-0031",
                productName: "Dyson V11 Cordless Vacuum",
                sku: "DYS-V11-ANML",
                category: "Home & Garden",
                initials: "DV",
                quantity: 1,
                unitPrice: 599,
                total: 599,
            },
        ],
        subtotal: 599,
        shippingCost: 0,
        tax: 53.91,
        discount: 0,
        shippingAddress: {
            street: "312 Cedar Lane",
            city: "Phoenix",
            state: "AZ",
            zip: "85001",
            country: "United States",
        },
        billingAddress: {
            street: "312 Cedar Lane",
            city: "Phoenix",
            state: "AZ",
            zip: "85001",
            country: "United States",
        },
        notes: "Order cancelled by customer – out of stock notice received.",
        createdAt: "2026-04-03T14:45:00Z",
        updatedAt: "2026-04-03T18:00:00Z",
    },
    "ORD-7836": {
        items: [
            {
                id: "ITEM-009",
                productId: "PRD-0003",
                productName: 'Samsung 65" QLED 4K TV',
                sku: "SAM-QN65QN90C",
                category: "Electronics",
                initials: "SQ",
                quantity: 1,
                unitPrice: 1299,
                total: 1299,
            },
        ],
        subtotal: 1299,
        shippingCost: 29.99,
        tax: 116.91,
        discount: 0,
        shippingAddress: {
            street: "58 Spruce Blvd",
            city: "Miami",
            state: "FL",
            zip: "33101",
            country: "United States",
        },
        billingAddress: {
            street: "58 Spruce Blvd",
            city: "Miami",
            state: "FL",
            zip: "33101",
            country: "United States",
        },
        trackingNumber: "1Z999AA10123456793",
        estimatedDelivery: "2026-04-10",
        createdAt: "2026-04-02T16:20:00Z",
        updatedAt: "2026-04-04T11:00:00Z",
    },
    "ORD-7835": {
        items: [
            {
                id: "ITEM-010",
                productId: "PRD-0055",
                productName: "Charlotte Tilbury Magic Cream",
                sku: "CT-MAGIC-50ML",
                category: "Beauty",
                initials: "CM",
                quantity: 2,
                unitPrice: 128,
                total: 256,
            },
            {
                id: "ITEM-011",
                productId: "PRD-0056",
                productName: "Charlotte Tilbury Pillow Talk Lipstick",
                sku: "CT-PTLK-LIP",
                category: "Beauty",
                initials: "CP",
                quantity: 2,
                unitPrice: 128,
                total: 256,
            },
        ],
        subtotal: 512,
        shippingCost: 0,
        tax: 46.08,
        discount: 50,
        shippingAddress: {
            street: "19 Willow Way",
            city: "New York",
            state: "NY",
            zip: "10001",
            country: "United States",
        },
        billingAddress: {
            street: "19 Willow Way",
            city: "New York",
            state: "NY",
            zip: "10001",
            country: "United States",
        },
        trackingNumber: "1Z999AA10123456794",
        estimatedDelivery: "2026-04-07",
        createdAt: "2026-04-02T08:55:00Z",
        updatedAt: "2026-04-03T12:00:00Z",
    },
    "ORD-7834": {
        items: [
            {
                id: "ITEM-012",
                productId: "PRD-0010",
                productName: "Bose QuietComfort 45",
                sku: "BSE-QC45-BLK",
                category: "Electronics",
                initials: "BQ",
                quantity: 1,
                unitPrice: 329,
                total: 329,
            },
            {
                id: "ITEM-013",
                productId: "PRD-0011",
                productName: "Anker USB-C Hub 7-in-1",
                sku: "ANK-HUB7-C",
                category: "Electronics",
                initials: "AH",
                quantity: 1,
                unitPrice: 419,
                total: 419,
            },
        ],
        subtotal: 748,
        shippingCost: 0,
        tax: 67.32,
        discount: 0,
        shippingAddress: {
            street: "604 Ash Street",
            city: "Portland",
            state: "OR",
            zip: "97201",
            country: "United States",
        },
        billingAddress: {
            street: "604 Ash Street",
            city: "Portland",
            state: "OR",
            zip: "97201",
            country: "United States",
        },
        createdAt: "2026-04-01T13:40:00Z",
        updatedAt: "2026-04-01T13:40:00Z",
    },
    "ORD-7833": {
        items: [
            {
                id: "ITEM-014",
                productId: "PRD-0060",
                productName: "The Alchemist (Paperback)",
                sku: "BK-ALCH-PPRB",
                category: "Books",
                initials: "BA",
                quantity: 1,
                unitPrice: 129,
                total: 129,
            },
        ],
        subtotal: 129,
        shippingCost: 3.99,
        tax: 11.61,
        discount: 0,
        shippingAddress: {
            street: "24 Walnut Terrace",
            city: "Boston",
            state: "MA",
            zip: "02101",
            country: "United States",
        },
        billingAddress: {
            street: "24 Walnut Terrace",
            city: "Boston",
            state: "MA",
            zip: "02101",
            country: "United States",
        },
        trackingNumber: "1Z999AA10123456795",
        estimatedDelivery: "2026-04-05",
        createdAt: "2026-04-01T07:30:00Z",
        updatedAt: "2026-04-03T10:00:00Z",
    },
    "ORD-7832": {
        items: [
            {
                id: "ITEM-015",
                productId: "PRD-0004",
                productName: 'iPad Pro 12.9" M2',
                sku: "APP-IPAD-PRO-M2",
                category: "Electronics",
                initials: "IP",
                quantity: 1,
                unitPrice: 1099,
                total: 1099,
            },
            {
                id: "ITEM-016",
                productId: "PRD-0005",
                productName: "Apple Pencil 2nd Gen",
                sku: "APP-PENCIL-2",
                category: "Electronics",
                initials: "AP",
                quantity: 1,
                unitPrice: 219,
                total: 219,
            },
            {
                id: "ITEM-017",
                productId: "PRD-0006",
                productName: "Smart Folio Keyboard Case",
                sku: "APP-FOLIO-KB",
                category: "Electronics",
                initials: "FK",
                quantity: 1,
                unitPrice: 222,
                total: 222,
            },
        ],
        subtotal: 1540,
        shippingCost: 0,
        tax: 138.6,
        discount: 100,
        shippingAddress: {
            street: "112 Poplar Lane",
            city: "Atlanta",
            state: "GA",
            zip: "30301",
            country: "United States",
        },
        billingAddress: {
            street: "112 Poplar Lane",
            city: "Atlanta",
            state: "GA",
            zip: "30301",
            country: "United States",
        },
        trackingNumber: "1Z999AA10123456796",
        estimatedDelivery: "2026-04-04",
        createdAt: "2026-03-31T11:15:00Z",
        updatedAt: "2026-04-01T09:50:00Z",
    },
    "ORD-7831": {
        items: [
            {
                id: "ITEM-018",
                productId: "PRD-0022",
                productName: "Adidas Ultraboost 22",
                sku: "ADI-UB22-WHT-9",
                category: "Sports",
                initials: "AU",
                quantity: 1,
                unitPrice: 190,
                total: 190,
            },
            {
                id: "ITEM-019",
                productId: "PRD-0023",
                productName: "Adidas Gym Bag",
                sku: "ADI-GYM-BLK",
                category: "Sports",
                initials: "AG",
                quantity: 1,
                unitPrice: 200,
                total: 200,
            },
        ],
        subtotal: 390,
        shippingCost: 0,
        tax: 35.1,
        discount: 0,
        shippingAddress: {
            street: "46 Sycamore Court",
            city: "Nashville",
            state: "TN",
            zip: "37201",
            country: "United States",
        },
        billingAddress: {
            street: "46 Sycamore Court",
            city: "Nashville",
            state: "TN",
            zip: "37201",
            country: "United States",
        },
        notes: "Gift – please include gift receipt.",
        createdAt: "2026-03-31T16:00:00Z",
        updatedAt: "2026-03-31T16:00:00Z",
    },
    "ORD-7830": {
        items: [
            {
                id: "ITEM-020",
                productId: "PRD-0028",
                productName: "H&M Basic Cotton Tee",
                sku: "HM-TEE-COT-WHT-L",
                category: "Clothing",
                initials: "HT",
                quantity: 1,
                unitPrice: 89,
                total: 89,
            },
        ],
        subtotal: 89,
        shippingCost: 5.99,
        tax: 8.01,
        discount: 0,
        shippingAddress: {
            street: "9 Magnolia Street",
            city: "Las Vegas",
            state: "NV",
            zip: "89101",
            country: "United States",
        },
        billingAddress: {
            street: "9 Magnolia Street",
            city: "Las Vegas",
            state: "NV",
            zip: "89101",
            country: "United States",
        },
        trackingNumber: "1Z999AA10123456797",
        estimatedDelivery: "2026-04-03",
        createdAt: "2026-03-30T09:05:00Z",
        updatedAt: "2026-04-01T14:00:00Z",
    },
    "ORD-7829": {
        items: [
            {
                id: "ITEM-021",
                productId: "PRD-0001",
                productName: 'MacBook Pro 14"',
                sku: "APP-MBP14-M3",
                category: "Electronics",
                initials: "MB",
                quantity: 1,
                unitPrice: 1899,
                total: 1899,
            },
            {
                id: "ITEM-022",
                productId: "PRD-0007",
                productName: "LG 27UK850-W 4K Monitor",
                sku: "LG-27UK850-W",
                category: "Electronics",
                initials: "LM",
                quantity: 1,
                unitPrice: 399,
                total: 399,
            },
            {
                id: "ITEM-023",
                productId: "PRD-0008",
                productName: "Logitech MX Master 3 Mouse",
                sku: "LGT-MXM3-GRY",
                category: "Electronics",
                initials: "LG",
                quantity: 1,
                unitPrice: 42,
                total: 42,
            },
        ],
        subtotal: 2340,
        shippingCost: 0,
        tax: 210.6,
        discount: 200,
        shippingAddress: {
            street: "731 Redwood Drive",
            city: "Los Angeles",
            state: "CA",
            zip: "90001",
            country: "United States",
        },
        billingAddress: {
            street: "731 Redwood Drive",
            city: "Los Angeles",
            state: "CA",
            zip: "90001",
            country: "United States",
        },
        trackingNumber: "1Z999AA10123456798",
        estimatedDelivery: "2026-04-04",
        createdAt: "2026-03-30T12:20:00Z",
        updatedAt: "2026-03-31T08:00:00Z",
    },
    "ORD-7828": {
        items: [
            {
                id: "ITEM-024",
                productId: "PRD-0032",
                productName: "iRobot Roomba i7+",
                sku: "IRB-RMBA-I7P",
                category: "Home & Garden",
                initials: "RB",
                quantity: 1,
                unitPrice: 459,
                total: 459,
            },
        ],
        subtotal: 459,
        shippingCost: 0,
        tax: 41.31,
        discount: 0,
        shippingAddress: {
            street: "263 Chestnut Ave",
            city: "San Diego",
            state: "CA",
            zip: "92101",
            country: "United States",
        },
        billingAddress: {
            street: "263 Chestnut Ave",
            city: "San Diego",
            state: "CA",
            zip: "92101",
            country: "United States",
        },
        notes: "Cancelled – customer changed mind before fulfilment.",
        createdAt: "2026-03-29T10:30:00Z",
        updatedAt: "2026-03-29T11:00:00Z",
    },
    "ORD-7827": {
        items: [
            {
                id: "ITEM-025",
                productId: "PRD-0045",
                productName: "Nespresso Vertuo Pop Coffee Maker",
                sku: "NES-VTPOP-BLK",
                category: "Home & Garden",
                initials: "NV",
                quantity: 1,
                unitPrice: 169,
                total: 169,
            },
            {
                id: "ITEM-026",
                productId: "PRD-0046",
                productName: "Nespresso Vertuo Pods Pack",
                sku: "NES-PODS-50",
                category: "Home & Garden",
                initials: "NP",
                quantity: 1,
                unitPrice: 449,
                total: 449,
            },
        ],
        subtotal: 618,
        shippingCost: 0,
        tax: 55.62,
        discount: 30,
        shippingAddress: {
            street: "17 Birchwood Close",
            city: "Charlotte",
            state: "NC",
            zip: "28201",
            country: "United States",
        },
        billingAddress: {
            street: "17 Birchwood Close",
            city: "Charlotte",
            state: "NC",
            zip: "28201",
            country: "United States",
        },
        createdAt: "2026-03-28T14:10:00Z",
        updatedAt: "2026-03-28T14:10:00Z",
    },
};
