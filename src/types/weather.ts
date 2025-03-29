export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  weatherCondition: string;
  hourlyForecast: HourlyForecast[];
  dailyForecast: DailyForecast[];
  humidityHistory: HumidityHistory[];
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  weatherCondition: string;
}

export interface DailyForecast {
  day: string;
  date: string;
  temperature: number;
  weatherCondition: string;
}

export interface HumidityHistory {
  month: string;
  value: number;
}

export interface City {
  name: string;
  country: string;
  temperature: number;
  weatherCondition: string;
}

export interface CurrentWeather {
  city: string;
  country: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  weatherCondition: string;
  date: string;
}
