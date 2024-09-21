import axios from 'axios'
import { useState } from 'react';

function App() 
{
   const [location,setLocation]=useState("")
   const [weatherforcast,setWeatherforcast]=useState("")
   const [locationError, setLocationError] = useState('');

   const currentWeather =  () => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
         async (position) => {
          const { latitude, longitude } = position.coords;
          let weatherCond=""
          let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`,
            headers: { }
          };
          
          await axios.request(config)
          .then((response) => {
            weatherCond=  response.data })
          .catch((error) => {
            console.log(error);
          });
          setLocation(weatherCond)
          setLocationError('');
        },
        () => {
          setLocationError('Please turn on your location.');
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
    }
  };

  const forecast =  () => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
         async (position) => {
          const { latitude, longitude } = position.coords;
          let weatherCond=""
          let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`,
            headers: { }
          };
          
          await axios.request(config)
          .then((response) => {
            weatherCond=  response.data })
          .catch((error) => {
            console.log(error);
          });
          setWeatherforcast(weatherCond)
          setLocationError('');
        },
        () => {
          setLocationError('Please turn on your location.');
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
    }
  };

  


  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen p-4 ">
      <h1 className="text-3xl font-bold mb-4">Weather Information</h1>
      <button
        onClick={currentWeather}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg mb-4 hover:bg-blue-700"
      >
        Show Current Weather
      </button>
    
      {location &&
     
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-2">Weather in {location.name}, {location.sys.country}</h2>
           
            <img src={`https://openweathermap.org/img/wn/${location.weather[0].icon}@2x.png`}   alt="Weather Icon" className=" bg-indigo-500 w-24 h-24 mr-2"/>
            <div className="flex items-center mb-4">
              <p className="text-lg">{location.weather[0].main} - {location.weather[0].description}</p>
            </div>
            <div className="mb-4">
              <p><strong>Latitude:</strong> {location.coord.lat}</p>
              <p><strong>Longitude:</strong> {location.coord.lon}</p>
            </div>
            <div className="mb-4">
              <p><strong>Temperature:</strong> {location.main.temp}°C</p>
              <p><strong>Feels Like:</strong> {location.main.feels_like}°C</p>
              <p><strong>Min Temp:</strong> {location.main.temp_min}°C</p>
              <p><strong>Max Temp:</strong> {location.main.temp_max}°C</p>
              <p><strong>Pressure:</strong> {location.main.pressure} hPa</p>
              <p><strong>Humidity:</strong> {location.main.humidity}%</p>
            </div>
            <div className="mb-4">
              <p><strong>Wind Speed:</strong> {location.wind.speed} m/s</p>
            </div>
            <div className="mb-4">
              <p><strong>Sunrise:</strong> {new Date(location.sys.sunrise * 1000).toLocaleTimeString()}</p>
              <p><strong>Sunset:</strong> {new Date(location.sys.sunset * 1000).toLocaleTimeString()}</p>
            </div>
        </div>
             }

             <br />
             <br />
       <button
        onClick={forecast}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg mb-4 hover:bg-blue-700"
      >
        Show Next 5 days Weather
      </button>
      <div>
      {
  weatherforcast && (
    <div className="w-72 lg:w-full max-w-4xl overflow-x-auto mx-auto">
      <div className="flex space-x-4 p-4">
        {weatherforcast?.list?.map((value) => {
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
      {locationError && (
   <div className="text-lg text-red-600 mb-4">{locationError}</div>
 )}
 </div>
    </>
  )
}

export default App
