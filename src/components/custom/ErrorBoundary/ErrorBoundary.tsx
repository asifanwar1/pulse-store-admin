import React from "react";
import {
    useNavigate,
    isRouteErrorResponse,
    useRouteError,
} from "react-router-dom";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import NotFound from "@/pages/NotFound/NotFound";
import logo from "@/assets/images/pulse-store-green.png";
import Image from "@/components/custom/Image";
import type { IErrorBoundaryProps } from "./ErrorBoundary.types";

const ErrorBoundary: React.FC<IErrorBoundaryProps> = ({ error: propError }) => {
    const navigate = useNavigate();
    const error = propError || useRouteError();

    const handleRetry = (): void => window.location.reload();

    const handleGoHome = () => navigate("/");

    if (isRouteErrorResponse(error)) {
        return <NotFound />;
    }

    if (error instanceof Error) {
        return (
            <div className="relative min-h-screen bg-pulse-cream flex items-center justify-center p-4 overflow-y-auto">
                <Image
                    src={logo}
                    alt="Pulse Store Logo"
                    className="absolute top-5 left-5 w-15 h-15"
                />
                <Card className="w-full max-w-md bg-pulse-cream-dark/50">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                            <AlertTriangle className="h-6 w-6 text-red-600" />
                        </div>
                        <CardTitle className="text-xl font-semibold text-pulse-green-dark">
                            Something went wrong
                        </CardTitle>
                        <CardDescription className="text-pulse-green">
                            We encountered an unexpected error. Please try again
                            or contact support if the problem persists.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {import.meta.env.DEV && (
                            <div className="bg-gray-100 p-3 rounded-md">
                                <p className="text-sm font-medium text-gray-700 mb-2">
                                    Error Details (Development):
                                </p>
                                <p className="text-xs text-red-600 font-mono break-words">
                                    {error.message}
                                </p>
                                {error.stack && (
                                    <details className="mt-2">
                                        <summary className="text-xs text-gray-600 cursor-pointer">
                                            Stack Trace
                                        </summary>
                                        <pre className="text-xs text-gray-600 mt-1 whitespace-pre-wrap overflow-x-auto max-h-40">
                                            {error.stack}
                                        </pre>
                                    </details>
                                )}
                            </div>
                        )}

                        <div className="flex flex-col gap-2">
                            <Button
                                onClick={handleRetry}
                                className="w-full"
                                variant="default"
                            >
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Try Again
                            </Button>

                            <Button
                                onClick={handleGoHome}
                                variant="outline"
                                className="w-full"
                            >
                                <Home className="mr-2 h-4 w-4" />
                                Go Home
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                        Something went wrong
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                        An unexpected error occurred. Please try again or
                        contact support.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <Button
                            onClick={handleRetry}
                            className="w-full"
                            variant="default"
                        >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Try Again
                        </Button>
                        <Button
                            onClick={handleGoHome}
                            variant="outline"
                            className="w-full"
                        >
                            <Home className="mr-2 h-4 w-4" />
                            Go Home
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ErrorBoundary;
