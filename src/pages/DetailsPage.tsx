import { useLocation } from "react-router-dom";
import CurrentWeather from "../components/CurrentWeather";
import Forecast from "../components/Forecast";
import RightDetailComp from "../components/RightDetailComp";
import weatherLogo from "../constants/weatherLogo";

const { weatherIcon } = weatherLogo;

export default function DetailsPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const lat = params.get("lat");
  const lon = params.get("lon");

  return (
    <>
      <div className="container  lg:h-screen lg:flex details mx-auto border items-center border-transparent bg-bgBlack sm:p-2">
        <div className="left md:p-6 md:w-[700px] md:h-[95%]  xl:h-[93vh]   w-[100%] p-[12px] lg:w-[664px]   sm:p-4  bg-[#16161F] rounded-[12px] sm:my-1 lg:my-0 lg:m-1">
          <div className="top-left flex  w-full my-1 rounded ">
            <div className="logo bg-[#16161F] h-[56px] w-[60px] flex justify-center items-center  rounded-[8px] me-1">
              <img src={weatherIcon} alt="Weather Icon Logo" />
            </div>
            <div className=" bg-[#1e1e29]  rounded-[8px]  h-[56px] w-[90%]  mx-auto p-1 flex items-center ">
              <input
                type="text"
                name=""
                id=""
                className="w-[98%] mx-auto bg-[#1e1e29]   focus:outline-none  placeholder-white-500  text-white"
                placeholder="Buscar Local"
              />
            </div>
          </div>

          <CurrentWeather lat={lat ?? ""} lon={lon ?? ""} />
        </div>

        <div className="right w-[100%] md:w-[630px]  md:h-[95vh]  lg:w-[45%]   ">
          <RightDetailComp lat={lat ?? ""} lon={lon ?? ""} />
          <Forecast lat={lat ?? ""} lon={lon ?? ""} />
        </div>
      </div>
    </>
  );
}
