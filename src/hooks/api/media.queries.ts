import { UploadMedia } from "@/api";
import type { TMediaUploadResponse } from "@/api/services/media";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

type TSingleFileUploadOptions = {
    fieldName?: string;
};

type TMultipleFileUploadOptions = TSingleFileUploadOptions & {
    returnFullResponse?: boolean;
};

export const useMediaUpload = () => {
    const [isMediaLoading, setIsMediaLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const uploadMediaMutation = useMutation({
        mutationFn: (formData: FormData) => UploadMedia(formData),
    });

    const uploadSingleFile = async (file: File, fieldName: string) => {
        const formData = new FormData();

        formData.append(fieldName, file);

        return uploadMediaMutation.mutateAsync(formData);
    };

    const handleSingleFileUpload = async (
        file: File,
        options?: TSingleFileUploadOptions
    ) => {
        const fieldName = options?.fieldName || "file";

        try {
            setIsMediaLoading(true);
            setProgress(0);

            const response = await uploadSingleFile(file, fieldName);

            setProgress(100);
            return response;
        } finally {
            setIsMediaLoading(false);
        }
    };

    const handleMultipleFileUpload = async <
        TReturnFullResponse extends boolean = false,
    >(
        files: File[],
        options?: TMultipleFileUploadOptions & {
            returnFullResponse?: TReturnFullResponse;
        }
    ): Promise<
        TReturnFullResponse extends true ? TMediaUploadResponse[] : string[]
    > => {
        if (!files.length) {
            return [] as unknown as TReturnFullResponse extends true
                ? TMediaUploadResponse[]
                : string[];
        }

        const fieldName = options?.fieldName || "file";
        const returnFullResponse = options?.returnFullResponse || false;

        setIsMediaLoading(true);
        setProgress(0);

        try {
            let completedUploads = 0;

            const settledResults = await Promise.allSettled(
                files.map(async (file) => {
                    const response = await uploadSingleFile(file, fieldName);

                    completedUploads += 1;
                    setProgress(
                        Math.round((completedUploads / files.length) * 100)
                    );

                    return response;
                })
            );

            const uploadedFiles = settledResults
                .filter(
                    (
                        result
                    ): result is PromiseFulfilledResult<TMediaUploadResponse> =>
                        result.status === "fulfilled"
                )
                .map((result) => result.value);

            if (returnFullResponse) {
                return uploadedFiles as TReturnFullResponse extends true
                    ? TMediaUploadResponse[]
                    : string[];
            }

            return uploadedFiles
                .map(
                    (item) =>
                        item.file_url ||
                        item.url ||
                        item.key ||
                        item.path ||
                        item.file_name ||
                        item.filename
                )
                .filter((item): item is string => !!item) as TReturnFullResponse extends true
                ? TMediaUploadResponse[]
                : string[];
        } finally {
            setIsMediaLoading(false);
        }
    };

    return {
        handleSingleFileUpload,
        handleMultipleFileUpload,
        isMediaLoading,
        progress,
        uploadMediaMutation,
    };
};
