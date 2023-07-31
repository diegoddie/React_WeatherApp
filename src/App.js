import './App.css';
import CurrentWeather from './components/current-weather/current-weather';
import Search from './components/search/search';
import { OW_API_KEY, WEATHER_API_URL } from './api';
import { useState } from 'react'
import Forecast from './components/forecast/forecast';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const handleOnSearchChange = async(searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${OW_API_KEY}&units=metric`)

    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${OW_API_KEY}&units=metric`)

    try {
      const [currentWeatherResponse, forecastResponse] = await Promise.all([currentWeatherFetch, forecastFetch]);
      const currentWeatherData = await currentWeatherResponse.json();
      const forecastData = await forecastResponse.json();
      console.log(currentWeatherData)
      console.log(forecastData)
      setCurrentWeather({ city: searchData.label, ...currentWeatherData });
      setForecast({ city: searchData.label, ...forecastData });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
