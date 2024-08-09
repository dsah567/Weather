import axios from 'axios'

function App() {
  
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${import.meta.env.VITE_WEATHER_API_KEY}`,
    headers: { }
  };
  
  axios.request(config)
  .then((response) => {
    console.log(response.data.weather[0].main);
  })
  .catch((error) => {
    console.log(error);
  });

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  
  function success(pos) {
    const crd = pos.coords;
  
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  navigator.geolocation.getCurrentPosition(success, error, options);

  return (
    <>
    <h1 className="text-green-500 text-center font-extrabold underline">
      Weather Information
    </h1>
    </>
  )
}

export default App
