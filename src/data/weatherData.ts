import {
  WeatherData,
  City,
  CityWithCoordinates,
  RainChance,
} from "../types/weather";

export const rainChanceData: RainChance[] = [
  { time: "10AM", type: "Rainy" as const, value: 65 },
  { time: "11AM", type: "Sunny" as const, value: 40 },
  { time: "12PM", type: "Heavy" as const, value: 70 },
  { time: "01PM", type: "Rainy" as const, value: 55 },
  { time: "02PM", type: "Sunny" as const, value: 80 },
  { time: "03PM", type: "Heavy" as const, value: 60 },
];

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
    humidity: 30,
    coordinates: [-9.1393, 38.7223],
  },
  {
    name: "Kyoto",
    country: "Japan",
    temperature: 29,
    weatherCondition: "sunny",
    humidity: 45,
    coordinates: [135.7681, 35.0116],
  },
  {
    name: "Antalya",
    country: "Turkey",
    temperature: 30,
    weatherCondition: "sunny",
    humidity: 35,
    coordinates: [30.7133, 36.8969],
  },
];

export const worldCities: CityWithCoordinates[] = [
  {
    name: "Berlin",
    country: "Germany",
    temperature: 20,
    weatherCondition: "mostly cloudy",
    humidity: 24,
    coordinates: [13.405, 52.52],
  },
  {
    name: "New York",
    country: "USA",
    temperature: 18,
    weatherCondition: "rainy",
    humidity: 56,
    coordinates: [-74.006, 40.7128],
  },
  {
    name: "Tokyo",
    country: "Japan",
    temperature: 27,
    weatherCondition: "sunny",
    humidity: 40,
    coordinates: [139.6917, 35.6895],
  },
  {
    name: "Sydney",
    country: "Australia",
    temperature: 22,
    weatherCondition: "partly cloudy",
    humidity: 33,
    coordinates: [151.2093, -33.8688],
  },
  {
    name: "Cape Town",
    country: "South Africa",
    temperature: 19,
    weatherCondition: "windy",
    humidity: 28,
    coordinates: [18.4241, -33.9249],
  },
];
