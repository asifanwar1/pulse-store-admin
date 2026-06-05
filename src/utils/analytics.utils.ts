import type { TProductAnalyticsMetric } from "@/api/services/products/products.response";

export const mapAnalyticsMetricToStat = (metric?: TProductAnalyticsMetric) => {
    const raw = metric?.change_percentage ?? "0";
    const parsed = parseFloat(String(raw).replace("%", ""));

    const trendingValue = Number.isFinite(parsed) ? Math.abs(parsed) : 0;
    const trendDirection: "up" | "down" = parsed >= 0 ? "up" : "down";

    return {
        value: metric?.value ?? 0,
        trend: trendingValue,
        trendDirection,
        prefix: "",
        suffix: "",
    };
};
