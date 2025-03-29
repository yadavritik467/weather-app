import React from 'react';

interface ImageMapTooltipProps {
    city: string;
    country: string;
    temperature: number;
    humidity: number;
}

const ImageMapTooltip: React.FC<ImageMapTooltipProps> = ({ city, country, temperature, humidity }) => {
    return (
        <div className="bg-dark-card rounded-2xl p-4 sm:p-6 mb-6 w-full">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">World Weather</h2>
            <div className="relative w-full h-[350px] sm:h-[400px] rounded-lg overflow-hidden bg-[#121720]">
                {/* World map background */}
                <div className="absolute inset-0 z-0">
                    <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 800 500"
                        preserveAspectRatio="xMidYMid slice"
                        className="opacity-80"
                    >
                        {/* Globe outer circle */}
                        <circle
                            cx="400"
                            cy="250"
                            r="200"
                            fill="#1E293B"
                            strokeWidth="1"
                            stroke="#2A2E35"
                        />

                        {/* Latitude lines */}
                        {[-60, -30, 0, 30, 60].map((lat, i) => {
                            const y = 250 - (lat / 90) * 200;
                            const height = 200 * Math.cos(Math.abs(lat) * Math.PI / 180);
                            return (
                                <ellipse
                                    key={`lat-${i}`}
                                    cx="400"
                                    cy={y}
                                    rx={height}
                                    ry="15"
                                    fill="none"
                                    stroke="#2A2E35"
                                    strokeWidth="0.5"
                                    strokeDasharray="2,2"
                                />
                            );
                        })}

                        {/* Longitude lines */}
                        {Array.from({ length: 12 }).map((_, i) => {
                            const angle = (i * 30) * Math.PI / 180;
                            const x1 = 400 + 200 * Math.sin(angle);
                            const y1 = 250 - 200 * Math.cos(angle);
                            const x2 = 400 - 200 * Math.sin(angle);
                            const y2 = 250 + 200 * Math.cos(angle);
                            return (
                                <line
                                    key={`long-${i}`}
                                    x1={x1}
                                    y1={y1}
                                    x2={x2}
                                    y2={y2}
                                    stroke="#2A2E35"
                                    strokeWidth="0.5"
                                    strokeDasharray="2,2"
                                />
                            );
                        })}

                        {/* Simplified continents */}
                        {/* Europe and Africa */}
                        <path
                            d="M400,150 C420,145 440,150 460,160 C480,170 490,190 485,220 
                               C480,250 460,300 450,330 C440,360 430,370 415,380 
                               C400,390 390,380 380,350 C370,320 375,280 380,250 
                               C385,220 390,200 395,180 Z"
                            fill="#2A3441"
                            stroke="#364155"
                            strokeWidth="1"
                        />

                        {/* Americas */}
                        <path
                            d="M300,180 C310,170 320,160 330,170 C340,180 330,200 325,220
                               C320,240 310,280 305,300 C300,320 295,330 290,340
                               C285,350 280,345 285,330 C290,315 300,300 295,290
                               C290,280 285,270 280,290 C275,310 270,330 265,320
                               C260,310 270,290 275,270 C280,250 290,230 295,210 Z"
                            fill="#2A3441"
                            stroke="#364155"
                            strokeWidth="1"
                        />

                        {/* Asia and Australia */}
                        <path
                            d="M460,190 C480,180 500,185 520,200 C540,215 550,230 545,250
                               C540,270 530,285 510,290 C490,295 470,290 460,280
                               C490,280 510,275 515,260 C520,245 510,235 500,230
                               C490,225 475,220 460,220 Z"
                            fill="#2A3441"
                            stroke="#364155"
                            strokeWidth="1"
                        />
                        <path
                            d="M520,310 C530,305 540,310 545,320 C550,330 545,340 535,345
                               C525,350 515,345 510,335 C505,325 510,315 520,310 Z"
                            fill="#2A3441"
                            stroke="#364155"
                            strokeWidth="1"
                        />
                    </svg>
                </div>

                {/* Grid overlay */}
                <div className="absolute inset-0 z-0 opacity-20">
                    <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 800 500"
                        preserveAspectRatio="xMidYMid slice"
                    >
                        {/* Horizontal grid lines */}
                        {Array.from({ length: 10 }).map((_, i) => (
                            <line
                                key={`h-${i}`}
                                x1="0"
                                y1={50 * (i + 1)}
                                x2="800"
                                y2={50 * (i + 1)}
                                stroke="#3B4252"
                                strokeWidth="0.5"
                                strokeDasharray="5,5"
                                opacity="0.3"
                            />
                        ))}

                        {/* Vertical grid lines */}
                        {Array.from({ length: 16 }).map((_, i) => (
                            <line
                                key={`v-${i}`}
                                x1={50 * (i + 1)}
                                y1="0"
                                x2={50 * (i + 1)}
                                y2="500"
                                stroke="#3B4252"
                                strokeWidth="0.5"
                                strokeDasharray="5,5"
                                opacity="0.3"
                            />
                        ))}
                    </svg>
                </div>

                {/* City markers - 5 main cities */}
                {/* Berlin */}
                <div className="absolute top-[35%] left-[51%] transform -translate-x-1/2 -translate-y-1/2 z-5">
                    <div className="w-3 h-3 bg-weather-blue rounded-full border border-white"></div>
                </div>

                {/* New York */}
                <div className="absolute top-[38%] left-[32%] transform -translate-x-1/2 -translate-y-1/2 z-5">
                    <div className="w-2 h-2 bg-gray-400 rounded-full border border-white"></div>
                </div>

                {/* Tokyo */}
                <div className="absolute top-[40%] left-[73%] transform -translate-x-1/2 -translate-y-1/2 z-5">
                    <div className="w-2 h-2 bg-gray-400 rounded-full border border-white"></div>
                </div>

                {/* Sydney */}
                <div className="absolute top-[65%] left-[70%] transform -translate-x-1/2 -translate-y-1/2 z-5">
                    <div className="w-2 h-2 bg-gray-400 rounded-full border border-white"></div>
                </div>

                {/* Cape Town */}
                <div className="absolute top-[62%] left-[48%] transform -translate-x-1/2 -translate-y-1/2 z-5">
                    <div className="w-2 h-2 bg-gray-400 rounded-full border border-white"></div>
                </div>

                {/* The tooltip for Berlin */}
                <div className="absolute top-[35%] left-[51%] transform -translate-x-1/2 -translate-y-[150%] z-10">
                    <div className="bg-black bg-opacity-70 px-4 py-2 rounded-lg shadow-lg">
                        <div className="flex items-center space-x-1.5">
                            <span className="w-2 h-2 bg-weather-blue rounded-full"></span>
                            <span className="text-xs font-medium text-white">{city}, {country}</span>
                        </div>
                        <div className="text-xs text-white mt-0.5">
                            {temperature}° mostly cloudy
                        </div>
                        <div className="text-xs text-gray-400">
                            {humidity}% humidity
                        </div>
                    </div>
                </div>

                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0B0F15] opacity-30"></div>
            </div>
        </div>
    );
};

export default ImageMapTooltip; 