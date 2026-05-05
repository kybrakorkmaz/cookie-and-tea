import Home from "./pages/Home/Home.jsx";
import {BrowserRouter, Route, Routes} from "react-router";
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
const App = ()=>{
  return(
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
              {/* User & Profile Routes */}
              <Route path={"/profile/:userId?"} element={<Profile/>}/>
              <Route path={"/people"} element={<People/>}/>
              <Route path={"/posts/:userId?"} element={<Posts/>}/>
              <Route path={"/feed"} element={<Feed/>}/>
              {/*

          <Route path={"*"} element={<NotFound/>}/>*/}
          </Routes>
      </BrowserRouter>
  )
}

export default App;