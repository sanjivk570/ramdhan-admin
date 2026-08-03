import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { ROUTES } from "@/app/router/route-paths";

interface Props {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
    const token = useAuthStore((state) => state.token);

    if (!token) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    return <>{children}</>;
}