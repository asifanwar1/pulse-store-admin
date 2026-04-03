import React, { Suspense, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// import { useStore } from "@/store";
import { APP_ROUTES } from "@/routes/appRoutes";
import Loading from "@/components/custom/Loading";

const AuthLayout: React.FC = () => {
    // const isAuthenticated = useStore((state) => state.isAuthenticated);
    const isAuthenticated = true;
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate(APP_ROUTES.DASHBOARD);
        }
    }, [isAuthenticated, navigate]);

    if (isAuthenticated) {
        return null;
    }

    return (
        <Suspense fallback={<Loading />}>
            <Outlet />
        </Suspense>
    );
};

export default AuthLayout;
