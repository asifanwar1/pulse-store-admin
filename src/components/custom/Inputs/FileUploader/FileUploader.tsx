import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
    Upload,
    X,
    FileText,
    FileImage,
    FileVideo,
    File as FileIcon,
} from "lucide-react";
import type { FilePreviewItem, FileUploaderProps } from "./types";

const PREVIEW_SIZE_MAP = {
    sm: "w-16 h-16",
    md: "w-20 h-20",
    lg: "w-24 h-24",
};

function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileIcon(file: File): React.ReactNode {
    const type = file.type;
    if (type.startsWith("image/"))
        return <FileImage className="w-5 h-5 text-pulse-green" />;
    if (type.startsWith("video/"))
        return <FileVideo className="w-5 h-5 text-pulse-green" />;
    if (type === "application/pdf" || type.startsWith("text/"))
        return <FileText className="w-5 h-5 text-pulse-green" />;
    return <FileIcon className="w-5 h-5 text-pulse-green" />;
}

function buildPreviews(files: File[]): FilePreviewItem[] {
    return files.map((file) => ({
        file,
        previewUrl: file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : null,
        id: `${file.name}-${file.size}-${file.lastModified}`,
    }));
}

const FileUploader = React.forwardRef<HTMLInputElement, FileUploaderProps>(
    (
        {
            value,
            onChange,
            onBlur,
            name,
            label,
            placeholder = "Drag & drop files here, or click to browse",
            error,
            disabled = false,
            required = false,
            multiple = true,
            accept,
            maxSize = 5 * 1024 * 1024, // 5 MB
            maxFiles = 10,
            containerClass = "",
            labelClass = "",
            dropzoneClass = "",
            previewSize = "md",
        },
        ref,
    ) => {
        const inputId = useId();
        const inputRef = useRef<HTMLInputElement>(null);

        React.useImperativeHandle(ref, () => inputRef.current!);

        const normalizedFiles: File[] = Array.isArray(value) ? value : [];

        const [previews, setPreviews] = useState<FilePreviewItem[]>(() =>
            buildPreviews(normalizedFiles),
        );
        const [isDragging, setIsDragging] = useState(false);
        const [validationError, setValidationError] = useState<string | null>(
            null,
        );

        useEffect(() => {
            const incoming: File[] = Array.isArray(value) ? value : [];
            setPreviews((prev) => {
                // Revoke URLs for files no longer present
                prev.forEach((p) => {
                    if (p.previewUrl && !incoming.includes(p.file)) {
                        URL.revokeObjectURL(p.previewUrl);
                    }
                });
                return buildPreviews(incoming);
            });
        }, [value]);

        useEffect(() => {
            return () => {
                previews.forEach((p) => {
                    if (p.previewUrl) URL.revokeObjectURL(p.previewUrl);
                });
            };
        }, []);

        const validate = useCallback(
            (files: File[]): string | null => {
                for (const file of files) {
                    if (file.size > maxSize) {
                        return `"${file.name}" exceeds max size of ${formatBytes(maxSize)}.`;
                    }
                    if (accept) {
                        const accepted = accept.split(",").map((a) => a.trim());
                        const matched = accepted.some((a) => {
                            if (a.startsWith(".")) {
                                return file.name
                                    .toLowerCase()
                                    .endsWith(a.toLowerCase());
                            }
                            if (a.endsWith("/*")) {
                                return file.type.startsWith(a.slice(0, -2));
                            }
                            return file.type === a;
                        });
                        if (!matched) {
                            return `"${file.name}" is not an accepted file type.`;
                        }
                    }
                }
                return null;
            },
            [accept, maxSize],
        );

        const mergeFiles = useCallback(
            (incoming: File[]): File[] => {
                const current: File[] = Array.isArray(value) ? value : [];
                if (!multiple) return incoming.slice(0, 1);

                const existingNames = new Set(
                    current.map((f) => `${f.name}-${f.size}`),
                );
                const unique = incoming.filter(
                    (f) => !existingNames.has(`${f.name}-${f.size}`),
                );
                return [...current, ...unique].slice(0, maxFiles);
            },
            [value, multiple, maxFiles],
        );

        const processFiles = useCallback(
            (rawFiles: File[]) => {
                if (!rawFiles.length) return;
                const err = validate(rawFiles);
                if (err) {
                    setValidationError(err);
                    return;
                }
                setValidationError(null);
                const merged = mergeFiles(rawFiles);
                onChange?.(merged);
            },
            [validate, mergeFiles, onChange],
        );

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = Array.from(e.target.files ?? []);
            processFiles(files);
            e.target.value = "";
        };

        const handleRemove = (id: string) => {
            const current: File[] = Array.isArray(value) ? value : [];
            const target = previews.find((p) => p.id === id);
            if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
            const updated = current.filter(
                (f) => `${f.name}-${f.size}-${f.lastModified}` !== id,
            );
            onChange?.(updated);
        };

        const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            setIsDragging(false);
            if (disabled) return;
            const files = Array.from(e.dataTransfer.files);
            processFiles(files);
        };

        const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            if (!disabled) setIsDragging(true);
        };

        const handleDragLeave = () => setIsDragging(false);

        const openBrowser = () => {
            if (!disabled) inputRef.current?.click();
        };

        const displayError = validationError ?? error;
        const currentFiles: File[] = Array.isArray(value) ? value : [];
        const isAtMax = !multiple
            ? currentFiles.length >= 1
            : currentFiles.length >= maxFiles;

        return (
            <div className={cn("flex flex-col w-full gap-1", containerClass)}>
                {label && (
                    <label
                        htmlFor={inputId}
                        className={cn(
                            "text-sm text-pulse-green font-normal",
                            labelClass,
                        )}
                    >
                        {label}{" "}
                        {required && <span className="text-red-500">*</span>}
                    </label>
                )}

                {/* Drop zone */}
                {!isAtMax && (
                    <div
                        role="button"
                        tabIndex={disabled ? -1 : 0}
                        aria-label="File upload area"
                        onClick={openBrowser}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ")
                                openBrowser();
                        }}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onBlur={onBlur}
                        className={cn(
                            "relative flex flex-col items-center justify-center gap-2 rounded-[8px] border-2 border-dashed transition-all cursor-pointer py-6 px-4 text-center",
                            "border-[#e2e8f0] bg-white hover:border-[#2A5C42] hover:bg-[#2A5C42]/5",
                            isDragging && "border-[#2A5C42] bg-[#2A5C42]/10",
                            displayError && "border-red-400 bg-red-50",
                            disabled &&
                                "opacity-60 pointer-events-none cursor-not-allowed",
                            dropzoneClass,
                        )}
                    >
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#2A5C42]/10">
                            <Upload className="w-5 h-5 text-[#2A5C42]" />
                        </div>
                        <div>
                            <p className="text-sm text-pulse-green font-normal">
                                {placeholder}
                            </p>
                            <p className="text-xs text-pulse-green/60 mt-0.5">
                                {accept
                                    ? `Accepted: ${accept}`
                                    : "All file types accepted"}{" "}
                                &middot; Max {formatBytes(maxSize)}
                                {multiple &&
                                    maxFiles < 100 &&
                                    ` · Up to ${maxFiles} files`}
                            </p>
                        </div>
                        <input
                            ref={inputRef}
                            id={inputId}
                            name={name}
                            type="file"
                            multiple={multiple}
                            accept={accept}
                            disabled={disabled}
                            onChange={handleInputChange}
                            className="sr-only"
                            aria-hidden="true"
                        />
                    </div>
                )}

                {previews.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                        {previews.map((item) => (
                            <div
                                key={item.id}
                                className={cn(
                                    "relative group flex flex-col items-center justify-between rounded-[8px] border border-[#e2e8f0] bg-white overflow-hidden shadow-sm",
                                    PREVIEW_SIZE_MAP[previewSize],
                                )}
                            >
                                {item.previewUrl ? (
                                    <img
                                        src={item.previewUrl}
                                        alt={item.file.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center w-full h-full gap-1 px-1">
                                        {getFileIcon(item.file)}
                                        <span className="text-[9px] text-pulse-green/70 font-normal text-center leading-tight line-clamp-2 w-full px-1">
                                            {item.file.name}
                                        </span>
                                        <span className="text-[9px] text-pulse-green/50">
                                            {formatBytes(item.file.size)}
                                        </span>
                                    </div>
                                )}

                                {!disabled && (
                                    <button
                                        type="button"
                                        aria-label={`Remove ${item.file.name}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemove(item.id);
                                        }}
                                        className="absolute top-0.5 right-0.5 z-10 flex items-center justify-center w-4 h-4 rounded-full bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow"
                                    >
                                        <X className="w-2.5 h-2.5 text-white" />
                                    </button>
                                )}

                                {item.previewUrl && (
                                    <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform bg-black/60 px-1 py-0.5">
                                        <p className="text-[9px] text-white text-center truncate leading-tight">
                                            {item.file.name}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}

                        {isAtMax && !multiple && !disabled && (
                            <button
                                type="button"
                                onClick={openBrowser}
                                className="flex flex-col items-center justify-center rounded-[8px] border-2 border-dashed border-[#e2e8f0] text-pulse-green hover:border-[#2A5C42] hover:bg-[#2A5C42]/5 transition-all cursor-pointer gap-1 text-xs px-2"
                                style={{
                                    width: PREVIEW_SIZE_MAP[previewSize]
                                        .split(" ")[0]
                                        .replace("w-", "")
                                        .concat("px"),
                                    height: PREVIEW_SIZE_MAP[previewSize]
                                        .split(" ")[1]
                                        .replace("h-", "")
                                        .concat("px"),
                                }}
                            >
                                <Upload className="w-4 h-4" />
                                <span>Replace</span>
                            </button>
                        )}
                    </div>
                )}

                {displayError && (
                    <div className="flex items-center gap-1 mt-0.5">
                        <p className="text-sm text-red-500">{displayError}</p>
                    </div>
                )}
            </div>
        );
    },
);

FileUploader.displayName = "FileUploader";

export default FileUploader;
