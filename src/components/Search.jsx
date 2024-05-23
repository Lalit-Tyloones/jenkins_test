import axios from 'axios';
import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";

function Search({onSearch}) {
    const [city, setCity] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(city); // Pass city to parent component
    };


    return (
        <div className=" w-[350px] flex  items-center gap-2">
            <input  value={city} onChange={(e) => setCity(e.target.value)} className=" focus:outline-none border border-cyan-300 p-2 rounded-md " type="text" placeholder='Enter the City Name' />
            <button onClick={handleSearch} className='px-4 py-4 bg-gradient-to-r from-sky-200 to-indigo-300 text-xl rounded-full  text-slate-800' type='submit'><IoSearch /></button>
        </div>
    )
}

export default Search