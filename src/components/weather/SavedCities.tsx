import React from 'react';
import { RiAddLine, RiExternalLinkLine, RiCloudyLine } from 'react-icons/ri';
import { City } from '../../types/weather';

interface SavedCitiesProps {
    cities: City[];
}

const SavedCities: React.FC<SavedCitiesProps> = ({ cities }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            <div className="bg-dark-card rounded-2xl p-4 sm:p-6 border border-dashed border-dark-border flex flex-col items-center justify-center">
                <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-dark-hover flex items-center justify-center mb-3">
                    <RiAddLine className="text-lg sm:text-xl" />
                </button>
                <div className="text-center">
                    <h3 className="font-medium text-sm sm:text-base mb-1">World forecast</h3>
                    <p className="text-dark-subtext text-xs sm:text-sm">Add the cities you are interested in</p>
                </div>
            </div>

            {cities.map((city, index) => (
                <div key={index} className="bg-dark-card rounded-2xl p-4 sm:p-6">
                    <div className="flex justify-between items-center mb-4 sm:mb-6">
                        <div>
                            <h3 className="font-medium text-sm sm:text-base">{city.name}</h3>
                            <p className="text-dark-subtext text-xs sm:text-sm">{city.country}</p>
                        </div>
                        <RiCloudyLine className="text-xl sm:text-2xl text-weather-blue" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-semibold">
                        {city.temperature}°<span className="text-dark-subtext text-base sm:text-lg">/18°</span>
                    </div>
                </div>
            ))}

            <div className="bg-dark-card rounded-2xl p-4 sm:p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-cyan-500 to-blue-500 opacity-10 rounded-bl-full"></div>

                <div className="flex justify-between">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Subscribe!</h3>
                    <button className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-dark-hover flex items-center justify-center">
                        <RiExternalLinkLine className="text-sm sm:text-base" />
                    </button>
                </div>

                <p className="text-dark-subtext text-xs sm:text-sm mb-4 sm:mb-8">
                    Stay ahead of the weather with our daily forecasts and updates! Get ready to embrace the elements and make the most of your day.
                </p>

                <button className="bg-weather-blue text-white rounded-lg py-1.5 sm:py-2 px-3 sm:px-4 w-full hover:bg-blue-600 transition text-sm sm:text-base">
                    Subscribe
                </button>
            </div>
        </div>
    );
};

export default SavedCities; 