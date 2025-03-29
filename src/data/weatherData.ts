import { WeatherData, City } from "../types/weather";

export const weatherData: WeatherData = {
  city: "Berlin",
  country: "Germany",
  temperature: 20,
  humidity: 24,
  windSpeed: 13,
  weatherCondition: "mostly cloudy",
  hourlyForecast: [
    { time: "01 am", temperature: 17, weatherCondition: "cloudy" },
    { time: "02 am", temperature: 21, weatherCondition: "cloudy" },
    { time: "11 am", temperature: 21, weatherCondition: "cloudy" },
    { time: "12 pm", temperature: 24, weatherCondition: "cloudy" },
    { time: "01 pm", temperature: 24, weatherCondition: "cloudy" },
    { time: "02 pm", temperature: 24, weatherCondition: "cloudy" },
    { time: "03 pm", temperature: 26, weatherCondition: "cloudy" },
    { time: "04 pm", temperature: 24, weatherCondition: "cloudy" },
    { time: "05 pm", temperature: 22, weatherCondition: "cloudy" },
    { time: "06 pm", temperature: 21, weatherCondition: "cloudy" },
    { time: "07 pm", temperature: 19, weatherCondition: "cloudy" },
  ],
  dailyForecast: [
    { day: "Tue", date: "16 May", temperature: 22, weatherCondition: "cloudy" },
    { day: "Wed", date: "17 May", temperature: 20, weatherCondition: "cloudy" },
    { day: "Thu", date: "18 May", temperature: 25, weatherCondition: "cloudy" },
  ],
  humidityHistory: [
    { month: "Jan", value: 40 },
    { month: "Feb", value: 30 },
    { month: "Mar", value: 45 },
    { month: "Apr", value: 25 },
    { month: "May", value: 65 },
    { month: "Jun", value: 40 },
    { month: "Jul", value: 35 },
    { month: "Aug", value: 55 },
    { month: "Sep", value: 45 },
    { month: "Oct", value: 50 },
    { month: "Nov", value: 30 },
    { month: "Dec", value: 35 },
  ],
};

export const savedCities: City[] = [
  {
    name: "Lisbon",
    country: "Portugal",
    temperature: 23,
    weatherCondition: "sunny",
  },
  {
    name: "Kyoto",
    country: "Japan",
    temperature: 29,
    weatherCondition: "sunny",
  },
  {
    name: "Antalya",
    country: "Turkey",
    temperature: 30,
    weatherCondition: "sunny",
  },
];
