import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Favorites from './components/Favorites';
import ModeToggle from './components/ModeToggle';

const App = () => {
  const [weatherData, setWeatherData] = useState("");
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');

  const API_KEY = '7a86836ad89bb0d8327c4f9d0971d3de';
  useEffect(() => {
    if (city) {
      fetchWeather(city);
    }
  }, [city]);

  const fetchWeather = async (cityName) => {
    setError(null);
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
      setWeatherData(response?.data);
      localStorage.setItem('data', JSON.stringify(response?.data));
      // const { lat, lon } = response?.data?.coord;
      // const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast/lat=${lat}&lon=${lon}&cnt=2&appid=${API_KEY}&units=metric`);
      //   console.log("forecastResponse", forecastResponse.data)
      // foreCast(response?.data?.coord)s
    } catch (err) {
      setError('City not found or error fetching data.');
    }
  };
  // const foreCast = async (coord) => {
  //   const { lat, lon } = coord;
  //   const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=2&appid=${API_KEY}&units=metric`);
  // };

  const addFavorite = (city) => {
    if (favorites.length < 5 && !favorites.includes(city)) {
      const newFavorites = [...favorites, city];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };

  const removeFavorite = (city) => {
    const newFavorites = favorites.filter((fav) => fav !== city);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const toggleMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
      <h1>Weather App</h1>
      <ModeToggle toggleMode={toggleMode} isDarkMode={isDarkMode} />
      <SearchBar setCity={setCity} />
      {error && <p className="error">{error}</p>}
      <div style={{
        display: 'flex',
      }}>
        {weatherData && (
          <WeatherCard
            data={weatherData}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
            favorites={favorites}
          />
        )}
        <Favorites favorites={favorites} removeFavorite={removeFavorite} />
      </div>
    </div>
  );
};

export default App;
