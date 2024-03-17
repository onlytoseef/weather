import { ChangeEvent, useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { SecondCity, City } from "../types/types";
import { getOptions, getOptionsStart } from "../redux/slices/optionSlice";
import { useNavigate } from "react-router-dom";
import weatherLogo from "../constants/weatherLogo";

const { animationLogo } = weatherLogo;

export default function SearchBar() {
  const [state, setState] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOptionListVisible, setOptionListVisible] = useState(true);

  const dispatch = useAppDispatch();
  const options = useAppSelector((state) => state.option.data);
  const arr: SecondCity[] = Object.values(options);
  const navigate = useNavigate();

  useEffect(() => {
    const timerId = setTimeout(() => {
      dispatch(getOptionsStart());
      dispatch(getOptions(state));
    }, 1000);

    return () => clearTimeout(timerId);
  }, [state]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState(value);

    if (value === "") {
      clearSuggestions();
      dispatch(getOptionsStart());
    }
  };

  const clearSuggestions = () => {};

  const onOptionSelect = (option: City) => {
    const { name, country, lon, lat } = option;
    const valueForInput = `${name}, ${country}`;

    setState(valueForInput);
    setOptionListVisible(false);
    setIsLoading(true);

    setTimeout(() => {
      navigate(`details?lat=${lat}&lon=${lon}`);
    }, 1000);
  };

  return (
    <>
      <div className="searchbar static w-[311px] mx-auto h-[56px] md:w-[504px] mt-[40px] rounded-lg py-0 px-[20px] bg-[#1e1e29] flex justify-center items-center ">
        <input
          className="bg-transparent w-[271px] md:w-[464px] h-[22px] border border-transparent focus:outline-none text-white-500 placeholder-white-500 text-white "
          type="text"
          placeholder="Search Location"
          value={state}
          onChange={handleChange}
        />
        {isLoading && (
          <div className="relative ml-0 h-[20px] w-[20px]">
            <div className="relative inset-0 flex items-center justify-center">
              <img
                src={animationLogo}
                alt="Loader Image"
                className="loader-svg animate-spin"
                style={{
                  width: "20px",
                  height: "20px",
                  fill: "#008000",
                }}
              />
            </div>
          </div>
        )}
      </div>

      <ul
        className={`option-list mt-1 ${
          isOptionListVisible || !state ? "" : "hidden"
        }`}
      >
        {arr.map((ar: SecondCity) => (
          <li
            onClick={() => {
              onOptionSelect(ar);
            }}
            className="bg-option  cursor-pointer h-[54px] w-[311px] md:w-[504px] border-t-1 border-b-1  rounded-lg my-[1px] flex text-[16px] font-normal hover:bg"
            key={`${ar.name}${ar.country}-${ar}`}
          >
            <button className="text-white border-t-1 border-b-1 ml-5 decoration-1">
              {`${ar.name}-${ar.country}`}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
