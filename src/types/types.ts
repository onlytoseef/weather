export type optionType = {
  name: string;
};
export type floatType = {
  name: number;
};
export type City = {
  name: string;
  local_names: { [key: string]: string };
  lat: number;
  lon: number;
  country: string;
  state: string;
};
export type SecondCity = {
  name: string;
  local_names: { [key: string]: string };
  lat: number;
  lon: number;
  country: string;
  state: string;
};

export type Forecasts = {
  dt_txt: string;
};

export type ForecastProps = {
  lat: string;
  lon: string;
};

export type CurrentWeatherProps = {
  humidity?: number;
  feelsLikeTemp?: number;
  windSpeed?: number;

  lon: string;
  lat: string;
};

export type CurrentWeatherrProps = {
  currentTemp?: number;
  minTemp?: number;
  maxTemp?: number;
  humidity?: number;
  feelsLikeTemp?: number;
  windSpeed?: number;
  weatherDescription?: string;
  lon: string;
  lat: string;
};

// Slices Types

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Clouds {
  all: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export interface Sys {
  pod: string;
}

export interface List {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
}

export interface ApiResponseData {
  cod: string;
  message: number;
  cnt: number;
  list: List[];
}

export interface ApiResponse {
  data: ApiResponseData;
}
export interface ForecastState {
  data: any;
  loading: boolean;
  error: string | null;
}

export type WeatherState = {
  data: any;
  loading: boolean;
  error: string | null;
};

export type WeatherDataObj = {
  data: {
    coord: { lon: number; lat: number };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    base: string;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
      sea_level: number;
      grnd_level: number;
    };
    visibility: number;
    wind: { speed: number; deg: number; gust: number };
    clouds: { all: number };
    dt: number;
    sys: { country: string; sunrise: number; sunset: number };
    timezone: number;
    id: number;
    name: string;
    cod: number;
  };
  loading: boolean;
  error: null | string;
};
