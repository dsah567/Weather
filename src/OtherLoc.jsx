import React from 'react'
import axios from 'axios'
import { useState } from 'react';

export default function OtherLoc() {
    const [specificLocation, setspecificLocation] = useState(null);
    const [Latitude, setLat] = useState('');
    const [Longititude, setLong] = useState('');

    const weatherOfLocation = async () => {
        let weatherCond=""
              let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `https://api.openweathermap.org/data/2.5/weather?lat=${Latitude}&lon=${Longititude}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`,
                headers: { }
              };
              
              await axios.request(config)
              .then((response) => {
                console.log(response);
                console.log(response.data);
                weatherCond = `${response.data.weather[0].main} -> ${response.data.weather[0].description}`;
              })
              .catch((error) => {
                console.log(error);
              });
    
              setspecificLocation(`Latitude: ${Latitude}, Longitude: ${Longititude} and weather is ${weatherCond}`);
      };
  return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        
    <div className="flex flex-col items-center space-y-4 w-full max-w-sm">
        <input
          type="text"
          placeholder="Latitude"
          value={Latitude}
          onChange={(e) => setLat(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="text"
          placeholder="Longititude"
          value={Longititude}
          onChange={(e) => setLong(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          onClick={weatherOfLocation}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Search And Show Weather Info
        </button>

        {specificLocation && (
        <div className="text-lg text-green-700 mb-4">Location: {specificLocation}
        </div>
      )}
        </div>
        <h2 className='text-red-600'>some location may not have avaliable service or change in city name may occur</h2>
    </div>
    
  )
}