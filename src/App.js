import React from 'react';
import { WeatherProvider } from './WeatherContext';
import CityList from './CityList';
import WeatherDetails from './WeatherDetails';
import './App.css';

function App() {
  return (
    <WeatherProvider>
      <div className="container">
        <header className="header">
          <h1>Weather Forecast</h1>
        </header>
        <CityList />
        <WeatherDetails />
      </div>
    </WeatherProvider>
  );
}

export default App;
