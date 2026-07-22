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
import ShipmentDetails from "@/pages/ShipmentManagement/ShipmentDetails/ShipmentDetails";
import ManageShipment from "@/pages/ShipmentManagement/ManageShipment/ManageShipment";
import OrderManagement from "@/pages/OrderManagement/OrderManagement";
import CustomerManagement from "@/pages/CustomerManagement/CustomerManagement";
import CustomerDetails from "@/pages/CustomerManagement/CustomerDetails/CustomerDetails";
import ProductManagement from "@/pages/ProductManagement/ProductManagement";
import ProductDetails from "@/pages/ProductManagement/ProductDetails/ProductDetails";
import ManageProduct from "@/pages/ProductManagement/ManageProduct/ManageProduct";
import OrderDetails from "@/pages/OrderManagement/OrderDetails/OrderDetails";
import ManageOrder from "@/pages/OrderManagement/ManageOrder/ManageOrder";
import CategoriesManagement from "@/pages/CategoriesManagement/CategoriesManagement";
import OffersManagement from "@/pages/OffersManagement/OffersManagement";
import ManageOffer from "@/pages/OffersManagement/ManageOffer/ManageOffer";
import RevenueManagement from "@/pages/RevenueManagement/RevenueManagment";
import RevenueDetails from "@/pages/RevenueManagement/RevenueDetails/RevenueDetails.";
import Profile from "@/pages/Profile/Profile";
import Notifications from "@/pages/Notifications/Notifications";
import ReviewsManagement from "@/pages/ReviewsManagement/ReviewsManagement";
import BannersManagement from "@/pages/BannersManagement/BannersManagement";
import ManageBanner from "@/pages/BannersManagement/ManageBanner/ManageBanner";
import AiAgentsManagement from "@/pages/AiAgentsManagement/AiAgentsManagement";
import SupportTickets from "@/pages/SupportTickets/SupportTickets";
import AiAgentChat from "@/pages/AiAgentChat/AiAgentChat";
import Settings from "@/pages/Settings/Settings";

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
            { path: APP_ROUTES.ORDERS_DETAILS, element: <OrderDetails /> },
            {
                path: APP_ROUTES.ORDERS_CREATE,
                element: <ManageOrder mode="add" />,
            },
            {
                path: APP_ROUTES.ORDERS_UPDATE,
                element: <ManageOrder mode="update" />,
            },
            { path: APP_ROUTES.SHIPMENTS, element: <ShipmentManagement /> },
            {
                path: APP_ROUTES.SHIPMENTS_DETAILS,
                element: <ShipmentDetails />,
            },
            {
                path: APP_ROUTES.SHIPMENTS_CREATE,
                element: <ManageShipment mode="add" />,
            },
            {
                path: APP_ROUTES.SHIPMENTS_UPDATE,
                element: <ManageShipment mode="update" />,
            },
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
            { path: APP_ROUTES.CATEGORIES, element: <CategoriesManagement /> },
            { path: APP_ROUTES.OFFERS, element: <OffersManagement /> },
            {
                path: APP_ROUTES.OFFERS_ADD,
                element: <ManageOffer mode="add" />,
            },
            {
                path: APP_ROUTES.OFFERS_UPDATE,
                element: <ManageOffer mode="update" />,
            },
            { path: APP_ROUTES.REVENUE, element: <RevenueManagement /> },
            { path: APP_ROUTES.REVENUE_DETAILS, element: <RevenueDetails /> },
            { path: APP_ROUTES.REVIEWS, element: <ReviewsManagement /> },
            { path: APP_ROUTES.BANNERS, element: <BannersManagement /> },
            {
                path: APP_ROUTES.BANNERS_ADD,
                element: <ManageBanner mode="add" />,
            },
            {
                path: APP_ROUTES.BANNERS_UPDATE,
                element: <ManageBanner mode="update" />,
            },
            { path: APP_ROUTES.AI_AGENTS, element: <AiAgentsManagement /> },
            {
                path: APP_ROUTES.AI_AGENT_TICKETS,
                element: <SupportTickets />,
            },
            { path: APP_ROUTES.ACCOUNT, element: <Profile /> },
            { path: APP_ROUTES.CHATS, element: <AiAgentChat /> },
            { path: APP_ROUTES.NOTIFICATIONS, element: <Notifications /> },
            { path: APP_ROUTES.SETTINGS, element: <Settings /> },
            // {
            //     path: APP_ROUTES.CHATS,
            //     element: <Chats />,
            //     children: [
            //         { index: true, element: <Navigate to={APP_ROUTES.CUSTOMER_CHATS} replace /> },
            //         { path: APP_ROUTES.CUSTOMER_CHATS, element: <CustomerChats /> },
            //         { path: APP_ROUTES.INSTALLER_CHATS, element: <VendorChats /> },
            //         { path: APP_ROUTES.CUSTOMER_CHAT_CONVERSATION, element: <CustomerChats /> },
            //         { path: APP_ROUTES.INSTALLER_CHAT_CONVERSATION, element: <VendorChats /> }
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
