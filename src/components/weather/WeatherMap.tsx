import React from 'react';
import { WeatherData } from '../../types/weather';

interface WeatherMapProps {
    weatherData: WeatherData;
}

const WeatherMap: React.FC<WeatherMapProps> = ({ weatherData }) => {
    return (
        <>
            {/* Desktop and tablet map */}
            <div className="absolute top-4 right-4 w-56 sm:w-64 h-28 sm:h-32 bg-dark-card rounded-lg shadow-lg overflow-hidden hidden md:block">
                <div className="p-2 sm:p-3 z-10 relative">
                    <div className="flex items-center space-x-1">
                        <span className="w-2 h-2 bg-weather-blue rounded-full"></span>
                        <span className="text-xs sm:text-sm font-medium">{weatherData.city}, {weatherData.country}</span>
                    </div>
                    <div className="text-xs sm:text-sm">
                        <p>{weatherData.temperature}° {weatherData.weatherCondition}</p>
                        <p className="text-dark-subtext">{weatherData.humidity}% humidity</p>
                    </div>
                </div>

                <div className="absolute inset-0 bg-gray-900 opacity-70">
                    <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 1000 500"
                        className="stroke-gray-700 fill-none stroke-[0.5]"
                    >
                        <path d="M250,156 L320,168 L402,183 L440,169 L480,162 L544,156 L588,139 L615,141 L637,152 L659,168 L687,172 L700,169 L712,159 L728,157 L736,166 L730,174 L732,181 L753,182 L815,168 L847,173 L869,173 L889,180 L898,173 L924,178 L935,174 L935,195 L922,207 L904,224 L898,236 L904,248 L921,260 L932,268 L938,280 L927,286 L912,292 L904,304 L904,316 L915,324 L924,334 L919,344 L905,349 L890,359 L876,364 L867,374 L844,380 L830,380 L816,390 L800,398 L790,408 L775,408 L760,400 L748,394 L718,394 L705,400 L672,397 L660,392 L644,392 L638,387 L628,387 L622,381" />
                        <path d="M180,203 L190,207 L200,214 L220,210 L240,207 L250,217 L260,230 L270,234 L290,234 L300,224 L320,220 L340,227 L350,236 L370,236 L380,230 L400,227 L405,220 L370,210 L350,204 L330,200 L310,198 L290,192 L270,198 L250,200 L230,195 L210,195 L190,198 Z" />
                        <path d="M500,240 L520,244 L540,250 L560,244 L580,242 L600,250 L620,260 L640,265 L660,260 L680,255 L700,265 L720,270 L740,265 L760,260 L780,270 L800,280 L820,275 L840,265 L860,270 L880,280 L900,275 L920,265 L940,270 L960,280 L980,275 L1000,265 L1000,500 L0,500 L0,290 L20,280 L40,275 L60,285 L80,290 L100,285 L120,275 L140,280 L160,290 L180,285 L200,275 L220,280 L240,290 L260,295 L280,290 L300,280 L320,285 L340,295 L360,290 L380,280 L400,285 L420,295 L440,290 L460,280 L480,285 Z" />
                        <circle cx="497" cy="230" r="5" className="fill-weather-blue stroke-white stroke-1" />
                    </svg>
                </div>
            </div>

            {/* Mobile bottom map - fixed position */}
            <div className="fixed bottom-4 right-4 left-4 h-16 bg-dark-card rounded-lg shadow-lg overflow-hidden md:hidden z-20">
                <div className="flex items-center h-full">
                    <div className="p-2 z-10 relative flex-1">
                        <div className="flex items-center space-x-1">
                            <span className="w-2 h-2 bg-weather-blue rounded-full"></span>
                            <span className="text-xs font-medium">{weatherData.city}, {weatherData.country}</span>
                        </div>
                        <div className="flex text-xs justify-between">
                            <p>{weatherData.temperature}° {weatherData.weatherCondition}</p>
                            <p className="text-dark-subtext">{weatherData.humidity}% humidity</p>
                        </div>
                    </div>
                    <div className="h-full w-20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gray-900 opacity-70">
                            <svg
                                width="100%"
                                height="100%"
                                viewBox="0 0 1000 500"
                                className="stroke-gray-700 fill-none stroke-[0.5]"
                            >
                                <circle cx="497" cy="230" r="6" className="fill-weather-blue stroke-white stroke-1" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WeatherMap; 