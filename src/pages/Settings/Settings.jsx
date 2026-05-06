import {useState} from "react";
import Profile from "./Profile.jsx";
import Payment from "./Payment.jsx";
import UserNavbar from "../../components/UserNavbar.jsx";
import UserFooter from "../../components/UserFooter.jsx";

const Settings = () =>{
    const [selected, setSelected] = useState("profile");

    const activeTabStyle = "border-b-4 border-primary-dark text-primary-dark font-bold";
    const inactiveTabStyle = "text-gray-400 hover:text-gray-600";

    return(
        <div className="min-h-screen bg-cream/50">
            <UserNavbar />
            <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-8">
                <h3 className="font-header font-bold text-3xl text-primary-dark">Settings</h3>

                <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                    <button
                        onClick={()=>setSelected("profile")}
                        className={`flex-1 py-4 text-center transition-all font-header tracking-wide ${selected === "profile" ? activeTabStyle : inactiveTabStyle}`}
                    >
                        Profile
                    </button>
                    <button
                        onClick={()=>setSelected("payment")}
                        className={`flex-1 py-4 text-center transition-all font-header tracking-wide ${selected === "payment" ? activeTabStyle : inactiveTabStyle}`}
                    >
                        Payment
                    </button>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    {selected==="profile" ? <Profile/> : <Payment/>}
                </div>
            </div>
            <UserFooter />
        </div>
    )
}
export default Settings;