import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { WeatherData } from '../../types/weather';

Chart.register(...registerables);

interface WeatherOverviewProps {
    weatherData: WeatherData;
}

const WeatherOverview: React.FC<WeatherOverviewProps> = ({ weatherData }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);

    // Tabs for the overview
    const tabs = ['Humidity', 'UV index', 'Rainfall', 'Pressure'];
    const [activeTab, setActiveTab] = React.useState('Humidity');

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');

            if (ctx) {
                // Destroy existing chart instance
                if (chartInstance.current) {
                    chartInstance.current.destroy();
                }

                // Get data from weather data
                const labels = weatherData.humidityHistory.map(item => item.month);
                const data = weatherData.humidityHistory.map(item => item.value);

                // Create new chart
                chartInstance.current = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels,
                        datasets: [
                            {
                                label: 'Humidity',
                                data,
                                borderColor: '#2563EB',
                                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                                tension: 0.4,
                                fill: true,
                                pointBackgroundColor: '#2563EB',
                                pointBorderColor: '#fff',
                                pointRadius: (ctx) => {
                                    // Highlight the month of May (index 4)
                                    const index = ctx.dataIndex;
                                    return index === 4 ? 6 : 0;
                                },
                                pointHoverRadius: 6,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                grid: {
                                    display: false,
                                    drawBorder: false,
                                },
                                ticks: {
                                    color: '#9CA3AF',
                                    font: {
                                        size: 9,
                                    },
                                    maxRotation: 45,
                                    minRotation: 45,
                                },
                            },
                            y: {
                                min: 0,
                                max: 100,
                                grid: {
                                    color: 'rgba(156, 163, 175, 0.1)',
                                    drawBorder: false,
                                },
                                ticks: {
                                    color: '#9CA3AF',
                                    font: {
                                        size: 9,
                                    },
                                    callback: function (value) {
                                        return value + '%';
                                    }
                                },
                            },
                        },
                        plugins: {
                            legend: {
                                display: false,
                            },
                            tooltip: {
                                backgroundColor: '#171C23',
                                titleColor: '#fff',
                                bodyColor: '#9CA3AF',
                                borderColor: '#2A2E35',
                                borderWidth: 1,
                                displayColors: false,
                                callbacks: {
                                    label: function (context) {
                                        return `Humidity: ${context.raw}%`;
                                    }
                                }
                            },
                        },
                    },
                });
            }
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [weatherData]);

    return (
        <div className="bg-dark-card rounded-2xl p-4 sm:p-6 mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Overview</h2>

            <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-full ${activeTab === tab
                            ? 'bg-dark-border text-white'
                            : 'text-dark-subtext hover:bg-dark-border hover:text-white'
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-dark-hover px-3 py-1 rounded-md z-10">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-weather-blue rounded-full"></div>
                        <span className="text-xs sm:text-sm">Average {activeTab === 'Humidity' ? '65%' : ''}</span>
                    </div>
                </div>
                <div className="h-40 sm:h-48 md:h-56 mt-3">
                    <canvas ref={chartRef}></canvas>
                </div>
            </div>
        </div>
    );
};

export default WeatherOverview; 