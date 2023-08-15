import { useEffect, useState } from "react";
import { BsGithub } from "react-icons/bs";

const App = () => {
  const [weather, setWeather] = useState({
    // some dummy data from the api's documentation to introduce all the fields
    coord: {
      lon: 10.99,
      lat: 44.34,
    },
    weather: [
      {
        id: 501,
        main: "Rain",
        description: "moderate rain",
        icon: "10d",
      },
    ],
    base: "stations",
    main: {
      temp: 298.48,
      feels_like: 298.74,
      temp_min: 297.56,
      temp_max: 300.05,
      pressure: 1015,
      humidity: 64,
      sea_level: 1015,
      grnd_level: 933,
    },
    visibility: 10000,
    wind: {
      speed: 0.62,
      deg: 349,
      gust: 1.18,
    },
    rain: {
      "1h": 3.16,
    },
    clouds: {
      all: 100,
    },
    dt: 1661870592,
    sys: {
      type: 2,
      id: 2075663,
      country: "IT",
      sunrise: 1661834187,
      sunset: 1661882248,
    },
    timezone: 7200,
    id: 3163858,
    name: "Zocca",
    cod: 200,
  });
  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=51.50853&lon=-0.12574&appid=f47c8daefb3cc0c6c91903e89f44433a"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setWeather(data);
      });
  }, []);

  return (
    <div className="flex items-center justify-center bg-teal-100 w-full h-full absolute">
      <div className="flex absolute top-0 left-0 rounded-xl shadow-lg bg-teal-50 p-3 hover:bg-slate-300 cursor-pointer select-none">
        <a
          href="https://github.com/alexydens/weather-forecast.git"
          className="flex align-top gap-3"
          target="_blank"
          rel="noopener"
        >
          <BsGithub className="w-5 h-5" />
          <p>Code</p>
        </a>
      </div>
      <div className="flex flex-col gap-3 p-5 bg-teal-400 rounded-xl shadow-lg text-center">
        <div className="w-full p-3 rounded-xl shadow-lg bg-teal-200">
          <b className="text-xl">Weather in London, UK</b>
          <img
            src={
              "https://openweathermap.org/img/wn/" +
              weather.weather[0].icon +
              "@2x.png"
            }
            alt="icon"
            className="mx-auto"
          />
        </div>
        <div className="w-full p-3 rounded-xl shadow-lg bg-teal-200">
          <b>Today</b>
          <p>
            {weather.weather[0].main} ({weather.weather[0].description})
          </p>
          <p>
            {(weather.main.temp - 272.15).toPrecision(2)}
            °C
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
