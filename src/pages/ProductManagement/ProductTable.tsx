import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import ChartCard from "@/components/custom/CustomCards/ChartCard";
import { DataTable } from "@/components/custom/DataTable";
import { APP_ROUTES } from "@/routes/appRoutes";
import { getRouteWithId } from "@/utils/common.utils";
import Button from "@/components/custom/CustomButton/CustomButton";
import { productManagementTableColumns } from "./ProductManagement.Config";
import type { ProductTableProps } from "./ProductManagement.types";

const ProductTable: React.FC<ProductTableProps> = ({
    productsListData,
    totalCount,
    pageCount,
    page,
    pageSize,
    onSearch,
    onPaginationChange,
}) => {
    const navigate = useNavigate();

    return (
        <ChartCard
            title="All Products"
            subtitle="Complete product catalogue with pricing, stock and sales details"
            className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card py-1"
            bodyClassName="px-0 py-0"
            action={
                <Button
                    size="sm"
                    onClick={() => navigate(APP_ROUTES.PRODUCTS_ADD)}
                >
                    <Plus className="w-4 h-4" />
                    Add New Product
                </Button>
            }
        >
            <DataTable
                id="products-list"
                data={productsListData}
                columns={productManagementTableColumns}
                pageCount={pageCount}
                totalCount={totalCount}
                initialState={{
                    pagination: { pageIndex: page - 1, pageSize },
                }}
                searchPlaceholder="Search products..."
                features={{
                    rowSelection: false,
                    pagination: true,
                    sorting: true,
                    filtering: false,
                    columnVisibility: false,
                    globalSearch: true,
                }}
                callbacks={{
                    onRowClick: (row) =>
                        navigate(
                            getRouteWithId({
                                route: APP_ROUTES.PRODUCTS_DETAILS,
                                id: row.original.id,
                            }),
                        ),
                    onGlobalSearch: onSearch,
                    onPaginationChange,
                }}
            />
        </ChartCard>
    );
};

export default ProductTable;
