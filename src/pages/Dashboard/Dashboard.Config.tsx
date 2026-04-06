import {
    DollarSign,
    ShoppingCart,
    Users,
    Package,
    CreditCard,
    TrendingUp,
} from "lucide-react";

export const STAT_CONFIG = [
    {
        key: "totalRevenue" as const,
        title: "Total Revenue",
        icon: <DollarSign className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "All-time gross revenue",
    },
    {
        key: "totalOrders" as const,
        title: "Total Orders",
        icon: <ShoppingCart className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "Across all categories",
    },
    {
        key: "totalCustomers" as const,
        title: "Customers",
        icon: <Users className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "Registered accounts",
    },
    {
        key: "totalProducts" as const,
        title: "Products",
        icon: <Package className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "Active SKUs in store",
    },
    {
        key: "avgOrderValue" as const,
        title: "Avg. Order Value",
        icon: <CreditCard className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "Per transaction average",
    },
    {
        key: "conversionRate" as const,
        title: "Conversion Rate",
        icon: <TrendingUp className="w-5 h-5" />,
        iconBgClass: "bg-pulse-cream-dark",
        iconColorClass: "text-pulse-green",
        subtitle: "Visitor to customer ratio",
    },
] as const;
