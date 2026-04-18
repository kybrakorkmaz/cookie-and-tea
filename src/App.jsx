import Home from "./pages/Home/Home.jsx";
import {BrowserRouter, Route, Routes} from "react-router";

const App = ()=>{
  return(
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<Home/>}/>
              {/*
          <Route path={"/faq"} element={<Faq/>}/>
          <Route path={"/your-passions"} element={<YourPassions/>}/>
          <Route path={"/login"} element={<Login/>}/>
          <Route path={"/sign-up"} element={<SignUp/>}/>
          <Route path={"*"} element={<NotFound/>}/>*/}
          </Routes>
      </BrowserRouter>
  )
}

export default App;