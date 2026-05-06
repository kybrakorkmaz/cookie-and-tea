import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
    // Basic mock authentication check
    // In a real app, this would check a token or auth state
    const isAuthenticated = true; // For now, we assume authenticated as it's a mock project

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
