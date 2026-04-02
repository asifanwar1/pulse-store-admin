import React, { useImperativeHandle, forwardRef } from "react";
import {
    useForm,
    Controller,
    type FieldValues,
    type Path,
    type UseFormReturn,
    type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/custom/Input";
import { cn } from "@/lib/utils";

// Stricter version that prevents repeated TLDs like .com.com
// Ultra-strict: only allows single TLD like .com, .org (no .co.uk)
export const emailRegex =
    /^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;
// At least 8 chars, one uppercase, one number and one special character
export const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const phoneRegex = /^\d{10}$/;

export type FieldType<T extends FieldValues> = {
    name: Path<T>;
    label?: string;
    placeholder?: string;
    type?: string;
    className?: string; // e.g. "col-span-6"
    component?: React.ComponentType<any>;
    disabled?: boolean;
    componentProps?: any;
    onValueChange?: (value: any, form?: UseFormReturn<T>) => void;
    value?: any;
    icon?: any;
    required?: boolean;
    shouldDisplay?: (form: UseFormReturn<T>) => boolean;
    helperText?: string;
    inputClass?: string;
    labelClass?: string;
};

type FormBuilderProps<T extends FieldValues> = {
    config: FieldType<T>[];
    schema: any; // zod schema
    onSubmit: SubmitHandler<T>;
    defaultValues?: Partial<T>;
    values?: Partial<T>;
    children?: React.ReactNode;
    className?: string;
    initialValues?: T;
    noValidate?: boolean;
};

export type FormBuilderRef<T extends FieldValues> = UseFormReturn<T> & {
    errors: any;
};

function getInitialValues<T extends FieldValues>(
    config: FieldType<T>[],
): Partial<T> {
    const obj: any = {};
    config.forEach((item) => {
        obj[item.name] = item.value ?? "";
    });
    return obj;
}

export const FormBuilder = forwardRef(function FormBuilder<
    T extends FieldValues,
>(
    {
        config,
        schema,
        onSubmit,
        defaultValues,
        children,
        className = "grid grid-cols-12 gap-2",
        noValidate = false,
    }: FormBuilderProps<T>,
    ref: React.Ref<FormBuilderRef<T>>,
) {
    const form = useForm<T>({
        resolver: zodResolver(schema),
        defaultValues: (defaultValues ?? getInitialValues(config)) as any,
    });

    useImperativeHandle(ref, () => ({
        ...form,
        errors: form.formState.errors,
    }));

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                autoComplete="nope"
                noValidate={noValidate}
            >
                <div className={className}>
                    {config.map((field, _idx) => {
                        const shouldRender = field.shouldDisplay
                            ? field.shouldDisplay(form)
                            : true;

                        if (!shouldRender) {
                            return null;
                        }

                        return (
                            <Controller
                                key={field.name as string}
                                control={form.control}
                                name={field.name}
                                render={({ field: controllerField }) => (
                                    <FormItem
                                        className={cn(
                                            field?.disabled &&
                                                "opacity-80 pointer-events-none !cursor-not-allowed",
                                            field.className || "col-span-12",
                                        )}
                                    >
                                        <FormControl>
                                            {field.component ? (
                                                <field.component
                                                    required={field.required}
                                                    {...controllerField}
                                                    {...field.componentProps}
                                                    disabled={field.disabled}
                                                    label={field.label}
                                                    placeholder={
                                                        field.placeholder
                                                    }
                                                    error={
                                                        form.formState.errors[
                                                            field.name
                                                        ]?.message as
                                                            | string
                                                            | undefined
                                                    }
                                                    onChange={(e: any) => {
                                                        controllerField.onChange(
                                                            e,
                                                        );
                                                        field.onValueChange?.(
                                                            e,
                                                        );
                                                    }}
                                                    onValueChange={
                                                        field.onValueChange
                                                            ? (value: any) =>
                                                                  field.onValueChange!(
                                                                      value,
                                                                      form,
                                                                  )
                                                            : () => {}
                                                    }
                                                />
                                            ) : (
                                                <Input
                                                    required={field.required}
                                                    {...controllerField}
                                                    {...field.componentProps}
                                                    disabled={field.disabled}
                                                    type={field.type || "text"}
                                                    icon={field.icon}
                                                    label={field.label}
                                                    labelClass={
                                                        field.labelClass
                                                    }
                                                    placeholder={
                                                        field.placeholder
                                                    }
                                                    error={
                                                        form.formState.errors[
                                                            field.name
                                                        ]?.message as
                                                            | string
                                                            | undefined
                                                    }
                                                    onChange={(e: any) => {
                                                        controllerField.onChange(
                                                            e,
                                                        );
                                                        field.onValueChange?.(
                                                            e,
                                                        );
                                                    }}
                                                    className={`shadow border-[#e2e8f0] !h-[36px] focus-within:!border-[#2A5C42] focus-within:!ring-[0.8px] ${field.inputClass} ${field.disabled ? "cursor-not-allowed !bg-[#f8fafc] !text-black" : ""}`}
                                                />
                                            )}
                                        </FormControl>
                                        {field.helperText && (
                                            <div className="text-xs font-normal !text-[#64748B] !mt-[-0.2rem] !pb-2">
                                                {field.helperText}
                                            </div>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        );
                    })}
                </div>
                {children}
            </form>
        </Form>
    );
}) as <T extends FieldValues>(
    props: FormBuilderProps<T> & { ref?: React.Ref<FormBuilderRef<T>> },
) => React.ReactElement;
