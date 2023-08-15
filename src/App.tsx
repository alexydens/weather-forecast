import { useEffect, useState } from "react";
import { BsGithub } from "react-icons/bs";

const App = () => {
  const [forecast, setForecast] = useState({
    // Some dummy data from the api documentation to introduce all fields
    cod: "200",
    message: 0,
    cnt: 40,
    list: [
      {
        dt: 1661871600,
        main: {
          temp: 296.76,
          feels_like: 296.98,
          temp_min: 296.76,
          temp_max: 297.87,
          pressure: 1015,
          sea_level: 1015,
          grnd_level: 933,
          humidity: 69,
          temp_kf: -1.11,
        },
        weather: [
          {
            id: 500,
            main: "Rain",
            description: "light rain",
            icon: "10d",
          },
        ],
        clouds: {
          all: 100,
        },
        wind: {
          speed: 0.62,
          deg: 349,
          gust: 1.18,
        },
        visibility: 10000,
        pop: 0.32,
        rain: {
          "3h": 0.26,
        },
        sys: {
          pod: "d",
        },
        dt_txt: "2022-08-30 15:00:00",
      },
      {
        dt: 1661882400,
        main: {
          temp: 295.45,
          feels_like: 295.59,
          temp_min: 292.84,
          temp_max: 295.45,
          pressure: 1015,
          sea_level: 1015,
          grnd_level: 931,
          humidity: 71,
          temp_kf: 2.61,
        },
        weather: [
          {
            id: 500,
            main: "Rain",
            description: "light rain",
            icon: "10n",
          },
        ],
        clouds: {
          all: 96,
        },
        wind: {
          speed: 1.97,
          deg: 157,
          gust: 3.39,
        },
        visibility: 10000,
        pop: 0.33,
        rain: {
          "3h": 0.57,
        },
        sys: {
          pod: "n",
        },
        dt_txt: "2022-08-30 18:00:00",
      },
    ],
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?lat=51.50853&lon=-0.12574&appid=f47c8daefb3cc0c6c91903e89f44433a"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setForecast(data);
      });
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full absolute bg-blue-100">
      <div className="flex absolute top-0 left-0 rounded-xl shadow-xl bg-blue-50 p-3 hover:bg-slate-300 cursor-pointer select-none">
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
      <div className="flex flex-col gap-3 p-5 bg-blue-400 rounded-xl shadow-xl text-center overflow-scroll h-3/4">
        <div className="w-full p-3 rounded-xl shadow-xl bg-blue-200 select-none">
          <b className="text-xl">Weather in London, UK</b>
          <img
            src={
              "https://openweathermap.org/img/wn/" +
              forecast.list[selectedIndex * 8].weather[0].icon +
              "@2x.png"
            }
            alt="icon"
            className="mx-auto"
          />
        </div>
        <div className="w-full p-3 rounded-xl shadow-xl bg-blue-200 select-none">
          <b>
            {selectedIndex == 0
              ? "Today"
              : forecast.list[selectedIndex * 8].dt_txt.slice(0, 10)}
          </b>
          <p>
            {forecast.list[selectedIndex * 8].weather[0].main} (
            {forecast.list[selectedIndex * 8].weather[0].description})
          </p>
          <p>
            {(forecast.list[selectedIndex * 8].main.temp - 272.15).toPrecision(
              2
            )}
            °C
          </p>
        </div>
        {forecast.list
          .filter((_, i) => i % 8 == 0)
          .map((item, index) => {
            return (
              <div
                className={
                  "w-full p-3 rounded-xl shadow-xl select-none" +
                  (selectedIndex == index ? " bg-blue-300" : " bg-blue-200")
                }
                onClick={() => setSelectedIndex(index)}
              >
                <b>{item.dt_txt.slice(0, 10)}</b>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default App;
