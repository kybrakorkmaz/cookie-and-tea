import { Navigate, Outlet } from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    // If no user is logged in, redirect to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If logged in, automatically render whatever child route matches
    return children;
};

export default ProtectedRoute;