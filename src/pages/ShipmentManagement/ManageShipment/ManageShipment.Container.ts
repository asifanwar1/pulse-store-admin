import { useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
    type FormBuilderRef,
    type formModesType,
} from "@/components/custom/Form";
import { type ManageShipmentFormValues } from "./ManageShipment.schema";
import { ACTION_MODES } from "@/constants/action-modes.constants";
import { useCreateShipment } from "@/hooks/api/shipment.queries";
import { getRouteWithId } from "@/utils/common.utils";
import { APP_ROUTES } from "@/routes/appRoutes";
import { showToast } from "@/lib/toast";

const NO_VALUE = 0;

const buildShipmentPayload = (
    values: ManageShipmentFormValues,
    orderId: string,
) => ({
    order_id: Number(orderId),
    tracking_id: values.trackingNumber,
    shipment_method: values.shipmentMethod,
    courier: values.courier,
    estimated_delivery_date: values.estimatedDeliveryDate,
    shipped_at: values.shippedDate,
    notes: values.notes,
});

export const useManageShipment = ({
    mode = ACTION_MODES.ADD,
}: formModesType) => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const location = useLocation();

    const orderDetails = location.state?.orderData;

    const formRef = useRef<FormBuilderRef<ManageShipmentFormValues>>(null);

    const { mutateAsync: createShipment, isPending: isCreatingShipment } =
        useCreateShipment();

    const isSubmitting = isCreatingShipment;

    const handleNavigateBack = () => navigate(-1);

    const handleSubmit = async (values: ManageShipmentFormValues) => {
        try {
            const payload = buildShipmentPayload(values, id!);

            await createShipment(payload, {
                onSuccess: () => {
                    showToast.success("Shipment created successfully");
                    handleNavigateBack();
                },
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleNavigateToProduct = (id: string) =>
        navigate(
            getRouteWithId({
                route: APP_ROUTES.PRODUCTS_DETAILS,
                id,
            }),
        );

    return {
        NO_VALUE,
        formRef,
        mode,
        isSubmitting,
        orderDetails,
        handleSubmit,
        handleNavigateBack,
        handleNavigateToProduct,
    };
};
