import Home from "./pages/Home/Home.jsx";
import {BrowserRouter, Route, Routes} from "react-router";
import Faq from "./pages/FAQ/Faq.jsx";
import YourPassions from "./pages/YourPassions/YourPassions.jsx";
import About from "./pages/About.jsx";
import SendEmail from "./pages/SendEmail.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import ContentSocialEdit from "./pages/Profile/Content/Socials/ContentSocialEdit.jsx";

const App = ()=>{
  return(
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<Home/>}/>
              <Route path={"/faq"} element={<Faq/>}/>
              <Route path={"/your-passions"} element={<YourPassions/>}/>
              <Route path={"/about"} element={<About/>}/>
              <Route path={"/send-email"} element={<SendEmail/>}/>
              <Route path={"/sign-up"} element={<SignUp/>}/>
              <Route path={"/login"} element={<Login/>}/>
              <Route path={"/profile"} element={<Profile/>}/>

              {/*
              <Route path={"/profile/socials/edit"} element={<ContentSocialEdit/>}/>
              <Route path={"/feed"} element={<Feed/>}/>
          <Route path={"*"} element={<NotFound/>}/>*/}
          </Routes>
      </BrowserRouter>
  )
}

export default App;