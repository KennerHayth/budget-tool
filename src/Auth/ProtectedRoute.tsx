import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./UseAuth";

export function ProtectedRoute() {
    const { user, initialized } = useAuth();

    if (!initialized) {
        return null;
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}