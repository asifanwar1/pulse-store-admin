// ─── Types ────────────────────────────────────────────────────────────────────

export type CustomerStatus = "active" | "inactive" | "blocked";
export type CustomerSegment = "vip" | "regular" | "new" | "at_risk" | "blocked";

export interface CustomerStatItem {
    value: number;
    trend: number;
    trendDirection: "up" | "down";
    prefix?: string;
    suffix?: string;
}

export interface CustomerStats {
    totalCustomers: CustomerStatItem;
    activeCustomers: CustomerStatItem;
    newThisMonth: CustomerStatItem;
    avgLifetimeValue: CustomerStatItem;
}

export interface CustomerSpendTrendData {
    month: string;
    vip: number;
    regular: number;
    newCustomers: number;
}

export interface CustomerAcquisitionData {
    channel: string;
    customers: number;
    color: string;
}

export interface CustomerSegmentData {
    name: string;
    value: number;
    color: string;
    count: number;
}

export interface CustomerRetentionData {
    month: string;
    retentionRate: number;
    churnRate: number;
}

export interface Customer {
    id: string;
    name: string;
    initials: string;
    email: string;
    phone: string;
    segment: CustomerSegment;
    status: CustomerStatus;
    totalOrders: number;
    totalSpend: number;
    avgOrderValue: number;
    lastOrderDate: string;
    joinedDate: string;
    location: string;
}

export interface TopCustomer {
    id: string;
    name: string;
    initials: string;
    email: string;
    totalSpend: number;
    totalOrders: number;
    segment: CustomerSegment;
    trend: number;
}

// ─── Customer Stats ───────────────────────────────────────────────────────────

export const customerStatsData: CustomerStats = {
    totalCustomers: {
        value: 12_847,
        trend: 8.4,
        trendDirection: "up",
    },
    activeCustomers: {
        value: 9_312,
        trend: 5.2,
        trendDirection: "up",
    },
    newThisMonth: {
        value: 358,
        trend: 14.6,
        trendDirection: "up",
    },
    avgLifetimeValue: {
        value: 486,
        trend: 3.1,
        trendDirection: "down",
        prefix: "$",
    },
};

// ─── Customer Spend Trend ─────────────────────────────────────────────────────

export const customerSpendTrendData: CustomerSpendTrendData[] = [
    { month: "Jan", vip: 48200, regular: 31400, newCustomers: 9800 },
    { month: "Feb", vip: 53700, regular: 34100, newCustomers: 11200 },
    { month: "Mar", vip: 50400, regular: 32800, newCustomers: 10500 },
    { month: "Apr", vip: 61800, regular: 39200, newCustomers: 13600 },
    { month: "May", vip: 74300, regular: 46500, newCustomers: 16100 },
    { month: "Jun", vip: 69900, regular: 43800, newCustomers: 14700 },
    { month: "Jul", vip: 81200, regular: 50300, newCustomers: 17800 },
    { month: "Aug", vip: 88500, regular: 54100, newCustomers: 19400 },
    { month: "Sep", vip: 79700, regular: 49600, newCustomers: 17200 },
    { month: "Oct", vip: 94100, regular: 58300, newCustomers: 21500 },
    { month: "Nov", vip: 112400, regular: 68700, newCustomers: 26300 },
    { month: "Dec", vip: 131800, regular: 79200, newCustomers: 31600 },
];

// ─── Customer Acquisition by Channel ─────────────────────────────────────────

export const customerAcquisitionData: CustomerAcquisitionData[] = [
    { channel: "Organic Search", customers: 3420, color: "#2A5C42" },
    { channel: "Paid Ads", customers: 2810, color: "#3B82F6" },
    { channel: "Social Media", customers: 2240, color: "#8B5CF6" },
    { channel: "Referral", customers: 1680, color: "#F59E0B" },
    { channel: "Email", customers: 1320, color: "#EC4899" },
    { channel: "Direct", customers: 870, color: "#14B8A6" },
    { channel: "Affiliate", customers: 507, color: "#F97316" },
];

// ─── Customer Segments (Donut Chart) ─────────────────────────────────────────

export const customerSegmentData: CustomerSegmentData[] = [
    { name: "Regular", value: 52, color: "#3B82F6", count: 6680 },
    { name: "VIP", value: 18, color: "#2A5C42", count: 2312 },
    { name: "New", value: 20, color: "#F59E0B", count: 2570 },
    { name: "At Risk", value: 10, color: "#EF4444", count: 1285 },
];

// ─── Customer Retention ───────────────────────────────────────────────────────

export const customerRetentionData: CustomerRetentionData[] = [
    { month: "Jan", retentionRate: 72.4, churnRate: 27.6 },
    { month: "Feb", retentionRate: 74.1, churnRate: 25.9 },
    { month: "Mar", retentionRate: 73.8, churnRate: 26.2 },
    { month: "Apr", retentionRate: 75.5, churnRate: 24.5 },
    { month: "May", retentionRate: 77.2, churnRate: 22.8 },
    { month: "Jun", retentionRate: 76.8, churnRate: 23.2 },
    { month: "Jul", retentionRate: 78.9, churnRate: 21.1 },
    { month: "Aug", retentionRate: 80.3, churnRate: 19.7 },
    { month: "Sep", retentionRate: 79.6, churnRate: 20.4 },
    { month: "Oct", retentionRate: 81.4, churnRate: 18.6 },
    { month: "Nov", retentionRate: 83.1, churnRate: 16.9 },
    { month: "Dec", retentionRate: 84.7, churnRate: 15.3 },
];

// ─── Customers List ───────────────────────────────────────────────────────────

export const customersListData: Customer[] = [
    {
        id: "CUS-0001",
        name: "Alex Johnson",
        initials: "AJ",
        email: "alex.johnson@example.com",
        phone: "+1 (555) 012-3456",
        segment: "vip",
        status: "active",
        totalOrders: 47,
        totalSpend: 12840,
        avgOrderValue: 273,
        lastOrderDate: "2026-04-05",
        joinedDate: "2022-03-14",
        location: "New York, US",
    },
    {
        id: "CUS-0002",
        name: "Sarah Williams",
        initials: "SW",
        email: "sarah.williams@example.com",
        phone: "+1 (555) 234-5678",
        segment: "vip",
        status: "active",
        totalOrders: 38,
        totalSpend: 9640,
        avgOrderValue: 254,
        lastOrderDate: "2026-04-05",
        joinedDate: "2022-07-22",
        location: "Los Angeles, US",
    },
    {
        id: "CUS-0003",
        name: "Michael Chen",
        initials: "MC",
        email: "michael.chen@example.com",
        phone: "+1 (555) 345-6789",
        segment: "regular",
        status: "active",
        totalOrders: 24,
        totalSpend: 4320,
        avgOrderValue: 180,
        lastOrderDate: "2026-04-04",
        joinedDate: "2023-01-08",
        location: "San Francisco, US",
    },
    {
        id: "CUS-0004",
        name: "Emma Davis",
        initials: "ED",
        email: "emma.davis@example.com",
        phone: "+1 (555) 456-7890",
        segment: "regular",
        status: "active",
        totalOrders: 19,
        totalSpend: 3140,
        avgOrderValue: 165,
        lastOrderDate: "2026-04-04",
        joinedDate: "2023-05-17",
        location: "Chicago, US",
    },
    {
        id: "CUS-0005",
        name: "James Wilson",
        initials: "JW",
        email: "james.wilson@example.com",
        phone: "+1 (555) 567-8901",
        segment: "at_risk",
        status: "inactive",
        totalOrders: 11,
        totalSpend: 1890,
        avgOrderValue: 172,
        lastOrderDate: "2026-01-12",
        joinedDate: "2022-11-30",
        location: "Houston, US",
    },
    {
        id: "CUS-0006",
        name: "Olivia Brown",
        initials: "OB",
        email: "olivia.brown@example.com",
        phone: "+1 (555) 678-9012",
        segment: "new",
        status: "active",
        totalOrders: 3,
        totalSpend: 420,
        avgOrderValue: 140,
        lastOrderDate: "2026-04-03",
        joinedDate: "2026-02-28",
        location: "Phoenix, US",
    },
    {
        id: "CUS-0007",
        name: "Noah Martinez",
        initials: "NM",
        email: "noah.martinez@example.com",
        phone: "+1 (555) 789-0123",
        segment: "regular",
        status: "active",
        totalOrders: 22,
        totalSpend: 5860,
        avgOrderValue: 267,
        lastOrderDate: "2026-04-02",
        joinedDate: "2023-04-11",
        location: "Philadelphia, US",
    },
    {
        id: "CUS-0008",
        name: "Ava Thompson",
        initials: "AT",
        email: "ava.thompson@example.com",
        phone: "+1 (555) 890-1234",
        segment: "vip",
        status: "active",
        totalOrders: 54,
        totalSpend: 15200,
        avgOrderValue: 281,
        lastOrderDate: "2026-04-02",
        joinedDate: "2021-09-04",
        location: "San Antonio, US",
    },
    {
        id: "CUS-0009",
        name: "Liam Anderson",
        initials: "LA",
        email: "liam.anderson@example.com",
        phone: "+1 (555) 901-2345",
        segment: "at_risk",
        status: "inactive",
        totalOrders: 8,
        totalSpend: 1340,
        avgOrderValue: 168,
        lastOrderDate: "2025-12-20",
        joinedDate: "2023-06-19",
        location: "San Diego, US",
    },
    {
        id: "CUS-0010",
        name: "Sophia Garcia",
        initials: "SG",
        email: "sophia.garcia@example.com",
        phone: "+1 (555) 012-3456",
        segment: "new",
        status: "active",
        totalOrders: 2,
        totalSpend: 310,
        avgOrderValue: 155,
        lastOrderDate: "2026-04-01",
        joinedDate: "2026-03-15",
        location: "Dallas, US",
    },
    {
        id: "CUS-0011",
        name: "Ethan Jackson",
        initials: "EJ",
        email: "ethan.jackson@example.com",
        phone: "+1 (555) 123-4567",
        segment: "regular",
        status: "active",
        totalOrders: 17,
        totalSpend: 2960,
        avgOrderValue: 174,
        lastOrderDate: "2026-03-28",
        joinedDate: "2023-02-25",
        location: "Jacksonville, US",
    },
    {
        id: "CUS-0012",
        name: "Isabella White",
        initials: "IW",
        email: "isabella.white@example.com",
        phone: "+1 (555) 234-5678",
        segment: "blocked",
        status: "blocked",
        totalOrders: 5,
        totalSpend: 780,
        avgOrderValue: 156,
        lastOrderDate: "2025-10-14",
        joinedDate: "2023-08-07",
        location: "Columbus, US",
    },
];

// ─── Top Customers ────────────────────────────────────────────────────────────

export const topCustomersData: TopCustomer[] = [
    {
        id: "CUS-0008",
        name: "Ava Thompson",
        initials: "AT",
        email: "ava.thompson@example.com",
        totalSpend: 15200,
        totalOrders: 54,
        segment: "vip",
        trend: 18.4,
    },
    {
        id: "CUS-0001",
        name: "Alex Johnson",
        initials: "AJ",
        email: "alex.johnson@example.com",
        totalSpend: 12840,
        totalOrders: 47,
        segment: "vip",
        trend: 11.2,
    },
    {
        id: "CUS-0002",
        name: "Sarah Williams",
        initials: "SW",
        email: "sarah.williams@example.com",
        totalSpend: 9640,
        totalOrders: 38,
        segment: "vip",
        trend: 7.8,
    },
    {
        id: "CUS-0007",
        name: "Noah Martinez",
        initials: "NM",
        email: "noah.martinez@example.com",
        totalSpend: 5860,
        totalOrders: 22,
        segment: "regular",
        trend: 5.3,
    },
    {
        id: "CUS-0003",
        name: "Michael Chen",
        initials: "MC",
        email: "michael.chen@example.com",
        totalSpend: 4320,
        totalOrders: 24,
        segment: "regular",
        trend: -2.1,
    },
    {
        id: "CUS-0004",
        name: "Emma Davis",
        initials: "ED",
        email: "emma.davis@example.com",
        totalSpend: 3140,
        totalOrders: 19,
        segment: "regular",
        trend: 3.6,
    },
];

// ─── Customer Detail Types ────────────────────────────────────────────────────

export type CustomerOrderStatus =
    | "delivered"
    | "pending"
    | "processing"
    | "cancelled"
    | "shipped";

export interface CustomerOrder {
    id: string;
    product: string;
    category: string;
    amount: number;
    status: CustomerOrderStatus;
    date: string;
    items: number;
}

export interface CustomerMonthlySpend {
    month: string;
    spend: number;
}

export interface CustomerDetailData {
    monthlySpend: CustomerMonthlySpend[];
    recentOrders: CustomerOrder[];
    notes?: string;
}

// ─── Customer Details Map ────────────────────────────────────────────────────

export const customerDetailsMap: Record<string, CustomerDetailData> = {
    "CUS-0001": {
        monthlySpend: [
            { month: "Jan", spend: 820 },
            { month: "Feb", spend: 1200 },
            { month: "Mar", spend: 940 },
            { month: "Apr", spend: 1580 },
            { month: "May", spend: 2100 },
            { month: "Jun", spend: 1760 },
            { month: "Jul", spend: 1340 },
            { month: "Aug", spend: 890 },
            { month: "Sep", spend: 620 },
            { month: "Oct", spend: 740 },
            { month: "Nov", spend: 560 },
            { month: "Dec", spend: 290 },
        ],
        recentOrders: [
            { id: "ORD-7842", product: 'MacBook Pro 14"', category: "Electronics", amount: 1899, status: "delivered", date: "2026-04-05", items: 1 },
            { id: "ORD-7610", product: "iPad Pro 12.9", category: "Electronics", amount: 1099, status: "shipped", date: "2026-03-18", items: 1 },
            { id: "ORD-7402", product: "AirPods Pro", category: "Electronics", amount: 249, status: "delivered", date: "2026-02-24", items: 1 },
            { id: "ORD-7284", product: "Apple Watch Series 9", category: "Electronics", amount: 399, status: "delivered", date: "2026-02-01", items: 1 },
            { id: "ORD-7100", product: "Logitech MX Keys", category: "Electronics", amount: 119, status: "delivered", date: "2026-01-15", items: 2 },
        ],
    },
    "CUS-0002": {
        monthlySpend: [
            { month: "Jan", spend: 540 },
            { month: "Feb", spend: 720 },
            { month: "Mar", spend: 890 },
            { month: "Apr", spend: 1100 },
            { month: "May", spend: 980 },
            { month: "Jun", spend: 1340 },
            { month: "Jul", spend: 760 },
            { month: "Aug", spend: 640 },
            { month: "Sep", spend: 820 },
            { month: "Oct", spend: 560 },
            { month: "Nov", spend: 930 },
            { month: "Dec", spend: 1310 },
        ],
        recentOrders: [
            { id: "ORD-7841", product: "Nike Air Max 270", category: "Sports", amount: 149, status: "shipped", date: "2026-04-05", items: 2 },
            { id: "ORD-7630", product: "Lululemon Leggings", category: "Clothing", amount: 128, status: "delivered", date: "2026-03-22", items: 1 },
            { id: "ORD-7510", product: "Fitbit Charge 6", category: "Electronics", amount: 159, status: "delivered", date: "2026-03-05", items: 1 },
            { id: "ORD-7380", product: "Yoga Mat Pro", category: "Sports", amount: 89, status: "delivered", date: "2026-02-11", items: 1 },
            { id: "ORD-7210", product: "Adidas Hoodie", category: "Clothing", amount: 75, status: "cancelled", date: "2026-01-28", items: 2 },
        ],
    },
    "CUS-0003": {
        monthlySpend: [
            { month: "Jan", spend: 280 },
            { month: "Feb", spend: 420 },
            { month: "Mar", spend: 350 },
            { month: "Apr", spend: 610 },
            { month: "May", spend: 480 },
            { month: "Jun", spend: 390 },
            { month: "Jul", spend: 510 },
            { month: "Aug", spend: 340 },
            { month: "Sep", spend: 290 },
            { month: "Oct", spend: 220 },
            { month: "Nov", spend: 180 },
            { month: "Dec", spend: 250 },
        ],
        recentOrders: [
            { id: "ORD-7840", product: "Sony WH-1000XM5", category: "Electronics", amount: 349, status: "processing", date: "2026-04-04", items: 1 },
            { id: "ORD-7620", product: "Samsung T7 SSD", category: "Electronics", amount: 89, status: "delivered", date: "2026-03-19", items: 2 },
            { id: "ORD-7420", product: "USB-C Hub 7-in-1", category: "Electronics", amount: 49, status: "delivered", date: "2026-02-28", items: 1 },
            { id: "ORD-7280", product: "Desk Cable Organiser", category: "Home & Garden", amount: 32, status: "delivered", date: "2026-02-10", items: 3 },
            { id: "ORD-7110", product: "Mechanical Keyboard", category: "Electronics", amount: 139, status: "delivered", date: "2026-01-20", items: 1 },
        ],
    },
    "CUS-0004": {
        monthlySpend: [
            { month: "Jan", spend: 165 },
            { month: "Feb", spend: 290 },
            { month: "Mar", spend: 210 },
            { month: "Apr", spend: 340 },
            { month: "May", spend: 420 },
            { month: "Jun", spend: 280 },
            { month: "Jul", spend: 190 },
            { month: "Aug", spend: 360 },
            { month: "Sep", spend: 240 },
            { month: "Oct", spend: 310 },
            { month: "Nov", spend: 180 },
            { month: "Dec", spend: 150 },
        ],
        recentOrders: [
            { id: "ORD-7839", product: "Levi's 501 Jeans", category: "Clothing", amount: 89, status: "pending", date: "2026-04-04", items: 3 },
            { id: "ORD-7650", product: "Zara Blazer", category: "Clothing", amount: 129, status: "delivered", date: "2026-03-24", items: 1 },
            { id: "ORD-7480", product: "H&M Basic Tees x3", category: "Clothing", amount: 54, status: "delivered", date: "2026-03-08", items: 3 },
            { id: "ORD-7290", product: "Scented Candle Set", category: "Home & Garden", amount: 45, status: "delivered", date: "2026-02-14", items: 2 },
            { id: "ORD-7140", product: "Charlotte Tilbury Kit", category: "Beauty", amount: 98, status: "delivered", date: "2026-01-22", items: 1 },
        ],
    },
    "CUS-0005": {
        monthlySpend: [
            { month: "Jan", spend: 172 },
            { month: "Feb", spend: 0 },
            { month: "Mar", spend: 0 },
            { month: "Apr", spend: 344 },
            { month: "May", spend: 0 },
            { month: "Jun", spend: 510 },
            { month: "Jul", spend: 0 },
            { month: "Aug", spend: 172 },
            { month: "Sep", spend: 344 },
            { month: "Oct", spend: 0 },
            { month: "Nov", spend: 148 },
            { month: "Dec", spend: 200 },
        ],
        recentOrders: [
            { id: "ORD-6910", product: "Garden Tool Set", category: "Home & Garden", amount: 229, status: "delivered", date: "2026-01-12", items: 1 },
            { id: "ORD-6720", product: "Pressure Washer", category: "Home & Garden", amount: 189, status: "delivered", date: "2025-11-05", items: 1 },
            { id: "ORD-6540", product: "BBQ Grill Cover", category: "Home & Garden", amount: 59, status: "cancelled", date: "2025-09-18", items: 1 },
            { id: "ORD-6380", product: "Lawn Mower Blade", category: "Home & Garden", amount: 34, status: "delivered", date: "2025-08-07", items: 2 },
        ],
    },
    "CUS-0006": {
        monthlySpend: [
            { month: "Jan", spend: 0 },
            { month: "Feb", spend: 0 },
            { month: "Mar", spend: 140 },
            { month: "Apr", spend: 280 },
            { month: "May", spend: 0 },
            { month: "Jun", spend: 0 },
            { month: "Jul", spend: 0 },
            { month: "Aug", spend: 0 },
            { month: "Sep", spend: 0 },
            { month: "Oct", spend: 0 },
            { month: "Nov", spend: 0 },
            { month: "Dec", spend: 0 },
        ],
        recentOrders: [
            { id: "ORD-7837", product: "Fenty Beauty Foundation", category: "Beauty", amount: 42, status: "delivered", date: "2026-04-03", items: 1 },
            { id: "ORD-7800", product: "Perfume Gift Set", category: "Beauty", amount: 98, status: "processing", date: "2026-03-28", items: 1 },
            { id: "ORD-7760", product: "Nail Care Kit", category: "Beauty", amount: 24, status: "delivered", date: "2026-03-15", items: 2 },
        ],
    },
    "CUS-0007": {
        monthlySpend: [
            { month: "Jan", spend: 534 },
            { month: "Feb", spend: 801 },
            { month: "Mar", spend: 267 },
            { month: "Apr", spend: 1068 },
            { month: "May", spend: 668 },
            { month: "Jun", spend: 401 },
            { month: "Jul", spend: 534 },
            { month: "Aug", spend: 267 },
            { month: "Sep", spend: 668 },
            { month: "Oct", spend: 401 },
            { month: "Nov", spend: 801 },
            { month: "Dec", spend: 450 },
        ],
        recentOrders: [
            { id: "ORD-7836", product: 'Samsung 65" QLED', category: "Electronics", amount: 1299, status: "shipped", date: "2026-04-02", items: 1 },
            { id: "ORD-7600", product: "Smart Home Hub", category: "Electronics", amount: 149, status: "delivered", date: "2026-03-15", items: 1 },
            { id: "ORD-7410", product: "Ring Doorbell Pro", category: "Electronics", amount: 249, status: "delivered", date: "2026-02-26", items: 1 },
            { id: "ORD-7260", product: "Philips Hue Starter", category: "Electronics", amount: 179, status: "delivered", date: "2026-02-05", items: 1 },
            { id: "ORD-7120", product: "Echo Dot (5th Gen)", category: "Electronics", amount: 49, status: "delivered", date: "2026-01-18", items: 2 },
        ],
    },
    "CUS-0008": {
        monthlySpend: [
            { month: "Jan", spend: 1124 },
            { month: "Feb", spend: 1405 },
            { month: "Mar", spend: 843 },
            { month: "Apr", spend: 1686 },
            { month: "May", spend: 2247 },
            { month: "Jun", spend: 1968 },
            { month: "Jul", spend: 1124 },
            { month: "Aug", spend: 843 },
            { month: "Sep", spend: 1405 },
            { month: "Oct", spend: 562 },
            { month: "Nov", spend: 1686 },
            { month: "Dec", spend: 307 },
        ],
        recentOrders: [
            { id: "ORD-7835", product: "Charlotte Tilbury Kit", category: "Beauty", amount: 128, status: "delivered", date: "2026-04-02", items: 4 },
            { id: "ORD-7640", product: "Dyson Airwrap", category: "Beauty", amount: 599, status: "delivered", date: "2026-03-21", items: 1 },
            { id: "ORD-7460", product: "La Mer Moisturiser", category: "Beauty", amount: 320, status: "delivered", date: "2026-03-07", items: 1 },
            { id: "ORD-7300", product: "YSL Touche Éclat", category: "Beauty", amount: 54, status: "delivered", date: "2026-02-18", items: 2 },
            { id: "ORD-7160", product: "Dior Lip Glow", category: "Beauty", amount: 38, status: "shipped", date: "2026-01-29", items: 3 },
        ],
    },
    "CUS-0009": {
        monthlySpend: [
            { month: "Jan", spend: 168 },
            { month: "Feb", spend: 0 },
            { month: "Mar", spend: 336 },
            { month: "Apr", spend: 0 },
            { month: "May", spend: 168 },
            { month: "Jun", spend: 0 },
            { month: "Jul", spend: 504 },
            { month: "Aug", spend: 168 },
            { month: "Sep", spend: 0 },
            { month: "Oct", spend: 0 },
            { month: "Nov", spend: 0 },
            { month: "Dec", spend: 0 },
        ],
        recentOrders: [
            { id: "ORD-6850", product: "Camping Tent 4P", category: "Sports", amount: 239, status: "delivered", date: "2025-12-20", items: 1 },
            { id: "ORD-6680", product: "Hiking Backpack", category: "Sports", amount: 158, status: "delivered", date: "2025-10-12", items: 1 },
            { id: "ORD-6490", product: "Thermal Water Bottle", category: "Sports", amount: 34, status: "cancelled", date: "2025-08-30", items: 2 },
        ],
    },
    "CUS-0010": {
        monthlySpend: [
            { month: "Jan", spend: 0 },
            { month: "Feb", spend: 0 },
            { month: "Mar", spend: 155 },
            { month: "Apr", spend: 155 },
            { month: "May", spend: 0 },
            { month: "Jun", spend: 0 },
            { month: "Jul", spend: 0 },
            { month: "Aug", spend: 0 },
            { month: "Sep", spend: 0 },
            { month: "Oct", spend: 0 },
            { month: "Nov", spend: 0 },
            { month: "Dec", spend: 0 },
        ],
        recentOrders: [
            { id: "ORD-7820", product: "Instant Pot Duo 7-in-1", category: "Home & Garden", amount: 99, status: "delivered", date: "2026-04-01", items: 1 },
            { id: "ORD-7790", product: "Bed Linen Set", category: "Home & Garden", amount: 79, status: "processing", date: "2026-03-25", items: 1 },
            { id: "ORD-7740", product: "Air Fryer 5.8QT", category: "Home & Garden", amount: 72, status: "pending", date: "2026-03-20", items: 1 },
        ],
    },
    "CUS-0011": {
        monthlySpend: [
            { month: "Jan", spend: 174 },
            { month: "Feb", spend: 348 },
            { month: "Mar", spend: 174 },
            { month: "Apr", spend: 522 },
            { month: "May", spend: 348 },
            { month: "Jun", spend: 174 },
            { month: "Jul", spend: 348 },
            { month: "Aug", spend: 174 },
            { month: "Sep", spend: 0 },
            { month: "Oct", spend: 174 },
            { month: "Nov", spend: 348 },
            { month: "Dec", spend: 176 },
        ],
        recentOrders: [
            { id: "ORD-7780", product: "Novel: The Midnight Library", category: "Books", amount: 14, status: "delivered", date: "2026-03-28", items: 2 },
            { id: "ORD-7590", product: "Kindle Paperwhite", category: "Electronics", amount: 139, status: "delivered", date: "2026-03-10", items: 1 },
            { id: "ORD-7390", product: "Book Collection x5", category: "Books", amount: 62, status: "delivered", date: "2026-02-22", items: 5 },
            { id: "ORD-7220", product: "Reading Lamp", category: "Home & Garden", amount: 48, status: "delivered", date: "2026-02-02", items: 1 },
            { id: "ORD-7090", product: "Bookmark Set", category: "Books", amount: 18, status: "delivered", date: "2026-01-10", items: 3 },
        ],
    },
    "CUS-0012": {
        monthlySpend: [
            { month: "Jan", spend: 156 },
            { month: "Feb", spend: 156 },
            { month: "Mar", spend: 0 },
            { month: "Apr", spend: 312 },
            { month: "May", spend: 0 },
            { month: "Jun", spend: 0 },
            { month: "Jul", spend: 0 },
            { month: "Aug", spend: 0 },
            { month: "Sep", spend: 0 },
            { month: "Oct", spend: 0 },
            { month: "Nov", spend: 0 },
            { month: "Dec", spend: 0 },
        ],
        recentOrders: [
            { id: "ORD-6420", product: "Wireless Charger", category: "Electronics", amount: 29, status: "delivered", date: "2025-10-14", items: 1 },
            { id: "ORD-6290", product: "Phone Case Bundle", category: "Electronics", amount: 45, status: "delivered", date: "2025-09-02", items: 3 },
            { id: "ORD-6150", product: "Screen Protector x2", category: "Electronics", amount: 18, status: "cancelled", date: "2025-07-19", items: 2 },
        ],
    },
};
