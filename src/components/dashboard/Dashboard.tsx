import React from 'react';
import WeatherHeader from '../weather/WeatherHeader';
import CurrentWeather from '../weather/CurrentWeather';
import WeatherOverview from '../overview/WeatherOverview';
import ForecastSection from '../forecast/ForecastSection';
import SavedCities from '../weather/SavedCities';
import WeatherMap from '../weather/WeatherMap';
import StaticWorldMap from '../weather/StaticWorldMap';
import RainChanceChart from '../weather/RainChanceChart';
import WeeklyForecast from '../forecast/WeeklyForecast';
import GlobalCities from '../weather/GlobalCities';
import { weatherData, savedCities, worldCities, rainChanceData } from '../../data/weatherData';

const Dashboard: React.FC = () => {
    return (
        <div className="max-w-full mx-auto pb-16 md:pb-6">
            <WeatherHeader
                userName="Elizabeth"
                date="Mon, 15 May, 2023"
            />

            <div className="grid grid-cols-12 gap-4">
                <div className="lg:col-span-8 col-span-12">
                    <div className='relative'>
                        <CurrentWeather weatherData={weatherData} />
                        <WeatherMap weatherData={weatherData} />
                    </div>
                </div>
                <div className='lg:col-span-4 col-span-12'>
                    <RainChanceChart data={rainChanceData} />
                </div>
                <div className='lg:col-span-8 col-span-12'>
                    <StaticWorldMap cities={worldCities} selectedCity="Tokyo" />
                </div>
                <div className='lg:col-span-4 col-span-12'>
                    <GlobalCities cities={savedCities} />
                </div>
                <div className='lg:col-span-12 col-span-12'>
                    <WeeklyForecast forecasts={weatherData.dailyForecast} />
                </div>
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