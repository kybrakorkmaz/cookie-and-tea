import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "@/layouts/nav/user/UserNavbar.jsx";
import SiteFooter from "@/layouts/nav/SiteFooter.jsx";

const UserLayout = ({ children, className = "min-h-screen bg-cream/50" }) => (
    <div className={className}>
        <UserNavbar />
        <div className="w-full">
            <Suspense fallback={null}>
                {children ?? <Outlet />}
            </Suspense>
        </div>
        <SiteFooter variant="user" />
    </div>
);

export default UserLayout;
