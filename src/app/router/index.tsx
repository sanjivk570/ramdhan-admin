import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

import { publicRoutes } from "./public.routes";
import { protectedRoutes } from "./protected.routes";

import ProtectedRoute from "@/components/common/ProtectedRoute";

export const router = createBrowserRouter([
    {
        element: <AuthLayout />,
        children: publicRoutes,
    },
    {
        element:  (
        <ProtectedRoute>
            <DashboardLayout />
        </ProtectedRoute>),
        children: protectedRoutes,
    },
]);