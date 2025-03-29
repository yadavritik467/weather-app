import React from 'react';

interface WeatherTooltipProps {
    city: string;
    country: string;
    temperature: number;
    weatherCondition: string;
    humidity: number;
    className?: string;
}

const WeatherTooltip: React.FC<WeatherTooltipProps> = ({
    city,
    country,
    temperature,
    weatherCondition,
    humidity,
    className = ''
}) => {
    return (
        <div className={`bg-dark-card rounded-lg shadow-md text-white overflow-hidden ${className}`}>
            <div className="px-3 py-2 bg-black bg-opacity-50">
                <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-weather-blue rounded-full"></span>
                    <span className="text-xs sm:text-sm font-medium">{city}, {country}</span>
                </div>
                <div className="flex justify-between text-xs mt-1">
                    <span>{temperature}° {weatherCondition}</span>
                    <span className="text-dark-subtext">{humidity}% humidity</span>
                </div>
            </div>
        </div>
    );
};

export default WeatherTooltip; 