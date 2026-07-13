import { ArrowLeft } from "lucide-react";

import Button from "@/components/custom/CustomButton/CustomButton";
import { FormBuilder } from "@/components/custom/Form";
import { ACTION_MODES } from "@/constants/action-modes.constants";
import BannerEditor from "./BannerEditor/BannerEditor";
import { type ManageBannerFormValues } from "./ManageBanner.schema";
import { useManageBanner } from "./ManageBanner.Container";
import ManageBannerSkeleton from "./ManageBannerSkeleton";

type ManageBannerProps = {
    mode: "add" | "update";
};

const ManageBanner: React.FC<ManageBannerProps> = ({ mode }) => {
    const {
        editorRef,
        formConfig,
        ManageBannerSchema,
        isSubmitting,
        isLoading,
        bannerFormDefaultValues,
        initialDesign,
        handleCancel,
        handleSubmit,
    } = useManageBanner({ mode });

    if (isLoading) {
        return (
            <div className="flex flex-col gap-6 p-4 sm:p-6 min-h-0">
                <ManageBannerSkeleton />
            </div>
        );
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
                    Back to Banners
                </Button>
            </div>

            <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-6 flex flex-col gap-4">
                <div>
                    <h3 className="text-sm font-semibold text-pulse-green-dark">
                        {mode === ACTION_MODES.ADD
                            ? "New Banner"
                            : "Update Banner"}
                    </h3>
                    <p className="text-xs text-pulse-green mt-0.5">
                        Design the banner on the canvas, then fill in where it
                        should appear and where it should link to.
                    </p>
                </div>

                <BannerEditor ref={editorRef} initialDesign={initialDesign} />
            </div>

            <div className="bg-pulse-cream-dark/40 rounded-2xl border border-pulse-cream-dark shadow-dash-card p-6 flex flex-col gap-6">
                <div>
                    <h3 className="text-sm font-semibold text-pulse-green-dark">
                        Banner Details
                    </h3>
                    <p className="text-xs text-pulse-green mt-0.5">
                        Where this banner shows up, what it links to, and when
                        it runs.
                    </p>
                </div>

                <FormBuilder<ManageBannerFormValues>
                    config={formConfig}
                    schema={ManageBannerSchema}
                    defaultValues={bannerFormDefaultValues}
                    onSubmit={handleSubmit}
                    className="grid grid-cols-12 gap-4"
                    noValidate
                >
                    <div className="col-span-12 flex flex-wrap justify-end gap-3 pt-2">
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
                            Save Banner
                        </Button>
                    </div>
                </FormBuilder>
            </div>
        </div>
    );
};

export default ManageBanner;
