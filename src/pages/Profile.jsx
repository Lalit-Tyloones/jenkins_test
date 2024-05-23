import React, { useState, useEffect } from 'react';
import { FaUser, FaHeart } from "react-icons/fa";
import { MdLocalPhone, MdEmail } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loader from '../assets/loading-7528_256.gif'
import circle_loader from '../assets/circle-1700_256.gif'


import axios from 'axios';

function Profile({ emailaddress }) {
    console.log('emailaddress->', emailaddress)
    const [image, setImage] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserInfo = async () => {
            setIsLoading(true);
            const accessToken = sessionStorage.getItem('access_token');
            if (!accessToken) {
                alert('you need to do signin or signup first')
                navigate('/signin')
                return;
            }
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };
            try {
                const api_response = await axios.get('http://127.0.0.1:9000/get-image/', {
                    headers: headers,
                });
                console.log(api_response.data);
                setUserInfo(api_response.data);
            } catch (error) {
                console.error(error);
            }
            finally {
                setIsLoading(false);
            }
        };

        fetchUserInfo();
    }, [userInfo?.data?.image_url]);

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };
    const handleRegistration = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const accessToken = sessionStorage.getItem('access_token');
        if (!accessToken) {
            console.error('Access token not found in session storage');
            return;
        }
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
        };
        try {
            const formData = new FormData();
            formData.append('image', image);
            const response = await axios.post('http://127.0.0.1:9000/upload/', formData, {
                headers: headers
            });
            console.log('Upload response:', response.data);
            setUserInfo(prevState => ({
                ...prevState,
                data: {
                    ...prevState.data,
                    image_url: response.data.url
                }
            }));
            toast.success('Profile picture is Uploaded');
        } catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false);
        }
    };
    return (
        <div className='flex w-full h-screen bg-cyan-200'>
            {isLoading && (
                <div className="w-full h-screen absolute z-10 bg-cyan-50 opacity-50 flex items-center justify-center">
                    <img src={circle_loader} alt="Loading" className="w-24 h-24" />
                </div>
            )}
            <div className='w-[30%] h-screen bg-cyan-500'>
                <div className='w-[300px] h-[300px] rounded-full bg-cyan-50 mx-auto mt-16 overflow-hidden'>
                    <img className='w-full h-full object-cover object-center' src={userInfo?.data.image_url} alt="" />
                </div>
                <form className='flex flex-col items-center justify-center'>
                    <div className='flex flex-col items-center mt-8 '>
                        <input type="file" onChange={handleImageChange} />
                        <button type="submit" onClick={handleRegistration} className='mt-4 px-4 py-2 bg-cyan-100 rounded-lg'>Upload Image</button>
                    </div>
                </form>
            </div>
            <div className='relative flex flex-col items-center justify-center w-[70%] h-screen bg-cyan-700'>
                <div className='absolute top-10 bg-cyan-100'>
                    <h2 className='capitalize text-2xl p-4'>user information</h2>
                </div>
                <div className='w-[80%] bg-cyan-200  p-4'>
                    <div className='flex gap-8 bg-cyan-400 p-2 '>
                        <div className='flex gap-2 items-center '>
                            <FaUser />
                            <h2 className='uppercase'>username -</h2>
                        </div>
                        <div><h2>{userInfo?.data['username']}</h2></div>
                    </div>
                    <div className=' flex gap-16 mt-2 bg-cyan-400 p-2 '>
                        <div className='flex gap-2 items-center '>
                            <MdEmail />
                            <h2 className='uppercase'>Email -</h2>
                        </div>
                        <div><h2>{userInfo?.data['email']}</h2></div>
                    </div>
                    <div className=' flex gap-11 mt-2 bg-cyan-400 p-2 '>
                        <div className='flex gap-2 items-center '>

                            <h2 className='uppercase'>First Name -</h2>
                        </div>
                        <div><h2>{userInfo?.data['first_name']}</h2></div>
                    </div>
                    <div className=' flex gap-11 mt-2 bg-cyan-400 p-2 '>
                        <div className='flex gap-2 items-center '>
                            <h2 className='uppercase'>Last Name -</h2>
                        </div>
                        <div><h2>{userInfo?.data['last_name']}</h2></div>
                    </div>
                    <div className=' flex gap-6 mt-2 bg-cyan-400 p-2 '>
                        <div className='flex gap-2 items-center '>
                            <MdLocalPhone />
                            <h2 className='uppercase'>Phone No -</h2>
                        </div>
                        <div ><h2>{userInfo?.data['phone_number']}</h2></div>
                    </div>
                    <div className=' flex flex-col gap-4 mt-2 bg-cyan-400 p-2 '>
                        <div className='flex gap-2 items-center '>
                            <FaHeart />
                            <h2 className='uppercase'>Favourite citys -</h2>
                        </div>
                        <div className='flex gap-2'>
                            {userInfo?.data['favorites_cities'].map((city, index) => (
                                <div key={index} className='bg-cyan-50 rounded-lg'>
                                    <h2 className='capitalize p-3'>{city}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Profile;
