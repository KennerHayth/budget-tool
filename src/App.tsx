import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/Login"
import Homepage from "./pages/Homepage"
import Register from "./pages/Register"
import { ProtectedRoute } from "./Auth/ProtectedRoute"
import { PublicRoute } from "./Auth/PublicRoute"
import { useAuth } from "./Auth/UseAuth"

function AppRoutes() {
    const { initialized } = useAuth();

    if (!initialized) {
        return null;
    }

    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path="/" element={<LoginPage />} />
                <Route path="/Register" element={<Register />} />
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route path="/Home" element={<Homepage />} />
            </Route>
        </Routes>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}