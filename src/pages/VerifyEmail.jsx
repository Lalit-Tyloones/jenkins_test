import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import signIn from '../cognito_handler/CognitoSignIn';

function VerifyEmail({ pass, emailaddress }) {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleVerification = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://zark9lt5l3.execute-api.ap-south-1.amazonaws.com/dev/api/users/verify-email', {
        verification_code: verificationCode,
      }, {
        headers: {
          'email': emailaddress
        }
      });
      console.log(response.data);
      signIn(emailaddress, pass)
      navigate('/home');
    }
    catch (error) {
      setError('Failed to verify. Please try again.');
      console.log(error)
    }

  };

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-cyan-200'>
      <div className=' flex flex-col items-center gap-5 p-8 w-[400px] h-[300px] rounded-lg bg-cyan-500'>
        <h2 className='text-white text-xl'>Verify Email</h2>
        <p className='text-center capitalize text-white text-xl'>Enter the verification code sent to {emailaddress}</p>
        <form className='flex flex-col gap-4' onSubmit={handleVerification}>
          <input
            className='px-3 py-2 rounded-md outline-none'
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Verification Code"
            required
          />
          <button className='py-2 rounded-full bg-cyan-300' type="submit">Verify</button>
        </form>
      </div>
    </div>
  );
}

export default VerifyEmail
