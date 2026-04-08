import {
    createBrowserRouter,
    Navigate,
    type RouteObject,
} from "react-router-dom";

import ErrorBoundary from "@/components/custom/ErrorBoundary";
import Loading from "@/components/custom/Loading";

import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";

import ForgotPassword from "@/pages/Authentication/ForgotPassword";
import Login from "@/pages/Authentication/Login";
import UpdatePassword from "@/pages/Authentication/ResetPassword";
import VerificationCode from "@/pages/Authentication/VerificationCode/VerificationCode";

import Dashboard from "@/pages/Dashboard/Dashboard";

import NotFound from "@/pages/NotFound/NotFound";

// import {
//     PrivacyPolicy,
//     DataDeletion,
//     TermsAndConditions,
// } from "@/pages/PublicPages";

import { APP_ROUTES } from "./appRoutes";
import ShipmentManagement from "@/pages/ShipmentManagement/ShipmentManagement";
import OrderManagement from "@/pages/OrderManagement/OrderManagement";
import CustomerManagement from "@/pages/CustomerManagement/CustomerManagement";
import CustomerDetails from "@/pages/CustomerManagement/CustomerDetails/CustomerDetails";
import ProductManagement from "@/pages/ProductManagement/ProductManagement";
import ProductDetails from "@/pages/ProductManagement/ProductDetails/ProductDetails";
import ManageProduct from "@/pages/ProductManagement/ManageProduct/ManageProduct";

export const routes: RouteObject[] = [
    {
        element: <MainLayout />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                index: true,
                element: <Navigate to={APP_ROUTES.DASHBOARD} replace />,
            },
            { path: APP_ROUTES.DASHBOARD, element: <Dashboard /> },
            { path: APP_ROUTES.CUSTOMERS, element: <CustomerManagement /> },
            {
                path: APP_ROUTES.CUSTOMERS_DETAILS,
                element: <CustomerDetails />,
            },
            { path: APP_ROUTES.ORDERS, element: <OrderManagement /> },
            { path: APP_ROUTES.SHIPMENTS, element: <ShipmentManagement /> },
            { path: APP_ROUTES.PRODUCTS, element: <ProductManagement /> },
            { path: APP_ROUTES.PRODUCTS_DETAILS, element: <ProductDetails /> },
            {
                path: APP_ROUTES.PRODUCTS_ADD,
                element: <ManageProduct mode="add" />,
            },
            {
                path: APP_ROUTES.PRODUCTS_UPDATE,
                element: <ManageProduct mode="update" />,
            },

            // {
            //     path: APP_ROUTES.CHATS,
            //     element: <Chats />,
            //     children: [
            //         { index: true, element: <Navigate to={APP_ROUTES.CUSTOMER_CHATS} replace /> },
            //         { path: APP_ROUTES.CUSTOMER_CHATS, element: <CustomerChats /> },
            //         { path: APP_ROUTES.INSTALLER_CHATS, element: <InstallerChats /> },
            //         { path: APP_ROUTES.CUSTOMER_CHAT_CONVERSATION, element: <CustomerChats /> },
            //         { path: APP_ROUTES.INSTALLER_CHAT_CONVERSATION, element: <InstallerChats /> }
            //     ]
            // }
        ],
        loader: () => {
            return <Loading />;
        },
    },

    {
        element: <AuthLayout />,
        errorElement: <ErrorBoundary />,
        children: [
            { path: APP_ROUTES.LOGIN, element: <Login /> },
            { path: APP_ROUTES.FORGOT_PASSWORD, element: <ForgotPassword /> },
            {
                path: APP_ROUTES.OTP_VERIFICATION,
                element: <VerificationCode />,
            },
            { path: APP_ROUTES.RESET_PASSWORD, element: <UpdatePassword /> },
        ],
        loader: () => {
            return <Loading />;
        },
    },

    // // Public pages (no auth required)
    // {
    //     element: <PublicLayout />,
    //     errorElement: <ErrorBoundary />,
    //     children: [
    //         { path: APP_ROUTES.PRIVACY_POLICY, element: <PrivacyPolicy /> },
    //         { path: APP_ROUTES.DATA_DELETION, element: <DataDeletion /> },
    //         { path: APP_ROUTES.TERMS_AND_CONDITIONS, element: <TermsAndConditions /> }
    //     ],
    //     loader: () => {
    //         return <Loading />;
    //     }
    // },

    // 404 route
    { path: "*", element: <NotFound /> },
];

export const router = createBrowserRouter(routes);

export default router;
