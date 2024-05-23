import React from 'react'
import { RiHome2Line } from "react-icons/ri";
import { IoMdLogIn } from "react-icons/io";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Search from './Search';
import { useState } from 'react';
import { useEffect } from 'react';
import { IoMdLogOut } from "react-icons/io";
import Logout from '../cognito_handler/CognitoLogout';


export const Header = ({ onSearch, emailaddress }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const checkLoggedIn = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      const accessToken = sessionStorage.getItem('access_token');
      setIsLoggedIn(!!accessToken);
    };

    checkLoggedIn(); 
    window.addEventListener('storage', checkLoggedIn);

    
    return () => {
      window.removeEventListener('storage', checkLoggedIn);
    };
  }, []);

  const handleLogout = (emailaddress) => {
    // console.log(emailaddress)
    Logout(emailaddress);
    setIsLoggedIn(false);
}
  
 


  return (
    <header className='w-full px-4 py-4 flex items-center justify-between bg-[url("https://static.vecteezy.com/system/resources/previews/021/703/501/non_2x/realistic-gradient-color-bokeh-glass-effect-blurshop-background-image-free-photo.JPG")] bg-cover'>
      <Search onSearch={onSearch} />
      <nav className='flex gap-3 items-center justify-between'>
        <Link className='flex items-center gap-2 bg-gradient-to-r from-sky-200 to-indigo-300 px-6 py-2 rounded-lg text-slate-800 text-xl' to="/home"><RiHome2Line />Home</Link>
        {isLoggedIn ? (
        <>
          <Link onClick={handleLogout} className='flex items-center gap-2 bg-gradient-to-r from-sky-200 to-indigo-300 px-6 py-2 rounded-lg text-slate-800  text-xl' to="/home"> <IoMdLogOut />Logout</Link>
          <Link className='flex items-center gap-2 bg-gradient-to-r from-sky-200 to-indigo-300 px-1 py-1 rounded-full text-slate-800  text-xl' to="/profile"> <FaUserCircle className='text-5xl ' /></Link>
        </>
        ) : (
        <>
          <Link className='flex items-center gap-2 bg-gradient-to-r from-sky-200 to-indigo-300 px-6 py-2 rounded-lg text-slate-800  text-xl' to="/signin"> <IoMdLogIn />Login</Link>
          <Link className='flex items-center gap-2 bg-gradient-to-r from-sky-200 to-indigo-300 px-6 py-2 rounded-lg text-slate-800  text-xl' to="/"> <SiGnuprivacyguard />SignUp</Link>
        </>
    )}


      </nav>
    </header>
  )
}
