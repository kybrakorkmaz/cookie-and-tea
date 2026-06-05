import { motion, AnimatePresence } from "framer-motion";
import {useEffect, useRef, useState} from "react";
import { IoIosArrowDown, IoIosArrowForward} from "react-icons/io";
import {useParams} from "react-router";
import apiClient from "../../../api/axios.js";

// Industry Standard: Map display labels to strict primitive values for the API payload
const timelineMapping = {
    "Last 30 days": "30",
    "Last 90 days": "90",
    "Yearly": "365"
};

const Earnings = ({earnings})=>{
    const {username} = useParams(); // Dynamically captures whatever is in the URL path
    const [time, setTime] = useState("Last 30 days");

    // Maintain a local live state initialized with the parent's first glance data
    const [liveTotal, setLiveTotal] = useState(earnings.total ?? 0);
    const [isEarningActive, setIsEarningActive] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(()=>{
        if(earnings.total !== undefined){
            setLiveTotal(earnings.total);
        }
    }, [earnings.total]);

    // 🛰️ 1. NEW AXIOS RESOURCE FETCHER (Handles Timeline Changes Only)
    useEffect(() => {
        if (!username) return;

        const fetchNewEarnedMoney = async () => {
            try {
                const daysParam = timelineMapping[time] || "30";
                const response = await apiClient.get(`/api/v1/profile/${username}/earnings`, {
                    params: { earningTimeline: daysParam }
                });
                setLiveTotal(response.data.total);
            } catch (err) {
                console.error("Failed syncing isolated timeline financial metrics:", err.message);
            }
        };

        if (time !== "Last 30 days") {
            fetchNewEarnedMoney();
        }
    }, [time, username]);


    // THE UI EVENT INTERCEPTOR (Handles Dropdown Closing & Escape Keys)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsEarningActive(false);
            }
        };

        // 👇 YOUR ESCAPE KEY CLOSER SITTING COMFORTABLY HERE
        const handleEscape = (event) => {
            if (event.key === "Escape") setIsEarningActive(false);
        };

        // 👇 WINDOW INTERACTION ROUTERS
        if (isEarningActive) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleEscape);
        }

        // 🧼 INDUSTRY STANDARD CLEANUP: Prevents dangerous memory leaks
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isEarningActive]); // Fires instantly when the dropdown state toggles!

    const handleSelectedTimeline = (selectedTimeline) => {
        setTime(selectedTimeline);
        setIsEarningActive(false);
    };

    return(
        <div className="bg-white p-10 rounded-2xl shadow-soft">
            <div className="flex items-center justify-center gap-6">
                <h3 className="font-header text-sh text-primary-dark">Earnings</h3>
                <div className="relative w-56" ref={dropdownRef}>
                    <button
                        aria-haspopup="true"
                        aria-expanded={isEarningActive}
                        onClick={() => setIsEarningActive(!isEarningActive)}
                        className="flex w-full justify-between items-center px-4 py-2 border border-gray-300 rounded-xl bg-white hover:border-primary-dark transition-all cursor-pointer shadow-sm"
                    >
                        <div className="overflow-hidden relative h-6 w-full text-left">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={time}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className="absolute font-paragraph text-sm block"
                                >
                                    {time}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                        {isEarningActive ? <IoIosArrowDown className="text-primary-dark" /> : <IoIosArrowForward className="text-primary-dark" />}
                    </button>

                    <AnimatePresence>
                        {isEarningActive && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 5, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden"
                            >
                                {Object.keys(timelineMapping).map((label, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSelectedTimeline(label)}
                                        className="w-full text-left px-5 py-3 hover:bg-cream/30 transition-colors font-paragraph text-sm border-b last:border-0 border-gray-100"
                                    >
                                        {label}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <div className="flex w-full justify-center items-center gap-2 mt-6">
                <span className="font-header text-h-2  font-bold">$</span>
                <span className="font-paragraph text-sh font-bold">{liveTotal}</span>
            </div>
        </div>
    )
}

export default Earnings;