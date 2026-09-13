import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AuthProvider from "./context/AuthContext.jsx";

// Route-level code splitting — pages load on demand instead of one eager
// 1.1MB bundle (Vite chunk-size warning). Heavy deps (MUI, GSAP, framer-motion)
// now ship only with the routes that actually use them.
const Home = lazy(() => import("./pages/Home/Home.jsx"));
const Faq = lazy(() => import("./pages/FAQ/Faq.jsx"));
const YourPassions = lazy(() => import("./pages/YourPassions/YourPassions.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const SendEmail = lazy(() => import("./pages/SendEmail.jsx"));
const SignUp = lazy(() => import("./pages/Auth/SignUp.jsx"));
const Login = lazy(() => import("./pages/Auth/Login.jsx"));
const Profile = lazy(() => import("./pages/Profile/Profile.jsx"));
const Posts = lazy(() => import("./pages/Posts/Posts.jsx"));
const People = lazy(() => import("./pages/People/People.jsx"));
const Feed = lazy(() => import("./pages/Feed/Feed.jsx"));
const Settings = lazy(() => import("./pages/Settings/Settings.jsx"));
const Activity = lazy(() => import("./pages/Activity.jsx"));

const RouteFallback = () => (
    <div className="min-h-screen flex items-center justify-center bg-cream">
        <div
            className="w-10 h-10 border-4 border-primary-dark border-t-transparent rounded-full animate-spin"
            role="status"
            aria-label="Loading page"
        />
    </div>
);

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Suspense fallback={<RouteFallback />}>
                    <Routes>
                        {/* Public Routes */}
                        <Route path={"/"} element={<Home/>}/>
                        <Route path={"/faq"} element={<Faq/>}/>
                        <Route path={"/your-passions"} element={<YourPassions/>}/>
                        <Route path={"/about"} element={<About/>}/>
                        <Route path={"/send-email"} element={<SendEmail/>}/>
                        <Route path={"/sign-up"} element={<SignUp/>}/>
                        <Route path={"/login"} element={<Login/>}/>

                        {/* User & Profile Routes (Publicly accessible view-only or semi-protected) */}
                        <Route path="/profile/:username" element={<Profile />} />
                        <Route path="/people" element={<People />} />
                        <Route path="/posts/:username?" element={<Posts />} />

                        {/* Protected Routes wrapped individually with <ProtectedRoute> */}
                        <Route path={"/feed"} element={<ProtectedRoute><Feed/></ProtectedRoute>}/>
                        <Route path={"/settings"} element={<ProtectedRoute><Settings/></ProtectedRoute>}/>
                        <Route path={"/activity"} element={<ProtectedRoute><Activity/></ProtectedRoute>}/>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App;
