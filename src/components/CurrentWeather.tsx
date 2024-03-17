import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import backgrounds from "../constants/imageConstants";
import Icons from "../constants/iconsConstant";
import { getWeather } from "../redux/slices/weatherSlice";
import { CurrentWeatherProps } from "../types/types";

export default function CurrentWeather({ lat, lon }: CurrentWeatherProps) {
  const dispatch = useAppDispatch();
  const weatherRes = useAppSelector((state) => state.weather);

  const {
    clearDay,
    clearNight,
    fewCloudsDay,
    fewCloudsNight,
    cloudyDayBackground,
    cloudyNightBackground,
    rainDayBackground,
    rainNightBackground,
    stormDayBackground,
    stormNightBackground,
    snowDayBackground,
    snowNightBackground,
  } = backgrounds;

  const {
    clearDayIcon,
    clearNightIcon,
    fewCloudyDayIcon,
    fewCloudyNightIcon,
    cloudyDayIcon,
    cloudyNightIcon,
    rainDayIcon,
    rainNightIcon,
    snowNightIcon,
    snowDayIcon,
    stormDayIcon,
    stormNightIcon,
    mistDayIcon,
    mistNightIcon,
  } = Icons;

  const kelvinToCelsius = (tempInKelvin: number) => tempInKelvin - 273.15;

  const getFormattedDate = () => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const today = new Date();
    const day = today.getDate();
    const month = months[today.getMonth()];
    const year = today.getFullYear();
    const formattedDate = `${day}${month},${year}`;
    return formattedDate;
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    const fetchWeather = async () => {
      if (!lat || !lon) return;
      await dispatch(getWeather({ lat, lon }));
    };
    fetchWeather();
  }, [lon, lat]);

  const weatherData = weatherRes.data;
  if (!weatherData) return null;

  const main = weatherData.main;
  const city = weatherData.name;
  const country = weatherData.sys?.country || "Unknown";
  const weatherArray = weatherData.weather;
  const weather = weatherArray?.[0];
  const getIcon = weather?.icon;

  const styles = {
    backgroundImage:
      getIcon === "01d"
        ? `url(${clearDay})`
        : getIcon === "01n"
        ? `url(${clearNight})`
        : getIcon === "02d"
        ? `url(${fewCloudsDay})`
        : getIcon === "02n"
        ? `url(${fewCloudsNight})`
        : getIcon === "03d"
        ? `url(${cloudyDayBackground})`
        : getIcon === "03n"
        ? `url(${cloudyNightBackground})`
        : getIcon === "04d"
        ? `url(${fewCloudsDay})`
        : getIcon === "04n"
        ? `url(${fewCloudsNight})`
        : getIcon === "09d"
        ? `url(${rainDayBackground})`
        : getIcon === "09n"
        ? `url(${rainNightBackground})`
        : getIcon === "10d"
        ? `url(${rainDayBackground})`
        : getIcon === "10n"
        ? `url(${rainNightBackground})`
        : getIcon === "11d"
        ? `url(${stormDayBackground})`
        : getIcon === "11n"
        ? `url(${stormNightBackground})`
        : getIcon === "13d"
        ? `url(${snowDayBackground})`
        : getIcon === "13n"
        ? `url(${snowNightBackground})`
        : getIcon === "50d"
        ? `url(${stormDayBackground})`
        : getIcon === "50n"
        ? `url(${stormNightBackground})`
        : "initial",
    height: "90%",
    backgroundSize: "cover",
    marginTop: "12px",
  };

  return (
    <div
      className="bottom-left border border-transparent flex-shrink-0 relative w-full  rounded-[8px] flex flex-col items-center justify-between"
      style={styles}
    >
      <div className="top-side-image border border-transparent w-[90%] h-[10%]  mt-1 sm:mt-3 sm:mb-2 mb-6  flex justify-between ">
        <div className="top-left-side-image">
          <div className="place-name">
            <p className=" text-white text-[20px] ">
              {city},{country}
            </p>
          </div>
          <div className="date-in-image">
            <p className="text-white ">{getFormattedDate()}</p>
          </div>
        </div>
        <div className="top-right-side-image">
          <div className="time">
            <p className="text-white font-bold leading-7">{getCurrentTime()}</p>
          </div>
        </div>
      </div>
      <div className="bottom-side-image  border border-transparent w-[100%]  lg:h-[40%] flex justify-around">
        <div className="bottom-left-side-image flex flex-col justify-end mb-3 sm:mb-6  border border-transparent ml-4 w-[50%] lg:[30%]">
          <div className="text-white text-[48px] sm:text-[32px] lg:text-[96px] font-bold leading-tight">
            {main && `${Math.floor(kelvinToCelsius(main.temp))}ºC`}
          </div>
          <div>
            <div className="text-white font-bold text-[20px]  ">
              {main && `${Math.floor(kelvinToCelsius(main.temp_max))}ºC`} /{" "}
              {main && `${Math.floor(kelvinToCelsius(main.temp_min))}ºC`} .{" "}
              <span className="font-normal text-[20px]">
                {weather?.description}
              </span>
            </div>
          </div>
        </div>
        <div className="bottom-right-side-image  border-transparent flex  w-[50%] md:w-[70%] ">
          {getIcon === "01d" && (
            <img
              className="ml-auto mr-2 sm:mr-1  mt-auto mb-3 sm:mb-2 w-[80%] h-[80%]  md:w-[60%] md:h-[60%]  lg:w-[100%] lg:h-[100%] object-cover cursor-pointer"
              src={clearDayIcon}
              alt="clearDaySun"
            />
          )}
          {getIcon === "01n" && (
            <img
              className="ml-auto mr-2 sm:mr-1  mt-auto mb-3 sm:mb-2 w-[80%] h-[80%]  md:w-[60%] md:h-[60%]  lg:w-[100%] lg:h-[100%] object-cover cursor-pointer"
              src={clearNightIcon}
              alt="clearNightMoon"
            />
          )}
          {getIcon === "02d" && (
            <img
              className="ml-auto mr-2 sm:mr-1  mt-auto mb-3 sm:mb-2 w-[80%] h-[80%]  md:w-[60%] md:h-[60%]  lg:w-[100%] lg:h-[100%] object-cover cursor-pointer"
              src={fewCloudyDayIcon}
              alt="fewCloudyDay"
            />
          )}
          {getIcon === "02n" && (
            <img
              className="ml-auto mr-2 sm:mr-1  mt-auto mb-3 sm:mb-2 w-[80%] h-[80%]  md:w-[60%] md:h-[60%]  lg:w-[100%] lg:h-[100%] object-cover cursor-pointer"
              src={fewCloudyNightIcon}
              alt="fewCloudyNight"
            />
          )}
          {getIcon === "03d" && (
            <img
              className="ml-auto mr-2 sm:mr-1  mt-auto mb-3 sm:mb-2 w-[80%] h-[80%]  md:w-[60%] md:h-[60%]  lg:w-[100%] lg:h-[100%] object-cover cursor-pointer"
              src={cloudyDayIcon}
              alt="cloudyDay"
            />
          )}
          {getIcon === "03n" && (
            <img
              className="ml-auto mr-2 sm:mr-1  mt-auto mb-3 sm:mb-2 w-[80%] h-[80%]  md:w-[60%] md:h-[60%]  lg:w-[100%] lg:h-[100%] object-cover cursor-pointer"
              src={cloudyNightIcon}
              alt="cloudyNight"
            />
          )}
          {getIcon === "04d" && (
            <img
              className="ml-auto mr-2 sm:mr-1  mt-auto mb-3 sm:mb-2 w-[80%] h-[80%]  md:w-[60%] md:h-[60%]  lg:w-[100%] lg:h-[100%] object-cover cursor-pointer"
              src={fewCloudyDayIcon}
              alt="fewCloudyDay"
            />
          )}
          {getIcon === "04n" && (
            <img
              className="ml-auto mr-2 sm:mr-1  mt-auto mb-3 sm:mb-2 w-[80%] h-[80%]  md:w-[60%] md:h-[60%]  lg:w-[100%] lg:h-[100%] object-cover cursor-pointer"
              src={fewCloudyNightIcon}
              alt="fewCloudyNight"
            />
          )}
          {getIcon === "09d" && (
            <img
              className="ml-auto mr-2 sm:mr-1  mt-auto mb-3 sm:mb-2 w-[80%] h-[80%]  md:w-[60%] md:h-[60%]  lg:w-[100%] lg:h-[100%] object-cover cursor-pointer"
              src={rainDayIcon}
              alt="rainDay"
            />
          )}
          {getIcon === "09n" && (
            <img
              className="ml-auto mr-2 sm:mr-1  mt-auto mb-3 sm:mb-2 w-[80%] h-[80%]  md:w-[60%] md:h-[60%]  lg:w-[100%] lg:h-[100%] object-cover cursor-pointer"
              src={rainNightIcon}
              alt="rainNight"
            />
          )}
          {getIcon === "10d" && (
            <img
              className="ml-auto mr-2 sm:mr-1  mt-auto mb-3 sm:mb-2 w-[80%] h-[80%]  md:w-[60%] md:h-[60%]  lg:w-[100%] lg:h-[100%] object-cover cursor-pointer"
              src={rainDayIcon}
              alt="rainDay"
            />
          )}
          {getIcon === "10n" && (
            <img
              className="ml-auto mr-2 sm:mr-1  mt-auto mb-3 sm:mb-2 w-[80%] h-[80%]  md:w-[60%] md:h-[60%]  lg:w-[100%] lg:h-[100%] object-cover cursor-pointer"
              src={rainNightIcon}
              alt="rainNight"
            />
          )}
          {getIcon === "11d" && (
            <img
              className="ml-auto mr-2 sm:mr-1  mt-auto mb-3 sm:mb-2 w-[80%] h-[80%]  md:w-[60%] md:h-[60%]  lg:w-[100%] lg:h-[100%] object-cover cursor-pointer"
              src={stormDayIcon}
              alt="stormDay"
            />
          )}
          {getIcon === "11n" && (
            <img
              className="ml-auto mr-2 sm:mr-1  mt-auto mb-3 sm:mb-2 w-[80%] h-[80%]  md:w-[60%] md:h-[60%]  lg:w-[100%] lg:h-[100%] object-cover cursor-pointer"
              src={stormNightIcon}
              alt="stormNight"
            />
          )}
          {getIcon === "13d" && (
            <img
              className="ml-auto mr-2 sm:mr-1  mt-auto mb-3 sm:mb-2 w-[80%] h-[80%]  md:w-[60%] md:h-[60%]  lg:w-[100%] lg:h-[100%] object-cover cursor-pointer"
              src={snowDayIcon}
              alt="snowDay"
            />
          )}
          {getIcon === "13n" && (
            <img
              className="ml-auto mr-2 sm:mr-1  mt-auto mb-3 sm:mb-2 w-[80%] h-[80%]  md:w-[60%] md:h-[60%]  lg:w-[100%] lg:h-[100%] object-cover cursor-pointer"
              src={snowNightIcon}
              alt="snowNight"
            />
          )}
          {getIcon === "50d" && (
            <img
              className="ml-auto mr-2 sm:mr-1  mt-auto mb-3 sm:mb-2 w-[80%] h-[80%]  md:w-[60%] md:h-[60%]  lg:w-[100%] lg:h-[100%] object-cover cursor-pointer"
              src={mistDayIcon}
              alt="mistDay"
            />
          )}
          {getIcon === "50n" && (
            <img
              className="ml-auto mr-2 sm:mr-1  mt-auto mb-3 sm:mb-2 w-[80%] h-[80%]  md:w-[60%] md:h-[60%]  lg:w-[100%] lg:h-[100%] object-cover cursor-pointer"
              src={mistNightIcon}
              alt="mistNight"
            />
          )}
        </div>
      </div>
    </div>
  );
}
