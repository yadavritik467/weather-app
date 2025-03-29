import React, { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';

interface WeatherHeaderProps {
    userName: string;
    date: string;
}

const WeatherHeader: React.FC<WeatherHeaderProps> = ({ userName, date }) => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    return (
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center mb-6">
            <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-4">
                    <img
                        src="https://i.pravatar.cc/40?img=5"
                        alt="User avatar"
                        className="w-full h-full rounded-full object-cover"
                    />
                </div>
                <div>
                    <p className="text-sm text-dark-subtext">Hi, {userName}</p>
                    <p className="text-lg font-medium">{date}</p>
                </div>
            </div>

            {/* Mobile search toggle */}
            <div className="md:hidden flex justify-end">
                <button
                    onClick={() => setIsSearchVisible(!isSearchVisible)}
                    className="p-2 rounded-full bg-dark-card text-dark-text"
                >
                    <RiSearchLine className="text-xl" />
                </button>
            </div>

            {/* Search and controls - responsive */}
            <div className={`${isSearchVisible || 'md:flex' ? 'flex' : 'hidden'} flex-col space-y-3 md:space-y-0 md:flex-row md:items-center md:space-x-4`}>
                <div className="relative w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Search city or postcode"
                        className="bg-dark-card text-dark-text rounded-full py-2 pl-10 pr-4 w-full md:w-64 border border-dark-border focus:outline-none focus:border-dark-accent"
                    />
                    <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-subtext" />
                </div>
                <div className="flex items-center justify-between md:justify-start space-x-2">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">ENG</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="w-8 h-8 rounded-full bg-dark-card flex items-center justify-center">
                            <span className="text-xl">°C</span>
                        </button>
                        <button className="w-8 h-8 rounded-full bg-dark-card flex items-center justify-center">
                            <span className="text-xl">°F</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherHeader; 