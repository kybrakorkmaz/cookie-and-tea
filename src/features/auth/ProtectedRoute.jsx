import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth.js";
import RouteFallback from "@/components/ui/RouteFallback.jsx";

const ProtectedRoute = ({ children }) => {
    const { user, sessionReady } = useAuth();

    if (!sessionReady) {
        return <RouteFallback fullScreen />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children ?? <Outlet />;
};

export default ProtectedRoute;
