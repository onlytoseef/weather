import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getWeather } from "../redux/slices/weatherSlice";
import { CurrentWeatherProps } from "../types/types";
import detailIcon from "../constants/detailsIcon";

const { feelsLikeImg, humidityImg, windSpeedImg } = detailIcon;

export default function RightDetailComp({ lat, lon }: CurrentWeatherProps) {
  const dispatch = useAppDispatch();
  const weatherRes = useAppSelector((state) => state.weather);

  const kelvinToCelsius = (tempInKelvin: number) => tempInKelvin - 273.15;
  const windSpeedConversion = (windSpeed: number) => windSpeed * 3.6;

  useEffect(() => {
    const fetchWeather = async () => {
      if (!lat || !lon) return;
      await dispatch(getWeather({ lat, lon }));
    };
    fetchWeather();
  }, [lon, lat]);

  const main = weatherRes.data.main;
  const humidity: number | undefined = main?.humidity;
  let feelsLikeTemp: number | undefined = main?.feels_like;
  feelsLikeTemp =
    feelsLikeTemp !== undefined ? kelvinToCelsius(feelsLikeTemp) : undefined;

  const wind = weatherRes.data.wind;
  let windSpeed: number | undefined = wind?.speed;
  windSpeed =
    windSpeed !== undefined ? windSpeedConversion(windSpeed) : undefined;

  return (
    <div className="top-right border border-transparent h-[60vh] mt-2 xl:h-[60vh] md:ml-5 bg-[#16161F] rounded-[12px] p-4 sm:p-4">
      <div>
        <p className="text-[16px] text-[#7F7F98] p-4 hidden md:block font-normal">
          More Weather Details
        </p>
      </div>

      <ul className="flex flex-col p-4 border border-transparent sm:my-2 h-[88%]">
        <li className="flex h-[20%] md:h-[50px] my-5 items-center border-b-2 border-[#1c1c27]">
          <span className="w-[16px] mt-4 h-[32px] mr-3">
            <img className="" src={feelsLikeImg} alt="" />
          </span>
          <p className="ml-2 font-[700px] text-[16px] text-[#BFBFD4]">
            Feels like
          </p>{" "}
          <p className="ml-auto me-2 font-bold text-[16px] text-white">
            {feelsLikeTemp !== undefined
              ? `${Math.floor(feelsLikeTemp)}ºC`
              : "Loading..."}
          </p>
        </li>

        <li className="flex h-[20%] md:h-[50px] my-2 items-center border-b-2 border-[#1c1c27]">
          <span className="w-[16px] mt-4 h-[32px] mr-3">
            <img className="" src={windSpeedImg} alt="" />
          </span>
          <p className="ml-2 font-[700px] text-[16px] text-[#BFBFD4]">
            Wind Speed
          </p>{" "}
          <p className="ml-auto me-2 font-bold text-[16px] text-white">
            {windSpeed !== undefined
              ? `${windSpeed.toFixed(2)} KMP/H`
              : "Loading..."}
          </p>
        </li>
        <li className="flex h-[20%] my-2 items-center md:h-[50px] border-b-2 border-[#1c1c27]">
          <span className="w-[16px] mt-4 h-[32px] mr-3">
            <img className="" src={humidityImg} alt="" />
          </span>
          <p className="ml-2 align-center justify-center font-[700px] text-[16px] text-[#BFBFD4]">
            Air Humidity
          </p>{" "}
          <p className="ml-auto me-2 font-bold text-[16px] text-white">
            {humidity !== null ? `${humidity} %` : "Loading"}
          </p>
        </li>
      </ul>
    </div>
  );
}
