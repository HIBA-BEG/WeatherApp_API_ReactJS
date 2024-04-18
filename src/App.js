import "./App.css";
import { useState } from "react";

const api = {
  key: "6b1cffa2b8844cd09b3122153241704",
  base: "https://api.weatherapi.com/v1/forecast.json",
};
function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState("");

  const searchPressed = () => {
    fetch(
      `${api.base}?q=${search}&days=7&dt=2024-04-17&hour=10&alerts=yes&aqi=yes&key=${api.key}`
    )
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };

  const toDateFunction = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const WeekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };

  return (
    <div className="App">
      <div class="container">
        {/* search box */}
        <div>
          <input
            type="text"
            placeholder="Enter City or Town..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
        </div>
        <div class="weather-widget">
          <div class="weather-info">
            {weather && weather.current && (
              <>
                {/* temperature */}
                {weather.current.temp_c && (
                  <span class="temperature">{weather.current.temp_c}°c</span>
                )}

                <div>
                  {/* location */}
                  <span class="location">
                    {weather.location.name}, {weather.location.country}
                  </span>

                  {/* Condition (Sunny) */}
                  {weather.current.condition && (
                    <div class="weather-icon">
                      <p>{weather.current.condition.text}</p>
                      <img
                        src={weather.current.condition.icon}
                        alt={weather.current.condition.text}
                      />
                      
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        {/* {weather && weather.current && (
          <>
            <div className="date">
              <span>{toDateFunction()}</span>
            </div>
            <p>
              {weather.location.name}, {weather.location.country}
            </p>

            {weather.current.temp_c && <p>{weather.current.temp_c}°c</p>}

            {weather.current.condition && (
              <div>
                <p>{weather.current.condition.text}</p>
                <img
                  src={weather.current.condition.icon}
                  alt={weather.current.condition.text}
                />
                <p>Humidity: {weather.current.humidity}</p>
                <p>Wind speed: {weather.current.wind_mph} mph</p>
              </div>
            )}
          </>
        )} */}

        <div class="forecast-widget">
          <div class="forecast-item">
            <span class="date">{toDateFunction()}</span>
            {weather.current.condition && (
              <div>
                <span class="humidity">
                  Humidity: {weather.current.humidity}
                </span>
                <span class="temperature-range">
                  {" "}
                  Wind speed: {weather.current.wind_mph} mph
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <header className="App-header"><p>Sunny </p></header> */}
    </div>
  );
}

export default App;
