import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "@/routes/appRoutes";
import {
    type FormBuilderRef,
    type formModesType,
} from "@/components/custom/Form";
import {
    ManageShipmentSchema,
    type ManageShipmentFormValues,
} from "./ManageShipment.schema";
import { ACTION_MODES } from "@/constants/action-modes.constants";

export const useManageShipment = ({
    mode = ACTION_MODES.ADD,
}: formModesType) => {
    const navigate = useNavigate();
    const formRef = useRef<FormBuilderRef<ManageShipmentFormValues>>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCancel = () => {
        navigate(APP_ROUTES.SHIPMENTS);
    };

    const handleSubmit = async (values: ManageShipmentFormValues) => {
        setIsSubmitting(true);
        try {
            console.log("Shipment payload:", { ...values, mode });
            navigate(APP_ROUTES.SHIPMENTS);
        } finally {
            setIsSubmitting(false);
        }
    };

    const triggerSubmit = () => {
        formRef.current?.handleSubmit(handleSubmit)();
    };

    return {
        formRef,
        ManageShipmentSchema,
        isSubmitting,
        handleCancel,
        handleSubmit,
        triggerSubmit,
    };
};
