import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider"; // adjust path if needed

export function PublicRoute() {
    const { user, initialized } = useAuth();

    if (!initialized) {
        return null;
    }

    if (user) {
        return <Navigate to="/home" replace />;  // redirect logged-in users away
    }

    return <Outlet />;
}