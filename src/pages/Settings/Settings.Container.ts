import { useRef } from "react";
import {
    useGetOrderConfig,
    useUpdateOrderConfig,
} from "@/hooks/api/orders.queries";
import type { FormBuilderRef } from "@/components/custom/Form";
import type { SettingsFormValues } from "./Settings.schema";

export const useSettings = () => {
    const formRef = useRef<FormBuilderRef<SettingsFormValues> | null>(null);

    const { data: orderConfig, isLoading: isOrderConfigLoading } =
        useGetOrderConfig();

    const { mutateAsync: updateOrderConfig, isPending: isSubmitting } =
        useUpdateOrderConfig();

    const initialValues: SettingsFormValues = {
        shippingFee: orderConfig?.shipping_fee ?? "",
    };

    const handleSubmit = async (values: SettingsFormValues) => {
        await updateOrderConfig({
            shipping_fee: Number(values.shippingFee),
        });
    };

    return {
        formRef,
        initialValues,
        isOrderConfigLoading,
        isSubmitting,
        handleSubmit,
    };
};
