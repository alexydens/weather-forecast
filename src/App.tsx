import { useEffect, useState } from "react";
import { BsGithub } from "react-icons/bs";

const App = () => {
  const [forecast, setForecast] = useState<any>(0);
  const [currentCity, setCurrentCity] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    let city = prompt("What city do you want the forecast for?");

    if (city == "") {
      fetch(
        "https://api.openweathermap.org/data/2.5/forecast?lat=51.50853&lon=-0.12574&appid=f47c8daefb3cc0c6c91903e89f44433a"
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setForecast(data);
        });
      setCurrentCity("London");
    } else {
      fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
          city +
          "&appid=f47c8daefb3cc0c6c91903e89f44433a"
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setForecast(data);
        });
      setCurrentCity(city === null ? "" : city);
    }
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
      <div className="flex flex-col gap-3 p-5 bg-blue-400 rounded-xl shadow-xl text-center overflow-scroll h-3/4 min-w-[275px]">
        <div className="w-full p-3 rounded-xl shadow-xl bg-blue-200 select-none">
          {/* <b className="text-xl">Weather in London, UK</b> */}
          <b className="text-xl">Weather in {currentCity}</b>
          <img
            src={
              "https://openweathermap.org/img/wn/" +
              (forecast != 0
                ? forecast.list[selectedIndex * 8].weather[0].icon
                : "1d") +
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
            {forecast != 0
              ? forecast.list[selectedIndex * 8].weather[0].main
              : ""}
            (
            {forecast != 0
              ? forecast.list[selectedIndex * 8].weather[0].description
              : ""}
            )
          </p>
          <p>
            {forecast != 0
              ? (
                  forecast.list[selectedIndex * 8].main.temp - 272.15
                ).toPrecision(2)
              : " "}
            °C
          </p>
        </div>
        {forecast != 0
          ? forecast.list
              .filter((_: any, i: number) => i % 8 == 0)
              .map((item: any, index: number) => {
                return (
                  <div
                    className={
                      "w-full p-3 rounded-xl shadow-xl select-none" +
                      (selectedIndex == index ? " bg-blue-300" : " bg-blue-200")
                    }
                    onClick={() => setSelectedIndex(index)}
                    key={"Forecast: " + index}
                  >
                    <b>{item.dt_txt.slice(0, 10)}</b>
                  </div>
                );
              })
          : " "}
      </div>
    </div>
  );
};

export default App;
