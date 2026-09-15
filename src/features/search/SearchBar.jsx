import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import apiClient from "@/services/apiClient.js";

const DEBOUNCE_MS = 300;

const SearchBar = ({bgSearchColor}) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const containerRef = useRef(null);
    // Tracks the latest request so stale (out-of-order) responses are ignored
    const requestIdRef = useRef(0);

    // Debounced backend search — fires 300ms after the user stops typing
    useEffect(() => {
        const trimmed = query.trim();
        if (!trimmed) {
            setResults([]);
            setIsOpen(false);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setIsOpen(true);

        const timer = setTimeout(async () => {
            const requestId = ++requestIdRef.current;
            try {
                const response = await apiClient.get("/api/v1/search/users", {
                    params: {q: trimmed}
                });
                if (requestId !== requestIdRef.current) return; // stale response
                setResults(response.data?.users ?? []);
            } catch (err) {
                if (requestId !== requestIdRef.current) return;
                console.error("User search failed:", err.response?.data || err.message);
                setResults([]);
            } finally {
                if (requestId === requestIdRef.current) setIsLoading(false);
            }
        }, DEBOUNCE_MS);

        return () => clearTimeout(timer);
    }, [query]);

    // Close the dropdown when clicking anywhere outside the search bar
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSelect = (user) => {
        setQuery("");
        setResults([]);
        setIsOpen(false);
        navigate(`/profile/${user.username}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Escape") setIsOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Enter key: jump straight to the top match if there is one
        if (results.length > 0) handleSelect(results[0]);
    };

    return (
        <div className="navbar-item w-full lg:max-w-2xs" ref={containerRef}>
            <form onSubmit={handleSubmit}>
                <label htmlFor="search" className="block mb-2.5 text-sm font-medium text-heading sr-only ">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 inset-s-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                             height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2"
                                  d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="search"
                           className={`${bgSearchColor} block w-full p-3 ps-9 rounded-3xl border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body`}
                           placeholder="Search People's Work"
                           autoComplete="off"
                           value={query}
                           onChange={handleChange}
                           onKeyDown={handleKeyDown}
                           onFocus={() => { if (query.trim()) setIsOpen(true); }}
                    />
                    {/* dropdown results */}
                    {isOpen && query.trim() && (
                        <ul className="absolute w-full bg-white border mt-2 rounded-lg shadow z-50 overflow-hidden">
                            {isLoading && (
                                <li className="p-3 text-sm text-gray-400">Searching...</li>
                            )}
                            {!isLoading && results.length === 0 && (
                                <li className="p-3 text-sm text-gray-400">No people found for "{query.trim()}"</li>
                            )}
                            {!isLoading && results.map((user) => (
                                <li key={user.id}
                                    className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                                    onClick={() => handleSelect(user)}
                                >
                                    {user.profileImage ? (
                                        <img src={user.profileImage} alt=""
                                             className="w-8 h-8 rounded-full object-cover shrink-0"/>
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-primary-dark/15 text-primary-dark flex items-center justify-center font-bold text-sm shrink-0">
                                            {user.name?.charAt(0)?.toUpperCase()}
                                        </div>
                                    )}
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-sm font-medium text-heading truncate">{user.name}</span>
                                        <span className="text-xs text-gray-400 truncate">@{user.username}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </form>
        </div>
    )
}
export default SearchBar;
