import React from 'react';

interface MapTooltipProps {
    city: string;
    country: string;
    temperature: number;
    humidity: number;
}

const MapTooltip: React.FC<MapTooltipProps> = ({ city, country, temperature, humidity }) => {
    return (
        <div className="bg-black bg-opacity-70 px-3 py-2 rounded-lg shadow-lg text-white text-xs max-w-[200px]">
            <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 bg-weather-blue rounded-full"></span>
                <span className="font-medium">{city}, {country}</span>
            </div>
            <div className="mt-0.5">
                {temperature}° mostly cloudy
            </div>
            <div className="text-gray-400">
                {humidity}% humidity
            </div>
        </div>
    );
};

export default MapTooltip; 