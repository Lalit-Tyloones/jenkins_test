import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp({setPass,setEmailaddress}) {

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://zark9lt5l3.execute-api.ap-south-1.amazonaws.com/dev/api/users/signup', {
                first_name,
                last_name,
                name,
                email,
                password,
                phone_number,
            });
            setPass(password)
            setEmailaddress(email)
            console.log(response.data);
            navigate('/verify-email');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='flex items-center justify-center w-full h-screen bg-cyan-300'>
            <div className='w-[400px] bg-cyan-700 py-4 px-6 rounded-3xl'>
                <h3 className='text-xl text-white text-center'>Sign Up</h3>
                <form>
                    <div className='flex flex-col gap-2 w-full mt-4'>
                        <label className='text-white text-lg' htmlFor="first_name">First Name</label>
                        <input value={first_name} onChange={(e) => setFirstName(e.target.value)} className='px-2 py-2 rounded-lg outline-none' type="text" />
                    </div>
                    <div className='flex flex-col gap-2 w-full mt-2'>
                        <label className='text-white text-lg' htmlFor="last_name">Last Name</label>
                        <input value={last_name} onChange={(e) => setLastName(e.target.value)} className='px-2 py-2 rounded-lg outline-none' type="text" />
                    </div>
                    <div className='flex flex-col gap-2 w-full mt-2'>
                        <label className='text-white text-lg' htmlFor="phonenumber">Phone Number</label>
                        <input value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} className='px-2 py-2 rounded-lg outline-none' type="text" />
                    </div>
                    <div className='flex flex-col gap-2 w-full mt-2'>
                        <label className='text-white text-lg' htmlFor="username">Username</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} className='px-2 py-2 rounded-lg outline-none' type="text" />
                    </div>
                    <div className='flex flex-col gap-2 w-full mt-2'>
                        <label className='text-white text-lg' htmlFor="email">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className='px-2 py-2 rounded-lg outline-none' type="email" />
                    </div>
                    <div className='flex flex-col gap-2 w-full mt-2'>
                        <label className='text-white text-lg' htmlFor="password">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className='px-2 py-2 rounded-lg outline-none' type="password" />
                    </div>

                    <div className='text-center flex items-center gap-10 mt-3 px-4'>
                        <h3 className='text-white'>Already have an account?</h3>
                        <Link className="text-white" to="/signin">Sign in</Link>
                    </div>

                    <div className='text-center mt-10'>
                        <button onClick={handleRegistration} className='px-6 py-4 bg-cyan-100 text-xl rounded-xl' type='submit'>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
