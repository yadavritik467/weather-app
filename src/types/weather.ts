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
  fullDay?: string;
  details?: {
    feelsLike: number;
    windSpeed: number;
    pressure: number;
    sunrise: string;
    sunset: string;
    humidity: number;
  };
}

export interface HumidityHistory {
  month: string;
  value: number;
}

export interface RainChance {
  time: string;
  type: "Rainy" | "Sunny" | "Heavy";
  value: number; // 0-100 percentage
}

export interface City {
  name: string;
  country: string;
  temperature: number;
  weatherCondition: string;
  humidity?: number;
  coordinates?: [number, number]; // [longitude, latitude]
}

export interface CityWithCoordinates extends City {
  humidity: number;
  coordinates: [number, number]; // [longitude, latitude]
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
