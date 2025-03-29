import React from 'react';
import { City } from '../../types/weather';

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

interface CityCardProps {
    country: string;
    city: string;
    weatherCondition: string;
    temperature: number;
}

const CityCard: React.FC<CityCardProps> = ({ country, city, weatherCondition, temperature }) => {
    const getIcon = (condition: string) => {
        return weatherIcons[condition.toLowerCase()] || '☁️';
    };

    return (
        <div className="bg-dark-card flex justify-between rounded-lg p-4 mb-2 hover:bg-[#252525] transition-colors">
            <div>
                <div className="text-xs text-gray-500 uppercase mb-1">{country}</div>
                <div className="text-white font-medium text-2xl mb-1">{city}</div>
                <div className="flex justify-between items-center">
                    <div className="text-gray-400 text-md">{weatherCondition}</div>

                </div>
            </div>
            <div className="flex flex-col  items-center">
                <div className="text-5xl mr-2">{getIcon(weatherCondition)}</div>
                <div className="text-white text-2xl font-medium">{temperature}°</div>
            </div>
        </div>
    );
};

interface GlobalCitiesProps {
    cities: City[];
}

const GlobalCities: React.FC<GlobalCitiesProps> = () => {
    // Filter cities or use predefined list to match the image
    const displayCities = [
        { country: 'US', city: 'California', weatherCondition: 'Mostly Sunny', temperature: 28 },
        { country: 'China', city: 'Beijing', weatherCondition: 'Cloudy', temperature: 19 },
        { country: 'Israel', city: 'Jerusalem', weatherCondition: 'Sunny', temperature: 31 },
    ];

    return (
        <div className="bg-dark-bg overflow-hidden rounded-2xl  mb-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-lg font-medium">Other large cities</h2>
                <div className="flex items-center text-gray-400 text-sm cursor-pointer hover:text-gray-300">
                    <span>Show All</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>

            <div className="space-y-3">
                {displayCities.map((city, index) => (
                    <CityCard
                        key={index}
                        country={city.country}
                        city={city.city}
                        weatherCondition={city.weatherCondition}
                        temperature={city.temperature}
                    />
                ))}
            </div>
        </div>
    );
};

export default GlobalCities; 