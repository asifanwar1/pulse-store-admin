import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Tag,
    Barcode,
    DollarSign,
    Package,
    TrendingUp,
    Star,
    Calendar,
    Hash,
    Layers,
} from "lucide-react";

import { productsListData, productDetailsMap } from "@/mock/product.mock";
import ChartCard from "@/components/custom/CustomCards/ChartCard";
import { DataTable } from "@/components/custom/DataTable";
import { cn } from "@/lib/utils";
import { APP_ROUTES } from "@/routes/appRoutes";
import {
    productSalesTrendColumns,
    productReviewColumns,
} from "./ProductDetails.Config";
import { PRODUCT_STATUS_CONFIG } from "../ProductManagement.Config";
import type { TProductStatus } from "@/api/services/products/products.request.types";

const MOCK_STATUS_MAP: Record<string, TProductStatus> = {
    active: "ACTIVE",
    draft: "DRAFT",
    out_of_stock: "OUT_OF_STOCK",
};
import InfoCard from "@/components/custom/CustomCards/InfoCard";
import Button from "@/components/custom/CustomButton/CustomButton";
import StatChipCard from "@/components/custom/CustomCards/StatChipCard";

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const product = productsListData.find((p) => p.id === id);
    const details = id ? productDetailsMap[id] : undefined;

    if (!product || !details) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <p className="text-lg font-semibold text-pulse-green-dark">
                    Product not found
                </p>
                <button
                    onClick={() => navigate(APP_ROUTES.PRODUCTS)}
                    className="flex items-center gap-2 text-sm text-pulse-green hover:text-pulse-green-dark transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Products
                </button>
            </div>
        );
    }

    const statusBadge = PRODUCT_STATUS_CONFIG[MOCK_STATUS_MAP[product.status] ?? "DRAFT"];

    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 min-h-0">
            <div className="flex">
                <Button
                    onClick={() => navigate(APP_ROUTES.PRODUCTS)}
                    variant="ghost"
                    size="sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Products
                </Button>
            </div>

            <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-pulse-cream-dark text-pulse-green font-bold text-xl shrink-0">
                        {product.initials}
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-lg font-bold text-pulse-green-dark">
                                {product.name}
                            </h2>
                            <span
                                className={cn(
                                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                                    statusBadge.textColor,
                                    statusBadge.bgColor,
                                )}
                            >
                                {statusBadge.label}
                            </span>
                        </div>
                        <p className="text-sm text-app-secondary">
                            {product.brand}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-pulse-green">
                            <span className="flex items-center gap-1">
                                <Hash className="w-3 h-3" />
                                {product.id}
                            </span>
                            <span className="flex items-center gap-1">
                                <Barcode className="w-3 h-3" />
                                {product.sku}
                            </span>
                            <span className="flex items-center gap-1">
                                <Layers className="w-3 h-3" />
                                {product.category}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                Added {product.createdDate}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatChipCard
                    icon={<DollarSign className="w-4 h-4" />}
                    label="Price"
                    value={`$${product.price.toLocaleString()}`}
                />
                <StatChipCard
                    icon={<Package className="w-4 h-4" />}
                    label="In Stock"
                    value={product.stock.toLocaleString()}
                />
                <StatChipCard
                    icon={<TrendingUp className="w-4 h-4" />}
                    label="Total Sales"
                    value={product.sales.toLocaleString()}
                />
                <StatChipCard
                    icon={<Star className="w-4 h-4" />}
                    label="Rating"
                    value={
                        product.rating > 0
                            ? `${product.rating} / 5`
                            : "No ratings"
                    }
                />
            </div>

            <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-5 flex flex-col gap-4">
                <h3 className="text-sm font-semibold text-pulse-green-dark border-b border-pulse-cream-dark pb-3">
                    Product Information
                </h3>
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <InfoCard
                        icon={<DollarSign className="w-4 h-4" />}
                        label="Retail Price"
                        value={`$${product.price.toLocaleString()}`}
                    />
                    <InfoCard
                        icon={<DollarSign className="w-4 h-4" />}
                        label="Cost Price"
                        value={`$${product.costPrice.toLocaleString()}`}
                    />
                    <InfoCard
                        icon={<Layers className="w-4 h-4" />}
                        label="Category"
                        value={product.category}
                    />
                    <InfoCard
                        icon={<Tag className="w-4 h-4" />}
                        label="Brand"
                        value={product.brand}
                    />
                </div>
                {details.description && (
                    <div className="flex flex-col gap-1 pt-1 border-t border-pulse-cream-dark">
                        <span className="text-xs text-pulse-green font-medium">
                            Description
                        </span>
                        <p className="text-xs text-pulse-green-dark leading-relaxed">
                            {details.description}
                        </p>
                    </div>
                )}
                {details.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {details.tags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xss font-medium bg-pulse-cream-dark text-pulse-green"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <ChartCard
                title="Monthly Sales"
                subtitle="Units sold and revenue by month"
                className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card py-1"
                bodyClassName="px-0 py-0"
            >
                <DataTable
                    id="product-sales-trend"
                    data={details.salesTrend}
                    columns={productSalesTrendColumns}
                    features={{
                        rowSelection: false,
                        pagination: false,
                        sorting: true,
                        filtering: false,
                        columnVisibility: false,
                        globalSearch: false,
                    }}
                />
            </ChartCard>

            {details.reviews.length > 0 && (
                <ChartCard
                    title="Customer Reviews"
                    subtitle={`${details.reviews.length} review${details.reviews.length !== 1 ? "s" : ""} for this product`}
                    className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card py-1"
                    bodyClassName="px-0 py-0"
                >
                    <DataTable
                        id="product-reviews"
                        data={details.reviews}
                        columns={productReviewColumns}
                        features={{
                            rowSelection: false,
                            pagination: false,
                            sorting: true,
                            filtering: false,
                            columnVisibility: false,
                            globalSearch: false,
                        }}
                    />
                </ChartCard>
            )}
        </div>
    );
}
