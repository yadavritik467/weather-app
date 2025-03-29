import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { CityWithCoordinates } from '../../types/weather';
import WeatherTooltip from './WeatherTooltip';

interface CityMapProps {
    selectedCity: string;
    cities: CityWithCoordinates[];
}

const CityMap: React.FC<CityMapProps> = ({ selectedCity, cities }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const [hoveredCity, setHoveredCity] = useState<CityWithCoordinates | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    // Fixed tooltip for selected city
    const [fixedTooltipPosition, setFixedTooltipPosition] = useState({ x: 0, y: 0, show: false });

    useEffect(() => {
        if (!svgRef.current || !mapContainerRef.current) return;

        const width = mapContainerRef.current.clientWidth;
        const height = Math.min(400, window.innerHeight * 0.5);

        // Clear previous SVG content
        d3.select(svgRef.current).selectAll("*").remove();

        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", `0 0 ${width} ${height}`)
            .style("background-color", "#0B0F15");

        // Create a projection for the map
        const projection = d3.geoMercator()
            .scale(width / 7)
            .center([0, 40])
            .translate([width / 2, height / 2]);

        // Create a path generator
        const path = d3.geoPath().projection(projection);

        // Simplify and draw world map with dark styling
        d3.json("https://unpkg.com/world-atlas@2.0.2/countries-110m.json").then((data: any) => {
            if (!data || !data.objects) return;

            const countries = topojson.feature(data, data.objects.countries);

            // Draw countries
            svg.selectAll("path.country")
                .data(countries.features)
                .enter()
                .append("path")
                .attr("class", "country")
                .attr("d", path)
                .attr("fill", "#2A2E35")
                .attr("stroke", "#1E293B")
                .attr("stroke-width", 0.5);

            // Add city markers
            svg.selectAll("circle.city-marker")
                .data(cities)
                .enter()
                .append("circle")
                .attr("class", "city-marker")
                .attr("cx", d => {
                    const coords = projection([d.coordinates[0], d.coordinates[1]]);
                    return coords ? coords[0] : 0;
                })
                .attr("cy", d => {
                    const coords = projection([d.coordinates[0], d.coordinates[1]]);
                    return coords ? coords[1] : 0;
                })
                .attr("r", d => d.name === selectedCity ? 6 : 4)
                .attr("fill", d => d.name === selectedCity ? "#2563EB" : "#9CA3AF")
                .attr("stroke", "#FFFFFF")
                .attr("stroke-width", 1)
                .attr("cursor", "pointer")
                .on("mouseover", (event, d) => {
                    setHoveredCity(d);
                    setTooltipPosition({
                        x: event.pageX - mapContainerRef.current!.getBoundingClientRect().left + 15,
                        y: event.pageY - mapContainerRef.current!.getBoundingClientRect().top - 70
                    });
                })
                .on("mouseout", () => {
                    setHoveredCity(null);
                });

            // Position the fixed tooltip for the selected city
            const selectedCityData = cities.find(c => c.name === selectedCity);
            if (selectedCityData) {
                const coords = projection([selectedCityData.coordinates[0], selectedCityData.coordinates[1]]);
                if (coords) {
                    setFixedTooltipPosition({
                        x: coords[0] - 75,
                        y: coords[1] - 60,
                        show: true
                    });
                }
            }
        }).catch(error => {
            console.error("Error loading or processing map data:", error);
        });

        // Resize handler
        const handleResize = () => {
            if (mapContainerRef.current && svgRef.current) {
                const newWidth = mapContainerRef.current.clientWidth;
                const newHeight = Math.min(400, window.innerHeight * 0.5);

                d3.select(svgRef.current)
                    .attr("width", newWidth)
                    .attr("height", newHeight)
                    .attr("viewBox", `0 0 ${newWidth} ${newHeight}`);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [cities, selectedCity]);

    return (
        <div className="bg-dark-card rounded-2xl p-4 sm:p-6 mb-6 w-full">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">World Weather</h2>
            <div className="relative" ref={mapContainerRef}>
                <svg ref={svgRef} className="w-full h-auto"></svg>

                {/* Interactive tooltip for hovered city */}
                {hoveredCity && (
                    <div
                        className="absolute pointer-events-none z-50"
                        style={{
                            left: `${tooltipPosition.x}px`,
                            top: `${tooltipPosition.y}px`,
                            transform: 'translate(-50%, -100%)'
                        }}
                    >
                        <WeatherTooltip
                            city={hoveredCity.name}
                            country={hoveredCity.country}
                            temperature={hoveredCity.temperature}
                            weatherCondition={hoveredCity.weatherCondition}
                            humidity={hoveredCity.humidity}
                        />
                    </div>
                )}

                {/* Fixed tooltip for selected city */}
                {fixedTooltipPosition.show && (
                    <div
                        className="absolute pointer-events-none"
                        style={{
                            left: `${fixedTooltipPosition.x}px`,
                            top: `${fixedTooltipPosition.y}px`
                        }}
                    >
                        <WeatherTooltip
                            city={selectedCity}
                            country={cities.find(c => c.name === selectedCity)?.country || ''}
                            temperature={cities.find(c => c.name === selectedCity)?.temperature || 0}
                            weatherCondition={cities.find(c => c.name === selectedCity)?.weatherCondition || ''}
                            humidity={cities.find(c => c.name === selectedCity)?.humidity || 0}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CityMap; 