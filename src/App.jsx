import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "@/features/auth/ProtectedRoute.jsx";
import AuthProvider from "@/store/AuthProvider.jsx";
import RouteFallback from "@/components/ui/RouteFallback.jsx";
import NavigationProgress from "@/components/ui/NavigationProgress.jsx";

import UserLayout from "@/layouts/UserLayout.jsx";
import GuestLayout from "@/layouts/GuestLayout.jsx";
import Feed from "@/features/feed/Feed.jsx";
import Login from "@/features/auth/Login.jsx";

const Home = lazy(() => import("@/pages/Home/Home.jsx"));
const Faq = lazy(() => import("@/pages/FAQ/Faq.jsx"));
const YourPassions = lazy(() => import("@/pages/YourPassions/YourPassions.jsx"));
const About = lazy(() => import("@/pages/About.jsx"));
const SendEmail = lazy(() => import("@/pages/SendEmail.jsx"));
const SignUp = lazy(() => import("@/features/auth/SignUp.jsx"));
const Profile = lazy(() => import("@/features/profile/Profile.jsx"));
const Posts = lazy(() => import("@/features/posts/Posts.jsx"));
const People = lazy(() => import("@/features/people/People.jsx"));
const Settings = lazy(() => import("@/features/settings/Settings.jsx"));
const Activity = lazy(() => import("@/features/notifications/Activity.jsx"));
const NotFound = lazy(() => import("@/pages/NotFound.jsx"));

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <NavigationProgress />
                <Suspense fallback={<RouteFallback fullScreen />}>
                    <Routes>
                        {/* Home owns its navbar (Hero). Do not wrap with GuestLayout. */}
                        <Route path="/" element={<Home />} />

                        <Route element={<GuestLayout />}>
                            <Route path="/faq" element={<Faq />} />
                            <Route path="/your-passions" element={<YourPassions />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/send-email" element={<SendEmail />} />
                            <Route path="/sign-up" element={<SignUp />} />
                            <Route path="/login" element={<Login />} />
                        </Route>

                        {/* Posts is also embedded inside Profile, so UserLayout lives
                            on the route — not inside Posts.jsx. */}
                        <Route element={<UserLayout />}>
                            <Route path="/profile/:username" element={<Profile />} />
                            <Route path="/people/:username?" element={<People />} />
                            <Route path="/posts/:username?" element={<Posts />} />
                        </Route>

                        {/* Gate these before UserLayout so logout does not leave
                            header/footer around an empty body while /login loads. */}
                        <Route element={<ProtectedRoute />}>
                            <Route element={<UserLayout />}>
                                <Route path="/feed" element={<Feed />} />
                                <Route path="/settings" element={<Settings />} />
                                <Route path="/activity" element={<Activity />} />
                            </Route>
                        </Route>

                        <Route element={<GuestLayout />}>
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
