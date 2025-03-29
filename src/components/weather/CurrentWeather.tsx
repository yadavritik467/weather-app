import React from 'react';
import { RiCloudyLine } from 'react-icons/ri';
import { WeatherData } from '../../types/weather';

interface CurrentWeatherProps {
    weatherData: WeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weatherData }) => {
    return (
        <div className="bg-dark-card rounded-2xl p-4 sm:p-6 mb-6">
            <div className="flex flex-col md:flex-row md:justify-between">
                <div className="flex-1">
                    <div className="flex items-center mb-1">
                        <h2 className="text-xl sm:text-2xl font-semibold">{weatherData.city}</h2>
                    </div>
                    <p className="text-dark-subtext">{weatherData.country}</p>

                    <div className="flex items-center mt-4">
                        <div className="text-4xl sm:text-5xl md:text-6xl font-semibold mr-2">+{weatherData.temperature}°</div>
                        <RiCloudyLine className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 text-weather-blue" />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 mt-4">
                        <div>
                            <p className="text-dark-subtext text-sm sm:text-base">Temperature</p>
                            <p className="text-lg sm:text-xl font-semibold">{weatherData.temperature}°</p>
                        </div>
                        <div>
                            <p className="text-dark-subtext text-sm sm:text-base">Humidity</p>
                            <p className="text-lg sm:text-xl font-semibold">{weatherData.humidity}%</p>
                        </div>
                        <div>
                            <p className="text-dark-subtext text-sm sm:text-base">Wind speed</p>
                            <p className="text-lg sm:text-xl font-semibold">{weatherData.windSpeed} km/h</p>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/2 mt-4 md:mt-0 hidden md:block">
                    <div className="relative h-48">
                        <div className="absolute right-0 top-0 rounded-lg overflow-hidden w-full h-full flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-r from-dark-card to-transparent"></div>
                            <svg className="w-full h-full opacity-40" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 100 Q 100 20, 200 100 T 400 100" stroke="#2563EB" strokeWidth="2" strokeOpacity="0.4" fill="none" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 -mx-4 sm:mx-0">
                <div className="overflow-x-auto pb-4 px-4 sm:px-0">
                    <div className="flex space-x-4 min-w-max">
                        {weatherData.hourlyForecast.map((hourForecast, index) => (
                            <div
                                key={index}
                                className={`flex flex-col items-center p-3 sm:p-4 rounded-xl ${index === 4 ? 'bg-dark-hover' : ''}`}
                                style={{ minWidth: '70px' }}
                            >
                                <span className="text-dark-subtext text-xs sm:text-sm">{hourForecast.time}</span>
                                <RiCloudyLine className="my-2 text-lg text-weather-blue" />
                                <span className="font-medium text-sm sm:text-base">{hourForecast.temperature}°</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather; 