import React from 'react';
import WeatherHeader from '../weather/WeatherHeader';
import CurrentWeather from '../weather/CurrentWeather';
import WeatherOverview from '../overview/WeatherOverview';
import ForecastSection from '../forecast/ForecastSection';
import SavedCities from '../weather/SavedCities';
import WeatherMap from '../weather/WeatherMap';
import { weatherData, savedCities } from '../../data/weatherData';

const Dashboard: React.FC = () => {
    return (
        <div className="max-w-full mx-auto pb-16 md:pb-6">
            <WeatherHeader
                userName="Elizabeth"
                date="Mon, 15 May, 2023"
            />

            <div className="relative">
                <CurrentWeather weatherData={weatherData} />
                <WeatherMap weatherData={weatherData} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                <WeatherOverview weatherData={weatherData} />
                <ForecastSection weatherData={weatherData} />
            </div>

            <SavedCities cities={savedCities} />
        </div>
    );
};

export default Dashboard; 