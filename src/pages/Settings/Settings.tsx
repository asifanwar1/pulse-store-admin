import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomButton from "@/components/custom/CustomButton/CustomButton";
import { FormBuilder } from "@/components/custom/Form";
import CommonSkeleton from "@/components/custom/CommonSkeleton/CommonSkeleton";
import { SETTINGS_FORM_CONFIG } from "./Settings.config";
import { SETTINGS_FORM_SCHEMA } from "./Settings.schema";
import { useSettings } from "./Settings.Container";

const Settings = () => {
    const {
        formRef,
        initialValues,
        isOrderConfigLoading,
        isSubmitting,
        handleSubmit,
    } = useSettings();

    if (isOrderConfigLoading) {
        return <CommonSkeleton />;
    }

    return (
        <div className="flex flex-col gap-6 p-4 sm:p-6 min-h-0">
            <Card className="bg-pulse-cream">
                <CardHeader>
                    <CardTitle>Shipping</CardTitle>
                </CardHeader>
                <CardContent>
                    <FormBuilder
                        ref={formRef}
                        defaultValues={initialValues}
                        config={SETTINGS_FORM_CONFIG}
                        schema={SETTINGS_FORM_SCHEMA}
                        onSubmit={handleSubmit}
                    >
                        <div className="flex justify-end">
                            <CustomButton
                                type="submit"
                                disabled={isSubmitting}
                                isLoading={isSubmitting}
                            >
                                Save Changes
                            </CustomButton>
                        </div>
                    </FormBuilder>
                </CardContent>
            </Card>
        </div>
    );
};

export default Settings;
