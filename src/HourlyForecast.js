import React from 'react';

const HourlyForecast = ({ selectedDay, hourlyData }) => {
  const hourlyForecast = selectedDay && hourlyData && hourlyData.forecast && hourlyData.forecast.forecastday
    .find(forecastDay => forecastDay.date === selectedDay.date)?.hour.filter((hour, index) => index % 3 === 0).map((hour, index) => (
      <div key={index} className="hourly-forecast">
        <p>{new Date(hour.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
        <p>{hour.temp_c}°C</p>
        <img src={hour.condition.icon} alt="Weather Icon" />
        <p>{hour.condition.text}</p>
      </div>
    ));

  return (
    <div className="hourly-details">
      <h3>{new Date(selectedDay.date).toLocaleDateString('en-US', { weekday: 'long' })} Hourly Weather Forecast</h3>
      <div className="hourly-forecast-container">
        {hourlyForecast}
      </div>
    </div>
  );
};

export default HourlyForecast;
