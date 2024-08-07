import React, { createContext, useState, useEffect } from 'react';

const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState("İzmir,TR");

  const fetchWeather = async (city) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${city}&days=7`
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Veriyi kontrol et
      if (!data.current || typeof data.current.temp_c !== 'number') {
        throw new Error('Invalid temperature data received from API');
      }

      console.log('Current temperature:', data.current.temp_c);
      console.log('Full API response:', data);

      setWeatherData(data);
      setSelectedCity(city);
    } catch (error) {
      setError(`Error fetching weather data: ${error.message}`);
      console.error('Detailed error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchHourlyWeather = async (city, date) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${city}&dt=${date}`
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();

      // Saatlik veriyi kontrou
      if (!data.forecast || !data.forecast.forecastday || !data.forecast.forecastday[0].hour) {
        throw new Error('Invalid hourly data received from API');
      }

      console.log('Hourly forecast:', data.forecast.forecastday[0].hour);

      setHourlyData(data);
    } catch (error) {
      setError(`Error fetching hourly weather data: ${error.message}`);
      console.error('Detailed error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(selectedCity);
  }, [selectedCity]);

  return (
    <WeatherContext.Provider value={{ weatherData, hourlyData, isLoading, error, fetchWeather, fetchHourlyWeather, selectedCity, setSelectedCity }}>
      {children}
    </WeatherContext.Provider>
  );
};

export { WeatherContext, WeatherProvider };