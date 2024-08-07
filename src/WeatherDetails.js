import React, { useContext, useState } from 'react';
import { WeatherContext } from './WeatherContext';
import HourlyForecast from './HourlyForecast';

const WeatherDetails = () => {
  const { weatherData, isLoading, error, selectedCity, fetchHourlyWeather, hourlyData } = useContext(WeatherContext);
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDayClick = async (day) => {
    setSelectedDay(day);
    await fetchHourlyWeather(selectedCity, day.date);
  };

  if (isLoading) {
    return <div className="weather-details">Loading...</div>;
  }

  if (error) {
    return <div className="weather-details">Error: {error}</div>;
  }

  if (!weatherData) {
    return <div className="weather-details">Loading weather data...</div>;
  }

  const dailyForecast = weatherData.forecast.forecastday.map((day, index) => {
    const dayOfWeek = new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' });
    const isCurrentDay = day.date === (selectedDay && selectedDay.date);

    return (
      <div key={index} className={`weather-day ${isCurrentDay ? 'current-day' : ''}`} onClick={() => handleDayClick(day)}>
        <h3>{dayOfWeek}</h3>
        <img src={day.day.condition.icon} alt="Weather Icon" />
        <p>{day.day.avgtemp_c}°C</p>
        <p>{day.day.condition.text}</p>
      </div>
    );
  });

  return (
    <div className="weather-details">
      <h2>{selectedCity} Weather Forecast</h2>
      <div className="weather-forecast">
        {dailyForecast}
      </div>
      {selectedDay && (
        <HourlyForecast selectedDay={selectedDay} hourlyData={hourlyData} />
      )}
    </div>
  );
};

export default WeatherDetails;
