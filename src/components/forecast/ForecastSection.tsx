import React from 'react';
import { RiCloudyLine } from 'react-icons/ri';
import { WeatherData } from '../../types/weather';

interface ForecastSectionProps {
    weatherData: WeatherData;
}

const ForecastSection: React.FC<ForecastSectionProps> = ({ weatherData }) => {
    const [activeTab, setActiveTab] = React.useState('3 days');
    const tabs = ['3 days', '10 days'];

    return (
        <div className="bg-dark-card rounded-2xl p-4 sm:p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-0">Forecats</h2>
                <div className="flex space-x-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-full ${activeTab === tab
                                ? 'bg-dark-border text-white'
                                : 'text-dark-subtext hover:bg-dark-border hover:text-white'
                                }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
                {weatherData.dailyForecast.map((forecast, index) => (
                    <div key={index} className="bg-dark-hover rounded-xl p-3 sm:p-4 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <RiCloudyLine className="text-xl sm:text-2xl text-weather-blue" />
                            <div>
                                <p className="font-medium text-sm sm:text-base">
                                    +{forecast.temperature}°
                                    <span className="text-dark-subtext text-xs sm:text-sm ml-1">/ +17°</span>
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-medium text-sm sm:text-base">
                                {forecast.date}, <span className="text-dark-subtext">{forecast.day}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ForecastSection; 