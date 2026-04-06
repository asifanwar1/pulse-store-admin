import { AlertCircle, RefreshCw } from "lucide-react";

import Button from "@/components/custom/CustomButton/CustomButton";

interface DataTableErrorProps {
    error: Error;
    onRetry: () => void;
}

const DataTableError = ({ error, onRetry }: DataTableErrorProps) => {
    return (
        <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertCircle className="h-12 w-12 text-destructive mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
                Something went wrong
            </h3>
            <p className="text-muted-foreground mb-4 max-w-md">
                {error.message ||
                    "An error occurred while loading the data. Please try again."}
            </p>
            <Button onClick={onRetry} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
            </Button>
        </div>
    );
};

export default DataTableError;
