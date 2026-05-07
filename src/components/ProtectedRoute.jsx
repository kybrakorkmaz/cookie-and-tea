import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
    // Basic mock authentication check
    // In a real app, this would check a token or auth state
    const isAuthenticated = true;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
