import Home from "./pages/Home/Home.jsx";
import {BrowserRouter, Route, Routes} from "react-router";

const App = ()=>{
  return(
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<Home/>}/>
          </Routes>
      </BrowserRouter>

  )
}

export default App;