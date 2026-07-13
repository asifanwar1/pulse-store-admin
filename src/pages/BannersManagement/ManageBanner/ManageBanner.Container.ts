import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    useCreateBanner,
    useGetBanner,
    useUpdateBanner,
} from "@/hooks/api/banners.queries";
import { useMediaUpload } from "@/hooks/api/media.queries";
import { APP_ROUTES } from "@/routes/appRoutes";
import type { TCreateBannerBody } from "@/api/services/banners/banners.request.types";
import { type formModesType } from "@/components/custom/Form";
import { ACTION_MODES } from "@/constants/action-modes.constants";
import { BANNER_PLACEMENT_OPTIONS } from "@/constants/banner-placement.constants";
import { BANNER_LINK_TYPE_OPTIONS } from "@/constants/banner-link-type.constants";
import { showToast } from "@/lib/toast";
import { resolveOptionValue } from "@/utils/selectOption.utils";
import {
    INITIAL_BANNER_VALUES,
    ManageBannerSchema,
    type ManageBannerFormValues,
} from "./ManageBanner.schema";
import { getManageBannerFormConfig } from "./ManageBanner.config";
import type {
    BannerEditorHandle,
    BannerDesign,
} from "./BannerEditor/BannerEditor.types";
import {
    parseDesign,
    serializeDesign,
    blobToFile,
} from "./BannerEditor/export";

const startOfDayISOString = (date: Date) => {
    const value = new Date(date);
    value.setHours(0, 0, 0, 0);
    return value.toISOString();
};

const endOfDayISOString = (date: Date) => {
    const value = new Date(date);
    value.setHours(23, 59, 59, 999);
    return value.toISOString();
};

const buildBannerPayload = (
    values: ManageBannerFormValues,
    design: BannerDesign,
    imageUrl: string,
): TCreateBannerBody => {
    const linkType = values.linkType as TCreateBannerBody["link_type"];

    return {
        title: values.title.trim(),
        image_url: imageUrl,
        image_url_mobile: null,
        design_json: serializeDesign(design),
        link_type: linkType,
        link_value:
            linkType === "none" ? null : values.linkValue?.trim() || null,
        placement: values.placement as TCreateBannerBody["placement"],
        position: values.position ? Number(values.position) : 0,
        is_active: values.isActive === "active",
        start_date: values.startDate
            ? startOfDayISOString(values.startDate)
            : null,
        end_date: values.endDate ? endOfDayISOString(values.endDate) : null,
    };
};

export const useManageBanner = ({ mode = ACTION_MODES.ADD }: formModesType) => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const editorRef = useRef<BannerEditorHandle>(null);

    const isUpdateMode = mode === ACTION_MODES.UPDATE;

    const { data: banner, isLoading: isBannerLoading } = useGetBanner(
        Number(id),
    );
    const { mutateAsync: createBanner, isPending: isCreatingBanner } =
        useCreateBanner();
    const { mutateAsync: updateBanner, isPending: isUpdatingBanner } =
        useUpdateBanner();
    const { handleSingleFileUpload, isMediaLoading } = useMediaUpload();

    const isLoading = isUpdateMode && isBannerLoading;
    const isSubmitting = isCreatingBanner || isUpdatingBanner || isMediaLoading;

    const formConfig = getManageBannerFormConfig();

    const handleCancel = () => navigate(-1);

    const handleSubmit = async (values: ManageBannerFormValues) => {
        const editor = editorRef.current;
        if (!editor) return;

        try {
            const design = editor.getDesign();
            const pendingImageFiles = editor.getPendingImageFiles();
            const pendingBackgroundFile = editor.getPendingBackgroundFile();

            const resolvedElements = await Promise.all(
                design.elements.map(async (element) => {
                    if (
                        element.type === "image" &&
                        pendingImageFiles.has(element.id)
                    ) {
                        const file = pendingImageFiles.get(element.id)!;
                        const uploaded = await handleSingleFileUpload(file, {
                            folder: "banners",
                        });
                        return { ...element, src: uploaded.url };
                    }
                    return element;
                }),
            );

            let backgroundImage = design.backgroundImage ?? null;
            if (pendingBackgroundFile) {
                const uploaded = await handleSingleFileUpload(
                    pendingBackgroundFile,
                    { folder: "banners" },
                );
                backgroundImage = uploaded.url;
            }

            const finalDesign: BannerDesign = {
                ...design,
                elements: resolvedElements,
                backgroundImage,
            };

            const exportedBlob = await editor.exportImage(2);
            const exportedFile = blobToFile(
                exportedBlob,
                `banner-${values.title.trim().slice(0, 40) || "untitled"}.png`,
            );
            const uploadedImage = await handleSingleFileUpload(exportedFile, {
                folder: "banners",
            });

            const payload = buildBannerPayload(
                values,
                finalDesign,
                uploadedImage.url,
            );

            if (mode === ACTION_MODES.ADD) {
                await createBanner(payload, {
                    onSuccess: () => {
                        showToast.success("Banner created successfully");
                        navigate(APP_ROUTES.BANNERS);
                    },
                });
            } else {
                await updateBanner(
                    { id: Number(id), body: payload },
                    {
                        onSuccess: () => {
                            showToast.success("Banner updated successfully");
                            navigate(APP_ROUTES.BANNERS);
                        },
                    },
                );
            }
        } catch (error) {
            console.error("Failed to save banner:", error);
            showToast.error("Failed to save banner");
        }
    };

    const bannerFormDefaultValues: ManageBannerFormValues =
        isUpdateMode && banner
            ? {
                  title: banner.title,
                  placement: resolveOptionValue(
                      BANNER_PLACEMENT_OPTIONS,
                      banner.placement,
                  ),
                  position: String(banner.position ?? 0),
                  linkType: resolveOptionValue(
                      BANNER_LINK_TYPE_OPTIONS,
                      banner.link_type,
                  ),
                  linkValue: banner.link_value ?? "",
                  startDate: banner.start_date
                      ? new Date(banner.start_date)
                      : null,
                  endDate: banner.end_date ? new Date(banner.end_date) : null,
                  isActive: banner.is_active ? "active" : "inactive",
              }
            : INITIAL_BANNER_VALUES;

    const initialDesign =
        isUpdateMode && banner ? parseDesign(banner.design_json) : undefined;

    return {
        editorRef,
        formConfig,
        ManageBannerSchema,
        isSubmitting,
        isLoading,
        bannerFormDefaultValues,
        initialDesign,
        handleCancel,
        handleSubmit,
    };
};
