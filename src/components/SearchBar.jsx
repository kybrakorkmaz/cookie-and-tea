import {useState} from "react";
import {index} from "../constants/index.js";

const SearchBar= ()=>{
    const [query, setQuery]= useState("");
    const [results, setResults]=useState([]);

    const handleChange=(e)=>{
        const value = e.target.value;
        setQuery(value);

        if(!value.trim()){
            setResults([]);
            return;
        }

        const filteredUsers = index.filter(user=>user.name.toLowerCase()
            .includes(value.toLowerCase()));

        setResults(filteredUsers);
    }
    const handleSelect = (name) => {
        setQuery(name);
        setResults([]);
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("search:", query);
    };
    return (
        <div className="navbar-item w-full lg:max-w-2xs">
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
                           className="block w-full p-3 ps-9 rounded-3xl border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                           placeholder="Search People's Work" required
                           value={query}
                           onChange={handleChange}
                    />
                    {/* dropdown results */}
                    {results.length > 0 && (
                        <ul className="absolute w-full bg-white border mt-2 rounded-lg shadow">
                            {results.map((user) => (
                                <li key={user.id}
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSelect(user.name)}
                                >
                                    {user.name}
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