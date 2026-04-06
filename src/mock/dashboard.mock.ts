// ─── Types ────────────────────────────────────────────────────────────────────

export interface MonthlyRevenueData {
    month: string;
    revenue: number;
    expenses: number;
    profit: number;
}

export interface CategoryOrderData {
    category: string;
    orders: number;
    revenue: number;
    color: string;
}

export interface SalesDistributionData {
    name: string;
    value: number;
    color: string;
}

export interface CustomerGrowthData {
    month: string;
    newCustomers: number;
    returningCustomers: number;
}

export type OrderStatus =
    | "delivered"
    | "pending"
    | "processing"
    | "cancelled"
    | "shipped";

export interface RecentOrder {
    id: string;
    customer: string;
    initials: string;
    product: string;
    category: string;
    amount: number;
    status: OrderStatus;
    date: string;
    items: number;
}

export interface TopProduct {
    id: string;
    name: string;
    category: string;
    sales: number;
    revenue: number;
    stock: number;
    initials: string;
    trend: number;
}

export interface LowStockProduct {
    id: string;
    name: string;
    category: string;
    stock: number;
    threshold: number;
}

export interface StatItem {
    value: number;
    trend: number;
    trendDirection: "up" | "down";
    prefix?: string;
    suffix?: string;
}

export interface DashboardStats {
    totalRevenue: StatItem;
    totalOrders: StatItem;
    totalCustomers: StatItem;
    totalProducts: StatItem;
    avgOrderValue: StatItem;
    conversionRate: StatItem;
}

export interface WeeklySaleData {
    day: string;
    sales: number;
    orders: number;
}

// ─── Monthly Revenue ──────────────────────────────────────────────────────────

export const monthlyRevenueData: MonthlyRevenueData[] = [
    { month: "Jan", revenue: 45200, expenses: 28000, profit: 17200 },
    { month: "Feb", revenue: 52800, expenses: 31000, profit: 21800 },
    { month: "Mar", revenue: 48600, expenses: 29500, profit: 19100 },
    { month: "Apr", revenue: 61400, expenses: 35000, profit: 26400 },
    { month: "May", revenue: 73200, expenses: 41000, profit: 32200 },
    { month: "Jun", revenue: 68900, expenses: 38500, profit: 30400 },
    { month: "Jul", revenue: 79500, expenses: 44000, profit: 35500 },
    { month: "Aug", revenue: 85300, expenses: 47000, profit: 38300 },
    { month: "Sep", revenue: 77100, expenses: 43000, profit: 34100 },
    { month: "Oct", revenue: 91800, expenses: 51000, profit: 40800 },
    { month: "Nov", revenue: 108500, expenses: 59000, profit: 49500 },
    { month: "Dec", revenue: 124700, expenses: 68000, profit: 56700 },
];

// ─── Orders by Category ───────────────────────────────────────────────────────

export const ordersByCategoryData: CategoryOrderData[] = [
    { category: "Electronics", orders: 842, revenue: 125400, color: "#3B82F6" },
    { category: "Clothing", orders: 637, revenue: 48200, color: "#8B5CF6" },
    {
        category: "Home & Garden",
        orders: 428,
        revenue: 38700,
        color: "#2A5C42",
    },
    { category: "Sports", orders: 315, revenue: 29800, color: "#F59E0B" },
    { category: "Beauty", orders: 284, revenue: 22100, color: "#EC4899" },
    { category: "Books", orders: 196, revenue: 8400, color: "#14B8A6" },
    { category: "Toys", orders: 171, revenue: 14600, color: "#F97316" },
    { category: "Automotive", orders: 124, revenue: 31200, color: "#6366F1" },
];

// ─── Sales Distribution (Pie Chart) ──────────────────────────────────────────

export const salesDistributionData: SalesDistributionData[] = [
    { name: "Electronics", value: 35, color: "#3B82F6" },
    { name: "Clothing", value: 22, color: "#8B5CF6" },
    { name: "Home & Garden", value: 15, color: "#2A5C42" },
    { name: "Sports", value: 12, color: "#F59E0B" },
    { name: "Beauty", value: 8, color: "#EC4899" },
    { name: "Others", value: 8, color: "#9DA5B4" },
];

// ─── Customer Growth ──────────────────────────────────────────────────────────

export const customerGrowthData: CustomerGrowthData[] = [
    { month: "Jan", newCustomers: 120, returningCustomers: 340 },
    { month: "Feb", newCustomers: 145, returningCustomers: 380 },
    { month: "Mar", newCustomers: 132, returningCustomers: 362 },
    { month: "Apr", newCustomers: 168, returningCustomers: 410 },
    { month: "May", newCustomers: 195, returningCustomers: 452 },
    { month: "Jun", newCustomers: 178, returningCustomers: 435 },
    { month: "Jul", newCustomers: 212, returningCustomers: 480 },
    { month: "Aug", newCustomers: 248, returningCustomers: 518 },
    { month: "Sep", newCustomers: 225, returningCustomers: 495 },
    { month: "Oct", newCustomers: 267, returningCustomers: 540 },
    { month: "Nov", newCustomers: 312, returningCustomers: 588 },
    { month: "Dec", newCustomers: 358, returningCustomers: 632 },
];

// ─── Recent Orders ────────────────────────────────────────────────────────────

export const recentOrdersData: RecentOrder[] = [
    {
        id: "ORD-7842",
        customer: "Alex Johnson",
        initials: "AJ",
        product: 'MacBook Pro 14"',
        category: "Electronics",
        amount: 1899,
        status: "delivered",
        date: "2026-04-05",
        items: 1,
    },
    {
        id: "ORD-7841",
        customer: "Sarah Williams",
        initials: "SW",
        product: "Nike Air Max 270",
        category: "Sports",
        amount: 149,
        status: "shipped",
        date: "2026-04-05",
        items: 2,
    },
    {
        id: "ORD-7840",
        customer: "Michael Chen",
        initials: "MC",
        product: "Sony WH-1000XM5",
        category: "Electronics",
        amount: 349,
        status: "processing",
        date: "2026-04-04",
        items: 1,
    },
    {
        id: "ORD-7839",
        customer: "Emma Davis",
        initials: "ED",
        product: "Levi's 501 Jeans",
        category: "Clothing",
        amount: 89,
        status: "pending",
        date: "2026-04-04",
        items: 3,
    },
    {
        id: "ORD-7838",
        customer: "James Wilson",
        initials: "JW",
        product: "Garden Tool Set",
        category: "Home & Garden",
        amount: 229,
        status: "delivered",
        date: "2026-04-03",
        items: 1,
    },
    {
        id: "ORD-7837",
        customer: "Olivia Brown",
        initials: "OB",
        product: "Dyson V11 Vacuum",
        category: "Home & Garden",
        amount: 599,
        status: "cancelled",
        date: "2026-04-03",
        items: 1,
    },
    {
        id: "ORD-7836",
        customer: "Noah Martinez",
        initials: "NM",
        product: 'Samsung 65" QLED',
        category: "Electronics",
        amount: 1299,
        status: "shipped",
        date: "2026-04-02",
        items: 1,
    },
    {
        id: "ORD-7835",
        customer: "Ava Thompson",
        initials: "AT",
        product: "Charlotte Tilbury Kit",
        category: "Beauty",
        amount: 128,
        status: "delivered",
        date: "2026-04-02",
        items: 4,
    },
];

// ─── Top Products ─────────────────────────────────────────────────────────────

export const topProductsData: TopProduct[] = [
    {
        id: "PRD-001",
        name: 'MacBook Pro 14"',
        category: "Electronics",
        sales: 184,
        revenue: 348316,
        stock: 42,
        initials: "MB",
        trend: 12.5,
    },
    {
        id: "PRD-002",
        name: "Sony WH-1000XM5",
        category: "Electronics",
        sales: 312,
        revenue: 108888,
        stock: 87,
        initials: "SW",
        trend: 8.3,
    },
    {
        id: "PRD-003",
        name: 'Samsung 65" QLED',
        category: "Electronics",
        sales: 98,
        revenue: 127302,
        stock: 23,
        initials: "SQ",
        trend: 5.7,
    },
    {
        id: "PRD-004",
        name: "Nike Air Max 270",
        category: "Sports",
        sales: 428,
        revenue: 63772,
        stock: 156,
        initials: "NA",
        trend: 15.2,
    },
    {
        id: "PRD-005",
        name: "Dyson V11 Vacuum",
        category: "Home & Garden",
        sales: 156,
        revenue: 93444,
        stock: 34,
        initials: "DV",
        trend: -3.1,
    },
    {
        id: "PRD-006",
        name: "Charlotte Tilbury Kit",
        category: "Beauty",
        sales: 267,
        revenue: 34236,
        stock: 89,
        initials: "CT",
        trend: 22.4,
    },
];

// ─── Low Stock Products ───────────────────────────────────────────────────────

export const lowStockData: LowStockProduct[] = [
    {
        id: "PRD-042",
        name: "iPhone 16 Pro Max",
        category: "Electronics",
        stock: 3,
        threshold: 10,
    },
    {
        id: "PRD-087",
        name: "PS5 Console",
        category: "Electronics",
        stock: 5,
        threshold: 15,
    },
    {
        id: "PRD-023",
        name: 'Samsung 65" QLED',
        category: "Electronics",
        stock: 23,
        threshold: 30,
    },
    {
        id: "PRD-114",
        name: "Dyson V11 Vacuum",
        category: "Home & Garden",
        stock: 34,
        threshold: 40,
    },
    {
        id: "PRD-201",
        name: "Yoga Mat Pro",
        category: "Sports",
        stock: 8,
        threshold: 20,
    },
];

// ─── Dashboard Stats ──────────────────────────────────────────────────────────

export const dashboardStatsData: DashboardStats = {
    totalRevenue: {
        value: 917400,
        trend: 12.5,
        trendDirection: "up",
        prefix: "$",
    },
    totalOrders: { value: 3841, trend: 8.2, trendDirection: "up" },
    totalCustomers: { value: 12483, trend: 5.1, trendDirection: "up" },
    totalProducts: { value: 1247, trend: 3.4, trendDirection: "up" },
    avgOrderValue: {
        value: 238,
        trend: 4.2,
        trendDirection: "up",
        prefix: "$",
    },
    conversionRate: {
        value: 3.6,
        trend: -0.8,
        trendDirection: "down",
        suffix: "%",
    },
};

// ─── Weekly Sales ─────────────────────────────────────────────────────────────

export const weeklySalesData: WeeklySaleData[] = [
    { day: "Mon", sales: 4200, orders: 38 },
    { day: "Tue", sales: 5800, orders: 52 },
    { day: "Wed", sales: 4900, orders: 44 },
    { day: "Thu", sales: 7200, orders: 65 },
    { day: "Fri", sales: 8900, orders: 81 },
    { day: "Sat", sales: 11200, orders: 98 },
    { day: "Sun", sales: 6800, orders: 61 },
];
