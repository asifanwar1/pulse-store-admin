import { createBrowserRouter, Navigate, type RouteObject } from "react-router-dom";

import ErrorBoundary from "@/components/shared/ErrorBoundary";
import Loading from "@/components/ui/Loading";

import { AuthLayout, PublicLayout } from "@/layouts";
import MainLayout from "@/layouts/MainLayout";

import ForgotPassword from "@/pages/Authentication/ForgotPassword";
import Login from "@/pages/Authentication/Login";
import UpdatePassword from "@/pages/Authentication/ResetPassword";
import VerificationCode from "@/pages/Authentication/VerificationCode/VerificationCode";

import Chats from "@/pages/ChatsManagement/ChatLayout/Chats";
import CustomerChats from "@/pages/ChatsManagement/Customer/CustomerChats";
import InstallerChats from "@/pages/ChatsManagement/Installer/InstallerChats";

import CustomerManagement from "@/pages/CustomerManagement";
import CustomerDetail from "@/pages/CustomerManagement/CustomerDetail";

import Dashboard from "@/pages/Dashboard/Dashboard";

import ReviewsManagement from "@/pages/ReviewsManagment";

import DealsManagement from "@/pages/DealsManagement";
import DealsManagementDetails from "@/pages/DealsManagement/DeailsManagementDetails";
import AddEditDeal from "@/pages/DealsManagement/ManageDeal/ManageDeal";

import InstallerManagement from "@/pages/InstallerManagement";
import InstallerDetail from "@/pages/InstallerManagement/InstallerDetail";

import NotFound from "@/pages/NotFound";

import {
    PortfolioManagement as PortfolioManagment,
    PortfolioDetails
} from "@/pages/PortfolioManagement";
import ManagePortfolio from "@/pages/PortfolioManagement/ManagePortfolio/ManagePortfolio";

import PresetManagment from "@/pages/PresetManagement";
import ManagePreset from "@/pages/PresetManagement/ManagePreset/ManagePreset";
import PresetDetails from "@/pages/PresetManagement/PresetDetails/PresetDetails";

import ProductManagment from "@/pages/ProductManagement";

import ProjectManagement from "@/pages/ProjectManagement";
import ManageProjectDetails from "@/pages/ProjectManagement/ManageProjectDetails/ManageProjectDetails";

import QuoteManagement from "@/pages/QuoteManagement";
import QuoteDetail from "@/pages/QuoteManagement/ManageQuoteDetails/ManageQuoteDetails";

import RenovationManagement from "@/pages/RenovationManagement";
import RenovationManagementDetails from "@/pages/RenovationManagement/ManageRenovationDetails/ManageRenovationDetails";

import ChangePassword from "@/pages/Settings/ChangePassword/ChangePassword";
import Setting from "@/pages/Settings/Settings";
import Profile from "@/pages/Settings/UserProfile/UserProfile";

import { PrivacyPolicy, DataDeletion, TermsAndConditions } from "@/pages/PublicPages";

import { APP_ROUTES } from "./appRoutes";

export const routes: RouteObject[] = [
    {
        element: <MainLayout />,
        errorElement: <ErrorBoundary />,
        children: [
            { index: true, element: <Navigate to={APP_ROUTES.DASHBOARD} replace /> },
            { path: APP_ROUTES.DASHBOARD, element: <Dashboard /> },
            { path: APP_ROUTES.CUSTOMER_MANAGEMENT, element: <CustomerManagement /> },
            { path: APP_ROUTES.PROJECT_MANAGEMENT, element: <ProjectManagement /> },
            { path: APP_ROUTES.PROJECT_MANAGEMENT_DETAILS, element: <ManageProjectDetails /> },
            { path: APP_ROUTES.RENOVATION_MANAGEMENT, element: <RenovationManagement /> },
            {
                path: APP_ROUTES.RENOVATION_MANAGEMENT_DETAILS,
                element: <RenovationManagementDetails />
            },
            { path: APP_ROUTES.CUSTOMER_MANAGEMENT_DETAILS, element: <CustomerDetail /> },
            { path: APP_ROUTES.REVIEWS_MANAGEMENT, element: <ReviewsManagement /> },
            { path: APP_ROUTES.INSTALLER_MANAGEMENT, element: <InstallerManagement /> },
            { path: APP_ROUTES.INSTALLER_MANAGEMENT_DETAILS, element: <InstallerDetail /> },
            { path: APP_ROUTES.PORTFOLIO_MANAGEMENT, element: <PortfolioManagment /> },
            { path: APP_ROUTES.PORTFOLIO_DETAILS, element: <PortfolioDetails /> },
            { path: APP_ROUTES.ADD_PORTFOLIO, element: <ManagePortfolio mode="add" /> },
            { path: APP_ROUTES.EDIT_PORTFOLIO, element: <ManagePortfolio mode="edit" /> },
            { path: APP_ROUTES.PRESET_MANAGEMENT, element: <PresetManagment /> },
            { path: APP_ROUTES.ADD_PRESET, element: <ManagePreset mode="add" /> },
            { path: APP_ROUTES.EDIT_PRESET, element: <ManagePreset mode="edit" /> },
            { path: APP_ROUTES.PRESET_DETAILS, element: <PresetDetails /> },
            { path: `${APP_ROUTES.PRODUCT_MANAGEMENT}/*`, element: <ProductManagment /> },
            { path: APP_ROUTES.QUOTE_MANAGEMENT, element: <QuoteManagement /> },
            { path: APP_ROUTES.QUOTE_MANAGEMENT_DETAILS, element: <QuoteDetail /> },
            { path: APP_ROUTES.PRESET_MANAGEMENT, element: <PresetManagment /> },
            {
                path: APP_ROUTES.DEALS_MANAGEMENT,
                element: <DealsManagement />
            },
            { path: APP_ROUTES.DEALS_MANAGEMENT_ADD, element: <AddEditDeal /> },
            { path: APP_ROUTES.DEALS_MANAGEMENT_EDIT, element: <AddEditDeal /> },
            { path: APP_ROUTES.DEALS_MANAGEMENT_DETAILS, element: <DealsManagementDetails /> },

            {
                path: APP_ROUTES.ACCOUNT,
                element: <Setting />,
                index: false,
                children: [
                    { path: APP_ROUTES.ACCOUNT_PROFILE, element: <Profile /> },
                    { path: APP_ROUTES.ACCOUNT_CHANGE_PASSWORD, element: <ChangePassword /> }
                ]
            },
            {
                path: APP_ROUTES.CHATS,
                element: <Chats />,
                children: [
                    { index: true, element: <Navigate to={APP_ROUTES.CUSTOMER_CHATS} replace /> },
                    { path: APP_ROUTES.CUSTOMER_CHATS, element: <CustomerChats /> },
                    { path: APP_ROUTES.INSTALLER_CHATS, element: <InstallerChats /> },
                    { path: APP_ROUTES.CUSTOMER_CHAT_CONVERSATION, element: <CustomerChats /> },
                    { path: APP_ROUTES.INSTALLER_CHAT_CONVERSATION, element: <InstallerChats /> }
                ]
            }
        ],
        loader: () => {
            return <Loading />;
        }
    },

    {
        element: <AuthLayout />,
        errorElement: <ErrorBoundary />,
        children: [
            { path: APP_ROUTES.LOGIN, element: <Login /> }, // /login
            { path: APP_ROUTES.FORGOT_PASSWORD, element: <ForgotPassword /> },
            { path: APP_ROUTES.OTP_VERIFICATION, element: <VerificationCode /> },
            { path: APP_ROUTES.RESET_PASSWORD, element: <UpdatePassword /> }
        ],
        loader: () => {
            return <Loading />;
        }
    },

    // Public pages (no auth required)
    {
        element: <PublicLayout />,
        errorElement: <ErrorBoundary />,
        children: [
            { path: APP_ROUTES.PRIVACY_POLICY, element: <PrivacyPolicy /> },
            { path: APP_ROUTES.DATA_DELETION, element: <DataDeletion /> },
            { path: APP_ROUTES.TERMS_AND_CONDITIONS, element: <TermsAndConditions /> }
        ],
        loader: () => {
            return <Loading />;
        }
    },

    // 404 route
    { path: "*", element: <NotFound /> }
];

export const router = createBrowserRouter(routes);

export default router;
