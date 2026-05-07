import Navbar from "../../components/nav-footer/Navbar.jsx";
import FromYou from "./FromYou.jsx";
import Footer from "../../components/nav-footer/Footer.jsx";

const YourPassions=()=>{
    return(
        <div className="bg-cream min-h-screen">
            <Navbar textColor="text-primary-dark" bgColor="bg-primary-dark" searchBarColor="bg-white/65" />
            <FromYou/>
            <Footer/>
        </div>
    )
}

export default YourPassions;