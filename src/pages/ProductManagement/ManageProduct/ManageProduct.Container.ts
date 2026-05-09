import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "@/routes/appRoutes";
import {
    type FormBuilderRef,
    type formModesType,
} from "@/components/custom/Form";
import {
    ManageProductSchema,
    type ManageProductFormValues,
} from "./ManageProduct.schema";
import { ACTION_MODES } from "@/constants/action-modes.constants";

export const useManageProduct = ({
    mode = ACTION_MODES.ADD,
}: formModesType) => {
    const navigate = useNavigate();
    const formRef = useRef<FormBuilderRef<ManageProductFormValues>>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCancel = () => {
        navigate(APP_ROUTES.PRODUCTS);
    };

    const handleSubmit = async (values: ManageProductFormValues) => {
        setIsSubmitting(true);
        try {
            console.log("New product payload:", {
                ...values,
                price: Number(values.price),
                costPrice: Number(values.costPrice),
                stock: parseInt(values.stock, 10),
                mode: mode === ACTION_MODES.ADD ? "add" : "update",
                tags: values.tags,
            });
            navigate(APP_ROUTES.PRODUCTS);
        } finally {
            setIsSubmitting(false);
        }
    };

    const triggerSubmit = () => {
        formRef.current?.handleSubmit(handleSubmit)();
    };

    return {
        formRef,
        ManageProductSchema,
        isSubmitting,
        handleCancel,
        handleSubmit,
        triggerSubmit,
    };
};
