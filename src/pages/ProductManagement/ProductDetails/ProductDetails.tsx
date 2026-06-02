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
    Edit,
    Check,
} from "lucide-react";

import ChartCard from "@/components/custom/CustomCards/ChartCard";
import { DataTable } from "@/components/custom/DataTable";
import { cn } from "@/lib/utils";
import {
    productSalesTrendColumns,
    productReviewColumns,
} from "./ProductDetails.Config";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel";
import Image from "@/components/custom/Image";

import InfoCard from "@/components/custom/CustomCards/InfoCard";
import Button from "@/components/custom/CustomButton/CustomButton";
import StatChipCard from "@/components/custom/CustomCards/StatChipCard";
import { useProductDetails } from "./ProductDetails.Container";
import { getInitialsFromName } from "@/utils/common.utils";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton";
import { getFormattedDate } from "@/utils/dateTime.utils";
import {
    ProductStatus,
    ProductStatusWithHelpers,
    type ProductStatusType,
} from "@/constants/product-status.constants";

export default function ProductDetails() {
    const {
        product,
        isLoading,
        productMonthlySales,
        customerReviews,
        isUpdatingProductStatus,
        handleNavigateBack,
        handleNavigateToEdit,
        handleMarkAsActiveInactive,
    } = useProductDetails();

    if (isLoading) {
        return <ProductDetailsSkeleton />;
    }

    if (!product && !isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <p className="text-lg font-semibold text-pulse-green-dark">
                    Product not found
                </p>

                <Button onClick={handleNavigateBack} variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Products
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 min-h-0">
            <div className="flex items-center justify-between">
                <Button onClick={handleNavigateBack} variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Products
                </Button>
                <div className="flex items-center gap-2">
                    <Button
                        onClick={handleNavigateToEdit}
                        variant="outline"
                        size="sm"
                        startIcon={<Edit className="w-4 h-4" />}
                    >
                        Edit Product
                    </Button>
                    <Button
                        onClick={handleMarkAsActiveInactive}
                        variant="outline"
                        size="sm"
                        disabled={isUpdatingProductStatus}
                        isLoading={isUpdatingProductStatus}
                        startIcon={<Check className="w-4 h-4" />}
                    >
                        Mark as{" "}
                        {product?.status === ProductStatus.ACTIVE
                            ? "Inactive"
                            : "Active"}
                    </Button>
                </div>
            </div>

            <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-pulse-cream-dark text-pulse-green font-bold text-xl shrink-0">
                        {getInitialsFromName(product?.name || "")}
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-lg font-bold text-pulse-green-dark">
                                {product?.name || "-"}
                            </h2>
                            <span
                                className={cn(
                                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                                    ProductStatusWithHelpers.getLabelClass(
                                        product?.status as ProductStatusType,
                                    ),
                                )}
                            >
                                {ProductStatusWithHelpers.getDisplayTextKey(
                                    product?.status as ProductStatusType,
                                )}
                            </span>
                        </div>
                        <p className="text-sm text-app-secondary">
                            {product?.brand}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-pulse-green">
                            <span className="flex items-center gap-1">
                                <Hash className="w-3 h-3" />
                                {product?.id}
                            </span>
                            <span className="flex items-center gap-1">
                                <Barcode className="w-3 h-3" />
                                {product?.sku}
                            </span>
                            <span className="flex items-center gap-1">
                                <Layers className="w-3 h-3" />
                                {product?.category_name}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                Added {getFormattedDate(product?.created_at!)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatChipCard
                    icon={<DollarSign className="w-4 h-4" />}
                    label="Price"
                    value={`$${product?.retail_price?.toLocaleString()}`}
                />
                <StatChipCard
                    icon={<Package className="w-4 h-4" />}
                    label="In Stock"
                    value={product?.stock_quantity?.toLocaleString()!}
                />
                <StatChipCard
                    icon={<TrendingUp className="w-4 h-4" />}
                    label="Total Sales"
                    value={product?.total_sales?.toLocaleString()!}
                />
                <StatChipCard
                    icon={<Star className="w-4 h-4" />}
                    label="Rating"
                    value={product?.rating?.toLocaleString() || "-"}
                />
            </div>

            <div className="flex flex-wrap gap-4">
                {product?.media && product?.media?.length > 0 && (
                    <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-5 flex-1">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-pulse-green-dark">
                                Product Images
                            </h3>
                            <span className="text-xs text-app-secondary">
                                {product.media.length} image
                                {product.media.length !== 1 ? "s" : ""}
                            </span>
                        </div>

                        <Carousel className="relative">
                            <CarouselContent className="min-h-[260px]">
                                {product.media.map((item) => (
                                    <CarouselItem
                                        key={item.id}
                                        className="h-full"
                                    >
                                        <div className="overflow-hidden rounded-3xl bg-pulse-cream-dark">
                                            <Image
                                                src={item.url}
                                                alt={
                                                    product.name ||
                                                    "Product image"
                                                }
                                                className="h-[260px] w-full object-cover"
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>

                            <CarouselPrevious className="!left-3" />
                            <CarouselNext className="!right-3" />
                        </Carousel>
                    </div>
                )}

                <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-5 flex flex-col gap-4 flex-1">
                    <h3 className="text-sm font-semibold text-pulse-green-dark border-b border-pulse-cream-dark pb-3">
                        Product Information
                    </h3>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <InfoCard
                            icon={<DollarSign className="w-4 h-4" />}
                            label="Retail Price"
                            value={`$${product?.retail_price?.toLocaleString()}`}
                        />
                        <InfoCard
                            icon={<DollarSign className="w-4 h-4" />}
                            label="Cost Price"
                            value={`$${product?.cost_price?.toLocaleString()}`}
                        />
                        <InfoCard
                            icon={<Layers className="w-4 h-4" />}
                            label="Category"
                            value={product?.category_name!}
                        />
                        <InfoCard
                            icon={<Tag className="w-4 h-4" />}
                            label="Brand"
                            value={product?.brand!}
                        />
                    </div>
                    {product?.description && (
                        <div className="flex flex-col gap-1 pt-1 border-t border-pulse-cream-dark">
                            <span className="text-xs text-pulse-green font-medium">
                                Description
                            </span>
                            <p className="text-xs text-pulse-green-dark leading-relaxed">
                                {product?.description}
                            </p>
                        </div>
                    )}
                    {product?.tags && product?.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {product?.tags.map((tag) => (
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
            </div>

            <ChartCard
                title="Monthly Sales"
                subtitle="Units sold and revenue by month"
                className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card py-1"
                bodyClassName="px-0 py-0"
            >
                <DataTable
                    id="product-sales-trend"
                    data={productMonthlySales || []}
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

            {customerReviews && (
                <ChartCard
                    title="Customer Reviews"
                    subtitle={`${customerReviews.length} review${customerReviews.length !== 1 ? "s" : ""} for this product`}
                    className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card py-1"
                    bodyClassName="px-0 py-0"
                >
                    <DataTable
                        id="product-reviews"
                        data={customerReviews}
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
