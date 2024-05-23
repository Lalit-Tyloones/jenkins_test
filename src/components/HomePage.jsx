import React, { useEffect, useState } from 'react'
import { ImLocation } from "react-icons/im";
import { FaTemperatureHigh, FaWind, FaTemperatureLow, FaRegHeart } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loader from '../assets/loading-7528_256.gif'
import circle_loader from '../assets/circle-1700_256.gif'




function HomePage({ emailaddress }) {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const fetchWeatherData = async (city) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://zark9lt5l3.execute-api.ap-south-1.amazonaws.com/dev/api/weather/weather-info?city=${city}`);
      setWeatherData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
    finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    fetchWeatherData('Indore');
  }, []);

  const handleWeatherSearch = async (city) => {
    fetchWeatherData(city);
  };

  const handleClick = async (city) => {
    const accessToken = sessionStorage.getItem('access_token');
    if (!accessToken) {
      toast.info('you need to login first');
      // setTimeout(() => {
      //   navigate('/signin');
      // }, 5000);
      return;
    }
    try {

      const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'City': weatherData.city,
      };
      const response = await axios.post('https://zark9lt5l3.execute-api.ap-south-1.amazonaws.com/dev/api/weather/add-to-favourite', null, {
        headers: headers
      });
      console.log(response.data);
      const message = response.data.message
      console.log(message)
      if (message == 'maximum number of cities reached') {
        toast.error(message);
      }
      else if (message == 'city already exists in favorites') {
        toast.info(message)
      }
      else {
        toast.success(message)
      }


    } catch (error) {
      console.error('Error fetching data:', error);
      toast('An error occurred while adding to favorites.');

    }
  };

  return (
    <>
      <Header onSearch={handleWeatherSearch} emailaddress={emailaddress} />
      {isLoading ? (
        <div className="w-full h-screen absolute z-10  bg-cyan-50 opacity-50 flex items-center justify-center">
        <img src={circle_loader} alt="Loading" className="w-24 h-24" />
    </div>
      ) : (
      weatherData && (
        <div className=" relative w-full h-[90vh] bg-center bg-cover bg-[url('https://static.vecteezy.com/system/resources/previews/021/703/501/non_2x/realistic-gradient-color-bokeh-glass-effect-blurshop-background-image-free-photo.JPG')]">

          <div className='felx items-start justify-center absolute right-0 mr-4 mt-4'>
            <button onClick={handleClick} className='text-4xl px-2 py-2 bg-gradient-to-r from-sky-200 to-indigo-300 rounded-full'><FaRegHeart /></button>
          </div>
          <div className="flex gap-2 items-center justify-center city w-full text-center p-5">
            <ImLocation className=' text-white text-4xl' />
            <h2 className=' text-white text-4xl'>{weatherData.city}</h2>
          </div>

          <div className="w-[700px] m-auto flex items-center justify-between mt-6">
            <div>
              <img className='w-[150px] h-[150px] object-cover object-center' src={`http://openweathermap.org/img/wn/${weatherData.icon}.png`} alt="weather icon" />
            </div>
            <div className='w-[200px] h-[150px] flex flex-col gap-3 items-center justify-center'>
              <div className='flex gap-4 items-center justify-center'>
                <h2 className='text-6xl text-white'>{weatherData.temperature}</h2>
                <FaTemperatureHigh className='text-4xl text-white' />
              </div>
              <div className=' flex w-full justify-between items-center px-10'>
                <h2 className=' text-white text-3xl'>{weatherData.min_temperature}&deg;</h2>
                <h2 className='text-white text-3xl'>{weatherData.max_temperature}&deg;</h2>
              </div>
            </div>
            <div className=' flex flex-col gap-5 items-center justify-center w-[150px] h-[150px]'>
              <div className='flex w-full px-2  justify-between'>
                <WiHumidity className='text-white text-3xl' />
                <h2 className=' text-white text-2xl'>{weatherData.humidity}%</h2>
              </div>
              <div className=' w-full justify-between flex  px-2'>
                <FaWind className=' text-white text-2xl' />
                <h2 className=' text-white text-2xl'>{weatherData.wind_speed} km/h</h2>
              </div>
              <div></div>

            </div>
          </div>
          <div className=' flex items-center justify-center mt-10'>
            <h2 className='text-white text-4xl'>{weatherData.description}</h2>
          </div>

          <div className='flex items-center justify-center'>
            <div className=' mt-9 w-[50%] h-[2px] bg-white'></div>
          </div>

          <div className='flex items-center justify-center gap-6 mt-10'>

            <div className='flex flex-col items-center gap-2 p-2 rounded-lg text-center w-[200px] h-[200px] bg-slate-400'>
              <h2 className='text-white text-2xl'>day 1</h2>
              <div className='w-[100px] h-[100px]'>
                <img className='w-full h-full' src={`https://openweathermap.org/img/wn/${weatherData.five_days_forcast[0]['weather'][0]['icon']}.png`} alt="" />
              </div>
              <h2 className='flex items-center gap-2 text-white text-xl'>{weatherData.five_days_forcast[0]['main']['temp']}<FaTemperatureLow /></h2>
            </div>
            <div className='flex flex-col items-center gap-2 p-2 rounded-lg text-center w-[200px] h-[200px] bg-slate-400'>
              <h2 className='text-white text-2xl'>day 2</h2>
              <div className='w-[100px] h-[100px]'>
                <img className='w-full h-full' src={`https://openweathermap.org/img/wn/${weatherData.five_days_forcast[1]['weather'][0]['icon']}.png`} alt="" />
              </div>
              <h2 className='flex items-center gap-2 text-white text-xl'>{weatherData.five_days_forcast[1]['main']['temp']}<FaTemperatureLow /></h2>
            </div>
            <div className='flex flex-col items-center gap-2 p-2 rounded-lg text-center w-[200px] h-[200px] bg-slate-400'>
              <h2 className='text-white text-2xl'>day 3</h2>
              <div className='w-[100px] h-[100px]'>
                <img className='w-full h-full' src={`https://openweathermap.org/img/wn/${weatherData.five_days_forcast[2]['weather'][0]['icon']}.png`} alt="" />
              </div>
              <h2 className='flex items-center gap-2 text-white text-xl'>{weatherData.five_days_forcast[2]['main']['temp']}<FaTemperatureLow /></h2>
            </div>
            <div className='flex flex-col items-center gap-2 p-2 rounded-lg text-center w-[200px] h-[200px] bg-slate-400'>
              <h2 className='text-white text-2xl'>day 4</h2>
              <div className='w-[100px] h-[100px]'>
                <img className='w-full h-full' src={`https://openweathermap.org/img/wn/${weatherData.five_days_forcast[3]['weather'][0]['icon']}.png`} alt="" />
              </div>
              <h2 className='flex items-center gap-2 text-white text-xl'>{weatherData.five_days_forcast[3]['main']['temp']}<FaTemperatureLow /></h2>
            </div>
            <div className='flex flex-col items-center gap-2 p-2 rounded-lg text-center w-[200px] h-[200px] bg-slate-400'>
              <h2 className='text-white text-2xl'>day 5</h2>
              <div className='w-[100px] h-[100px]'>
                <img className='w-full h-full' src={`https://openweathermap.org/img/wn/${weatherData.five_days_forcast[4]['weather'][0]['icon']}.png`} alt="" />
              </div>
              <h2 className='flex items-center gap-2 text-white text-xl'>{weatherData.five_days_forcast[4]['main']['temp']}<FaTemperatureLow /></h2>
            </div>
          </div>
        </div>
      )
      )}
      <ToastContainer />
    </>
  )
}

export default HomePage