import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
    // Check for a real auth state (e.g., token in localStorage)
    const isAuthenticated = !!localStorage.getItem("token");

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
