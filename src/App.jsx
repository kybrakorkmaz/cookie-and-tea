import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "@/features/auth/ProtectedRoute.jsx";
import AuthProvider from "@/store/AuthProvider.jsx";
import RouteFallback from "@/components/ui/RouteFallback.jsx";
import NavigationProgress from "@/components/ui/NavigationProgress.jsx";

const GuestLayout = lazy(() => import("@/layouts/GuestLayout.jsx"));
const Home = lazy(() => import("@/pages/Home/Home.jsx"));
const Faq = lazy(() => import("@/pages/FAQ/Faq.jsx"));
const YourPassions = lazy(() => import("@/pages/YourPassions/YourPassions.jsx"));
const About = lazy(() => import("@/pages/About.jsx"));
const SendEmail = lazy(() => import("@/pages/SendEmail.jsx"));
const SignUp = lazy(() => import("@/features/auth/SignUp.jsx"));
const Login = lazy(() => import("@/features/auth/Login.jsx"));
const Profile = lazy(() => import("@/pages/Profile/Profile.jsx"));
const Posts = lazy(() => import("@/pages/Posts/Posts.jsx"));
const People = lazy(() => import("@/pages/People/People.jsx"));
const Feed = lazy(() => import("@/pages/Feed/Feed.jsx"));
const Settings = lazy(() => import("@/pages/Settings/Settings.jsx"));
const Activity = lazy(() => import("@/pages/Activity.jsx"));
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

                        {/* Feature pages still own their chrome; UserLayout lands in the follow-up PR. */}
                        <Route path="/profile/:username" element={<Profile />} />
                        <Route path="/people" element={<People />} />
                        <Route path="/posts/:username?" element={<Posts />} />

                        <Route element={<ProtectedRoute />}>
                            <Route path="/feed" element={<Feed />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/activity" element={<Activity />} />
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
