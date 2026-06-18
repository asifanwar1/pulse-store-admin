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
    color: string;
}

export interface OrdersByCategoryResponse {
    year?: number;
    data: OrdersByCategoryItem[];
}

export interface DistributionItem {
    category: string;
    revenue: number;
    color: string;
    percentage?: string;
}

export interface SalesDistributionResponse {
    year?: number;
    data: DistributionItem[];
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
    day: string; // ISO date
    order: number;
    revenue: string;
}

export interface WeeklySalesResponse {
    startDate: string;
    endDate: string;
    data: WeeklySalesPoint[];
    total: number;
}

export interface TopProductItem {
    category: string;
    change_percentage: string;
    name: string;
    product_id: number;
    rank?: number;
    revenue: string;
    sales: number;
    sku?: string;
    stock: number;
}

export interface TopProductsResponse {
    data: TopProductItem[];
    count: number;
}

export interface LowStockProduct {
    category: string;
    name: string;
    product_id: number;
    reorderThreshold: number;
    severity: string;
    sku: string;
    stock: number;
    stockPercentage: string;
}

export interface LowStockAlertsResponse {
    data: LowStockProduct[];
    count?: number;
}

export type TDashboardAnalyticsMetric = {
    value: number;
    change_percentage: string;
};

export type TDashboardAnalyticsResponse = {
    totalRevenue: TDashboardAnalyticsMetric;
    totalOrders: TDashboardAnalyticsMetric;
    totalCustomers: TDashboardAnalyticsMetric;
    totalProducts: TDashboardAnalyticsMetric;
    avgOrderValue: TDashboardAnalyticsMetric;
    conversionRate: TDashboardAnalyticsMetric;
};
