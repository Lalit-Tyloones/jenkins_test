import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signIn from '../cognito_handler/CognitoSignIn';

const SignIn = ({setEmailaddress}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handlesignin = (e) =>{
        e.preventDefault()
        signIn(email, password)
        setEmailaddress(email)
        navigate("/home")
    }


    return (
        <div className=' flex items-center justify-center w-full h-screen bg-cyan-300'>
            <div className='w-[400px]  bg-cyan-700 py-4 px-6 rounded-3xl'>
                <h3 className='text-xl text-white text-center'>Signin</h3>
                <form>
                    <div className='flex flex-col gap-2 w-full mt-10 '>
                        <label className='text-white text-lg' htmlFor="username">email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className='px-2 py-2 rounded-lg outline-none' type="text" />
                    </div>
                    <div className='flex flex-col gap-2 w-full mt-8 '>
                        <label className='text-white text-lg' htmlFor="password">password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className='px-2 py-2 rounded-lg outline-none' type="password" />
                    </div>
                    <div className='text-center flex items-center gap-10 mt-3 px-4'>
                        <h3 className='text-white'>Don't have an account?</h3>
                        <Link className="text-white" to="/">SignUp</Link>
                    </div>
                    <div className=' text-center mt-10'>
                        <button onClick={handlesignin} className='px-6 py-4 bg-cyan-100 text-xl rounded-xl' type='button'>SignIn</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
