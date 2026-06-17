export interface DashboardStatsResponse {
    totalOrders: number;
    totalRevenue: number;
    totalCustomers: number;
    totalProducts: number;
    lowStockAlerts: number;
    pendingOrders?: number;
    [k: string]: any;
}

export interface RevenueOverviewPoint {
    month: string;
    revenue: number;
}

export interface RevenueOverviewResponse {
    year?: number;
    data: RevenueOverviewPoint[];
    total: number;
}

export interface OrdersByCategoryItem {
    category: string;
    orders: number;
}

export interface OrdersByCategoryResponse {
    year?: number;
    categories: OrdersByCategoryItem[];
}

export interface DistributionItem {
    label: string;
    value: number;
}

export interface SalesDistributionResponse {
    year?: number;
    distribution: DistributionItem[];
}

export interface CustomerGrowthPoint {
    month: string;
    newCustomers: number;
}

export interface CustomerGrowthResponse {
    year?: number;
    data: CustomerGrowthPoint[];
}

export interface WeeklySalesPoint {
    date: string; // ISO date
    sales: number;
}

export interface WeeklySalesResponse {
    startDate: string;
    endDate: string;
    data: WeeklySalesPoint[];
    total: number;
}

export interface TopProductItem {
    id: string;
    name: string;
    sold: number;
    revenue?: number;
    [k: string]: any;
}

export interface TopProductsResponse {
    products: TopProductItem[];
}

export interface LowStockProduct {
    id: string;
    name: string;
    stock: number;
    reorderThreshold?: number;
}

export interface LowStockAlertsResponse {
    products: LowStockProduct[];
    totalLowStock?: number;
}
