import Button from "@/components/custom/CustomButton/CustomButton";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import type { EmptyStateProps } from "./EmptyState.types";

const EmptyState = ({
    icon,
    title,
    description,
    actionLabel,
    actionIcon,
    className,
    showActionButton = false,
    onAction,
}: EmptyStateProps) => {
    return (
        <div
            className={`rounded-2xl border border-dashed border-pulse-cream-dark bg-pulse-cream-dark/20 shadow-dash-card ${className ?? ""}`.trim()}
        >
            <Empty className="border-0">
                <EmptyHeader>
                    <EmptyMedia variant="icon">{icon}</EmptyMedia>
                    <EmptyTitle>{title}</EmptyTitle>
                    <EmptyDescription>{description}</EmptyDescription>
                </EmptyHeader>

                <EmptyContent>
                    {showActionButton && (
                        <Button onClick={onAction} startIcon={actionIcon}>
                            {actionLabel}
                        </Button>
                    )}
                </EmptyContent>
            </Empty>
        </div>
    );
};

export default EmptyState;
