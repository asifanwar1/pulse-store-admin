import { Clock } from "lucide-react";
import { recentOrdersData, type OrderStatus } from "@/mock/dashboard.mock";
import ChartCard from "./ChartCard";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<
    OrderStatus,
    { label: string; textColor: string; bgColor: string }
> = {
    delivered: {
        label: "Delivered",
        textColor: "text-status-delivered",
        bgColor: "bg-status-delivered-bg",
    },
    shipped: {
        label: "Shipped",
        textColor: "text-status-shipped",
        bgColor: "bg-status-shipped-bg",
    },
    processing: {
        label: "Processing",
        textColor: "text-status-processing",
        bgColor: "bg-status-processing-bg",
    },
    pending: {
        label: "Pending",
        textColor: "text-status-pending",
        bgColor: "bg-status-pending-bg",
    },
    cancelled: {
        label: "Cancelled",
        textColor: "text-status-cancelled",
        bgColor: "bg-status-cancelled-bg",
    },
};

const AVATAR_COLORS = [
    "bg-dash-blue-light text-dash-blue",
    "bg-dash-purple-light text-dash-purple",
    "bg-pulse-green-light text-pulse-green",
    "bg-dash-amber-light text-dash-amber",
    "bg-dash-pink-light text-dash-pink",
    "bg-dash-teal-light text-dash-teal",
    "bg-dash-indigo-light text-dash-indigo",
    "bg-dash-orange-light text-dash-orange",
];

export default function RecentOrders() {
    return (
        <ChartCard
            title="Recent Orders"
            subtitle="Latest customer orders across all categories"
            bodyClassName="p-0"
        >
            {/* Table wrapper – horizontal scroll on small screens */}
            <div className="overflow-x-auto">
                <table className="w-full text-xs">
                    <thead>
                        <tr className="border-b border-dash-card-border bg-dash-surface">
                            <th className="text-left px-5 py-3 font-semibold text-table-text-header whitespace-nowrap">
                                Order
                            </th>
                            <th className="text-left px-4 py-3 font-semibold text-table-text-header whitespace-nowrap">
                                Customer
                            </th>
                            <th className="text-left px-4 py-3 font-semibold text-table-text-header whitespace-nowrap hidden sm:table-cell">
                                Product
                            </th>
                            <th className="text-left px-4 py-3 font-semibold text-table-text-header whitespace-nowrap hidden md:table-cell">
                                Category
                            </th>
                            <th className="text-right px-4 py-3 font-semibold text-table-text-header whitespace-nowrap">
                                Amount
                            </th>
                            <th className="text-center px-4 py-3 font-semibold text-table-text-header whitespace-nowrap">
                                Status
                            </th>
                            <th className="text-right px-5 py-3 font-semibold text-table-text-header whitespace-nowrap hidden lg:table-cell">
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-dash-card-border">
                        {recentOrdersData.map((order, idx) => {
                            const status = STATUS_CONFIG[order.status];
                            const avatarColor = AVATAR_COLORS[idx % AVATAR_COLORS.length];
                            return (
                                <tr
                                    key={order.id}
                                    className="hover:bg-dash-surface transition-colors"
                                >
                                    <td className="px-5 py-3.5 font-semibold text-app-primary whitespace-nowrap">
                                        {order.id}
                                    </td>
                                    <td className="px-4 py-3.5">
                                        <div className="flex items-center gap-2.5 whitespace-nowrap">
                                            <div
                                                className={cn(
                                                    "w-7 h-7 rounded-full flex items-center justify-center text-xss font-bold shrink-0",
                                                    avatarColor,
                                                )}
                                            >
                                                {order.initials}
                                            </div>
                                            <span className="font-medium text-app-primary">
                                                {order.customer}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3.5 text-app-secondary hidden sm:table-cell max-w-[160px] truncate">
                                        {order.product}
                                    </td>
                                    <td className="px-4 py-3.5 text-app-secondary hidden md:table-cell whitespace-nowrap">
                                        {order.category}
                                    </td>
                                    <td className="px-4 py-3.5 text-right font-semibold text-app-primary whitespace-nowrap">
                                        ${order.amount.toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3.5 text-center">
                                        <span
                                            className={cn(
                                                "inline-flex items-center rounded-full px-2.5 py-0.5 font-semibold whitespace-nowrap",
                                                status.textColor,
                                                status.bgColor,
                                            )}
                                        >
                                            {status.label}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5 text-right text-muted hidden lg:table-cell whitespace-nowrap">
                                        <div className="flex items-center justify-end gap-1">
                                            <Clock className="w-3 h-3" />
                                            {order.date}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </ChartCard>
    );
}
