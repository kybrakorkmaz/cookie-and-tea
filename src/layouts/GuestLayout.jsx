import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/layouts/nav/guest/Navbar.jsx";
import SiteFooter from "@/layouts/nav/SiteFooter.jsx";
import RouteFallback from "@/components/ui/RouteFallback.jsx";

const defaultNavbarProps = {
    textColor: "text-primary-dark",
    bgColor: "bg-primary-dark",
    searchBarColor: "bg-white/65",
};

const GuestLayout = ({
    children,
    className = "bg-cream min-h-screen flex flex-col",
    navbarProps = defaultNavbarProps,
}) => (
    <div className={className}>
        <Navbar {...navbarProps} />
        <div className="w-full grow">
            <Suspense fallback={<RouteFallback />}>
                {children ?? <Outlet />}
            </Suspense>
        </div>
        <SiteFooter variant="guest" />
    </div>
);

export default GuestLayout;
