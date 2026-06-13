import Home from "./pages/Home/Home.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Faq from "./pages/FAQ/Faq.jsx";
import YourPassions from "./pages/YourPassions/YourPassions.jsx";
import About from "./pages/About.jsx";
import SendEmail from "./pages/SendEmail.jsx";
import SignUp from "./pages/Auth/SignUp.jsx";
import Login from "./pages/Auth/Login.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Posts from "./pages/Posts/Posts.jsx";
import People from "./pages/People/People.jsx";
import Feed from "./pages/Feed.jsx";
import Settings from  "./pages/Settings/Settings.jsx";
import Activity from "./pages/Activity.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";


const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
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
                    <Route path="/posts/:userId?" element={<Posts />} />

                    {/* Protected Routes wrapped individually with <ProtectedRoute> */}
                    <Route path={"/feed"} element={<ProtectedRoute><Feed/></ProtectedRoute>}/>
                    <Route path={"/settings"} element={<ProtectedRoute><Settings/></ProtectedRoute>}/>
                    <Route path={"/activity"} element={<ProtectedRoute><Activity/></ProtectedRoute>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App;