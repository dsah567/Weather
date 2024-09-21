import React from 'react'
import axios from 'axios'
import { useState } from 'react';

export default function OtherLoc() {
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [locationFound,setLocationFound]=useState('')
  const [displayWeatherInfo, setDisplayWeatherInfo]=useState('')

  const [displayForcastInfo, setDisplayForcastInfo]=useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisplayForcastInfo("")
    setDisplayWeatherInfo("")
    setLocationFound("")
    if (!location) {
      setError('Please enter a location.');
      return;
    }
    setError('');
    
    try {
      const formattedLocation = encodeURIComponent(location.trim());
      const response = await axios.get(`https://us1.locationiq.com/v1/search?key=${import.meta.env.VITE_LOCATION_API_KEY}&q=${formattedLocation}&format=json`);
      console.log(response.data); // Handle the response data as needed
      setLocationFound(response.data)
    } catch (err) {
      console.error(err);
      setError('Failed to fetch location data.');
    }
  };

  const currentWeather = async (lat, lon) => {
    setDisplayForcastInfo("")
    setDisplayWeatherInfo("")
    setLocationFound("")
    try {
      let weatherCond=""
          let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`,
            headers: { }
          };
          
          await axios.request(config)
          .then((response) => {
            weatherCond=  response.data })
          .catch((error) => {
            console.log(error);
          });
      console.log(weatherCond); // Process the weather data as needed
      setDisplayWeatherInfo(weatherCond)
    } catch (error) {
      console.error('Error fetching current weather:', error);
    }
  }

  const forecastWeather = async (lat, lon) => {
    setDisplayForcastInfo("")
    setDisplayWeatherInfo("")
    setLocationFound("")
    try {
      let weatherCond=""
          let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`,
            headers: { }
          };
          
          await axios.request(config)
          .then((response) => {
            weatherCond=  response.data })
          .catch((error) => {
            console.log(error);
          });
      console.log(weatherCond); // Process the weather data as needed
      setDisplayForcastInfo(weatherCond)
    } catch (error) {
      console.error('Error fetching current weather:', error);
    }
  }
              
  return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 ">
        <div className="flex flex-col items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl mb-4 text-center">Location Search</h2>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          className="border border-gray-300 rounded p-2 w-full mb-4"
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-600"
        >
          Search
        </button>
      </form>
     
      {locationFound && locationFound.map((val) => (
        <div key={`${val.lat}-${val.lon}`} className="mb-4 p-4">
          <p>{`Location: ${val.display_name}`}</p>
          <div className="flex flex-col items-center justify-center ">
          <button
            onClick={() => currentWeather(val.lat, val.lon)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg mb-4 hover:bg-blue-700"
          >
            Show Current Weather
          </button>

          <button
            onClick={() => forecastWeather(val.lat, val.lon)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg mb-4 hover:bg-blue-700"
          >
            Show 5 Days Weather
          </button>
          </div>
        </div>
      ))}
      </div>
    

<br />
<br />
    {displayWeatherInfo &&
     
     <div className="bg-gray-100 p-4 rounded-lg shadow-lg max-w-md mx-auto">
         <h2 className="text-2xl font-bold mb-2">Weather in {displayWeatherInfo?.name}, {displayWeatherInfo?.sys.country}</h2>
        
         <img src={`https://openweathermap.org/img/wn/${displayWeatherInfo.weather[0].icon}@2x.png`}   alt="Weather Icon" className=" bg-indigo-500 w-24 h-24 mr-2"/>
         <div className="flex items-center mb-4">
           <p className="text-lg">{displayWeatherInfo.weather[0].main} - {displayWeatherInfo.weather[0].description}</p>
         </div>
         <div className="mb-4">
           <p><strong>Latitude:</strong> {displayWeatherInfo.coord.lat}</p>
           <p><strong>Longitude:</strong> {displayWeatherInfo.coord.lon}</p>
         </div>
         <div className="mb-4">
           <p><strong>Temperature:</strong> {displayWeatherInfo.main.temp}°C</p>
           <p><strong>Feels Like:</strong> {displayWeatherInfo.main.feels_like}°C</p>
           <p><strong>Min Temp:</strong> {displayWeatherInfo.main.temp_min}°C</p>
           <p><strong>Max Temp:</strong> {displayWeatherInfo.main.temp_max}°C</p>
           <p><strong>Pressure:</strong> {displayWeatherInfo.main.pressure} hPa</p>
           <p><strong>Humidity:</strong> {displayWeatherInfo.main.humidity}%</p>
         </div>
         <div className="mb-4">
           <p><strong>Wind Speed:</strong> {displayWeatherInfo.wind.speed} m/s</p>
         </div>
         <div className="mb-4">
           <p><strong>Sunrise:</strong> {new Date(displayWeatherInfo.sys.sunrise * 1000).toLocaleTimeString()}</p>
           <p><strong>Sunset:</strong> {new Date(displayWeatherInfo.sys.sunset * 1000).toLocaleTimeString()}</p>
         </div>
     </div>
          }

      {displayForcastInfo && (
    <div className="w-72 lg:w-full max-w-4xl overflow-x-auto mx-auto">
      <div className="flex space-x-4 p-4">
        {displayForcastInfo?.list?.map((value) => {
          return (
            <div className="bg-gray-100 p-4 rounded-lg shadow-lg w-72 min-w-max" key={value.dt}>
              <img
                src={`https://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`}
                alt="Weather Icon"
                className="bg-indigo-500 w-24 h-24 mb-4"
              />
              <div className="flex items-center mb-4">
                <p className="text-lg">{value.weather[0].main} - {value.weather[0].description}</p>
              </div>
              <div className="mb-4">
                <p><strong>Temperature:</strong> {value.main.temp}°C</p>
                <p><strong>Feels Like:</strong> {value.main.feels_like}°C</p>
                <p><strong>Min Temp:</strong> {value.main.temp_min}°C</p>
                <p><strong>Max Temp:</strong> {value.main.temp_max}°C</p>
                <p><strong>Pressure:</strong> {value.main.pressure} hPa</p>
                <p><strong>Humidity:</strong> {value.main.humidity}%</p>
              </div>
              <div className="mb-4">
                <p><strong>Wind Speed:</strong> {value.wind.speed} m/s</p>
              </div>
              <div className="mb-4">
                <p><strong>Date and Time</strong> {value.dt_txt} </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
      }

      </div>
  )
}