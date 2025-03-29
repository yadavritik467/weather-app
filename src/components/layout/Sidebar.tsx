import React from 'react';
import { RiHome4Line, RiUser3Line, RiCalendarLine, RiMapPin2Line, RiStarLine, RiSettings4Line } from 'react-icons/ri';

const Sidebar: React.FC = () => {
    return (
        <div className="w-20 h-full bg-dark-bg border-r border-dark-border flex flex-col items-center py-8">
            <div className="mb-12">
                <div className="w-10 h-10 rounded-lg bg-dark-card flex items-center justify-center text-white text-2xl">
                    <RiMapPin2Line />
                </div>
            </div>

            <div className="flex flex-col items-center space-y-8 flex-1">
                <NavItem icon={<RiHome4Line />} active />
                <NavItem icon={<RiUser3Line />} />
                <NavItem icon={<RiCalendarLine />} />
                <NavItem icon={<RiMapPin2Line />} />
                <NavItem icon={<RiStarLine />} />
            </div>

            <div className="mt-auto">
                <NavItem icon={<RiSettings4Line />} />
            </div>
        </div>
    );
};

interface NavItemProps {
    icon: React.ReactNode;
    active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, active }) => {
    return (
        <button className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${active ? 'bg-dark-card text-white' : 'text-gray-500 hover:text-gray-300'}`}>
            {icon}
        </button>
    );
};

export default Sidebar; 