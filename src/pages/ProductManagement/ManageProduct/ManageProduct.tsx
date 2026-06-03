import { ArrowLeft } from "lucide-react";

import Button from "@/components/custom/CustomButton/CustomButton";
import { FormBuilder } from "@/components/custom/Form";
import { type ManageProductFormValues } from "./ManageProduct.schema";
import { useManageProduct } from "./ManageProduct.Container";
import type { ManageProductFormProps } from "../ProductManagement.types";
import ManageProductSkeleton from "./ManageProductSkeleton";
import { ACTION_MODES } from "@/constants/action-modes.constants";

const ManageProduct: React.FC<ManageProductFormProps> = ({ mode }) => {
    const {
        formRef,
        formConfig,
        ManageProductSchema,
        isSubmitting,
        isProductLoading,
        productFormDefaultValues,
        handleCancel,
        handleSubmit,
    } = useManageProduct({
        mode,
    });

    if (isProductLoading) {
        return <ManageProductSkeleton />;
    }

    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 min-h-0">
            <div className="flex">
                <Button
                    onClick={handleCancel}
                    variant="ghost"
                    size="sm"
                    disabled={isSubmitting}
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to{" "}
                    {mode === ACTION_MODES.ADD ? "Products" : "Product Details"}
                </Button>
            </div>

            <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-6 flex flex-col gap-6">
                <div>
                    <h3 className="text-sm font-semibold text-pulse-green-dark">
                        New Product
                    </h3>
                    <p className="text-xs text-pulse-green mt-0.5">
                        Fill in the details below to add a new product to the
                        catalogue
                    </p>
                </div>

                <FormBuilder<ManageProductFormValues>
                    ref={formRef}
                    config={formConfig}
                    schema={ManageProductSchema}
                    defaultValues={productFormDefaultValues}
                    onSubmit={handleSubmit}
                    className="grid grid-cols-12 gap-4"
                    noValidate
                >
                    <div className="col-span-12 flex flex-wrap justify-end gap-3 pt-2 border-t border-pulse-cream-dark">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            isLoading={isSubmitting}
                            disabled={isSubmitting}
                        >
                            Save Product
                        </Button>
                    </div>
                </FormBuilder>
            </div>
        </div>
    );
};

export default ManageProduct;
