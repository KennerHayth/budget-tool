import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export function ProtectedRoute() {
    const { user, loading, initialized } = useAuth();

    if (!initialized) {
        return null;
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}