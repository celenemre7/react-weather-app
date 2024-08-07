import React, { useContext } from 'react';
import { WeatherContext } from './WeatherContext';

const cities = [
  "İstanbul", "Ankara", "İzmir",
  // Diğer iller...
];

const CityList = () => {
  const { setSelectedCity } = useContext(WeatherContext);

  return (
    <div className="city-list">
      <label htmlFor="city-select">Select City</label>
      <select id="city-select" onChange={(event) => setSelectedCity(event.target.value)}>
        {cities.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
    </div>
  );
};

export default CityList;
