import React, { useState } from 'react';
import { DailyForecast } from '../../types/weather';

interface WeeklyForecastProps {
    forecasts: DailyForecast[];
}

interface DayCardProps {
    forecast: DailyForecast;
    isSelected: boolean;
    onClick: () => void;
}

const weatherIcons: Record<string, string> = {
    'sunny': '☀️',
    'cloudy': '☁️',
    'partly cloudy': '⛅',
    'mostly cloudy': '🌥️',
    'rainy': '🌧️',
    'stormy': '⛈️',
    'snowy': '❄️',
    'foggy': '🌫️',
};

const DayCard: React.FC<DayCardProps> = ({ forecast, isSelected, onClick }) => {
    const getIcon = (condition: string) => {
        return weatherIcons[condition.toLowerCase()] || '☁️';
    };

    const getCardClass = () => {
        return isSelected
            ? "flex flex-col items-center bg-blue-100/15 text-white rounded-xl p-3 cursor-pointer transition-all"
            : "flex flex-col items-center bg-dark-accent/30 text-white rounded-xl p-3 cursor-pointer transition-all";
    };

    return (
        <div
            className={getCardClass()}
            onClick={onClick}
        >
            <div className="text-sm text-gray-400 mb-2">{forecast.day}</div>
            <div className="text-4xl mb-2">{getIcon(forecast.weatherCondition)}</div>
            <div className="text-2xl font-medium mb-1">{forecast.temperature}°</div>
        </div>
    );
};

const WeeklyForecast: React.FC<WeeklyForecastProps> = () => {
    const [selectedDay, setSelectedDay] = useState<string>("Today");

    // Helper to get today and next 6 days
    const getWeekDays = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const today = new Date();
        const result = [{
            day: "Monday",
            fullDay: "Monday",
            date: `${today.getDate()} ${today.toLocaleString('default', { month: 'short' })}`,
            temperature: 16,
            weatherCondition: "sunny",
            details: {
                feelsLike: 15,
                windSpeed: 8.3,
                pressure: 1008,
                sunrise: "6:02 AM",
                sunset: "8:58 PM",
                humidity: 51
            }
        }];

        // Set names for the rest of the week (Tue, Wed, Thu, etc)
        const shortDays = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const temperatures = [10, 15, 11, 18, 12, 10]; // From the image

        for (let i = 0; i < 6; i++) {
            result.push({
                day: shortDays[i],
                fullDay: days[(today.getDay() + i + 1) % 7],
                date: `${today.getDate() + i + 1} ${today.toLocaleString('default', { month: 'short' })}`,
                temperature: temperatures[i],
                weatherCondition: ["partly cloudy", "rainy", "cloudy", "cloudy", "rainy", "rainy"][i],
                details: {
                    feelsLike: temperatures[i] - 1,
                    windSpeed: 8.3,
                    pressure: 1008,
                    sunrise: "6:02 AM",
                    sunset: "8:58 PM",
                    humidity: 51
                }
            });
        }

        return result;
    };

    const weekDays = getWeekDays();
    const selectedDayData = weekDays.find(day => day.day === selectedDay) || weekDays[0];

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-4 sm:p-5 mb-6 text-white">
            <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-4">
                    <button className={`px-4 py-1 rounded-full ${selectedDay === 'Today' || selectedDay === 'Monday' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
                        onClick={() => setSelectedDay("Monday")}>
                        Today
                    </button>
                    <button className={`px-4 py-1 rounded-full ${selectedDay === 'Tue' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
                        onClick={() => setSelectedDay("Tue")}>
                        Tomorrow
                    </button>
                    <button className={`px-4 py-1 rounded-full ${selectedDay !== 'Monday' && selectedDay !== 'Tue' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
                        onClick={() => setSelectedDay("Wed")}>
                        Next 7 days
                    </button>
                </div>
                <div className="text-gray-400 text-sm">
                    <button className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-md">Forecast</button>
                    <button className="text-gray-400 px-3 py-1 rounded-md ml-2">Air quality</button>
                </div>
            </div>

            {/* Main Day Card */}
            <div className="bg-blue-900/20 rounded-xl p-5 mb-5">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-gray-300 font-medium">{selectedDayData.day}</div>
                        <div className="flex items-baseline mt-1">
                            <span className="text-6xl font-bold text-white">{selectedDayData.temperature}°</span>
                            <span className="ml-2 text-xl text-gray-400">11:42 PM</span>
                        </div>
                        <div className="text-sm text-blue-400 mt-2">
                            Real Feel {selectedDayData.details.feelsLike}° · {selectedDayData.weatherCondition}
                        </div>

                        <div className="grid grid-cols-2 gap-y-3 gap-x-8 mt-4 text-sm">
                            <div>
                                <div className="text-gray-400">Wind Speed</div>
                                <div className="text-white">{selectedDayData.details.windSpeed} km/h</div>
                            </div>
                            <div>
                                <div className="text-gray-400">Pressure</div>
                                <div className="text-white">{selectedDayData.details.pressure}MB</div>
                            </div>
                            <div>
                                <div className="text-gray-400">Sunrise</div>
                                <div className="text-white">{selectedDayData.details.sunrise}</div>
                            </div>
                            <div>
                                <div className="text-gray-400">Sunset</div>
                                <div className="text-white">{selectedDayData.details.sunset}</div>
                            </div>
                            <div>
                                <div className="text-gray-400">Humidity</div>
                                <div className="text-white">{selectedDayData.details.humidity}%</div>
                            </div>
                        </div>
                    </div>

                    <div className="text-7xl -mt-2">
                        {weatherIcons[selectedDayData.weatherCondition.toLowerCase()] || '☁️'}
                    </div>
                </div>
            </div>

            {/* Day cards row */}
            <div className="grid grid-cols-7 gap-2 mt-4">
                {weekDays.map((day, index) => (
                    <DayCard
                        key={index}
                        forecast={day}
                        isSelected={selectedDay === day.day}
                        onClick={() => setSelectedDay(day.day)}
                    />
                ))}
            </div>
        </div>
    );
};

export default WeeklyForecast; 