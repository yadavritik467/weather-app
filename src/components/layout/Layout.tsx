import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        checkScreenSize();

        // Add event listener
        window.addEventListener('resize', checkScreenSize);

        // Cleanup
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <div className="flex h-screen bg-dark-bg text-dark-text overflow-hidden">
            {/* Mobile menu button */}
            {isMobile && (
                <button
                    className="fixed top-4 left-4 z-50 w-10 h-10 rounded-lg bg-dark-card flex items-center justify-center text-white"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d={sidebarOpen
                                ? "M6 18L18 6M6 6l12 12"
                                : "M4 6h16M4 12h16M4 18h16"}
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            )}

            {/* Sidebar */}
            <div className={`${isMobile ? 'fixed z-40 transition-all duration-300 ease-in-out transform' : ''} ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'
                }`}>
                <Sidebar />
            </div>

            {/* Backdrop for mobile */}
            {isMobile && sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <main className={`flex-1 p-4 md:p-6 overflow-auto ${isMobile ? 'pt-16' : ''}`}>
                {children}
            </main>
        </div>
    );
};

export default Layout; 