import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { CityWithCoordinates } from '../../types/weather';
import MapTooltip from './MapTooltip';

interface GlobeMapProps {
    selectedCity: string;
    cities: CityWithCoordinates[];
}

const GlobeMap: React.FC<GlobeMapProps> = ({ selectedCity, cities }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const [hoveredCity, setHoveredCity] = useState<CityWithCoordinates | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(23);

    // Store world data to avoid refetching
    const worldDataRef = useRef<any>(null);
    const projectionRef = useRef<d3.GeoProjection | null>(null);
    const globeSetupDone = useRef(false);

    // Setup globe and fetch data once
    useEffect(() => {
        if (!svgRef.current || !mapContainerRef.current || globeSetupDone.current) return;

        // Fetch world data once
        const fetchWorldData = async () => {
            try {
                const response = await fetch("https://unpkg.com/world-atlas@2.0.2/countries-110m.json");
                const data = await response.json();
                worldDataRef.current = data;
                globeSetupDone.current = true;

                // Initial render
                updateGlobe();
            } catch (error) {
                console.error("Error loading world data:", error);
            }
        };

        fetchWorldData();

        // Add event listener for window resize
        window.addEventListener('resize', updateGlobe);

        return () => {
            window.removeEventListener('resize', updateGlobe);
        };
    }, []);

    // Update globe based on rotation
    const updateGlobe = useCallback(() => {
        if (!svgRef.current || !mapContainerRef.current || !worldDataRef.current) return;

        const width = mapContainerRef.current.clientWidth;
        const height = Math.min(500, window.innerHeight * 0.6);
        const globeRadius = Math.min(width, height) * 0.35;
        const centerX = width / 2;
        const centerY = height / 2;

        // Clear previous SVG content
        d3.select(svgRef.current).selectAll("*").remove();

        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", `0 0 ${width} ${height}`)
            .style("background-color", "#121720");

        // Create a projection for the globe
        const projection = d3.geoOrthographic()
            .scale(globeRadius)
            .translate([centerX, centerY])
            .rotate([rotation, -10, 0]);

        projectionRef.current = projection;

        // Create a path generator
        const path = d3.geoPath().projection(projection);

        // Draw the globe base
        svg.append("circle")
            .attr("cx", centerX)
            .attr("cy", centerY)
            .attr("r", globeRadius)
            .attr("fill", "#1E293B")
            .attr("stroke", "#2A2E35")
            .attr("stroke-width", 1);

        // Add grid lines (latitude)
        const latitudes = [-60, -30, 0, 30, 60];
        latitudes.forEach(lat => {
            const circle = d3.geoCircle()
                .center([0, 0])
                .radius(lat);

            svg.append("path")
                .datum(circle as any)
                .attr("d", path)
                .attr("fill", "none")
                .attr("stroke", "#2A2E35")
                .attr("stroke-width", 0.5)
                .attr("stroke-dasharray", "2,2");
        });

        // Add grid lines (longitude)
        for (let i = 0; i < 12; i++) {
            const lng = i * 30;

            // Create a valid GeoJSON LineString
            const lineString = {
                type: "Feature",
                geometry: {
                    type: "LineString",
                    coordinates: Array.from({ length: 181 }, (_, i) => [lng, 90 - i])
                },
                properties: {}
            };

            svg.append("path")
                .datum(lineString as any)
                .attr("d", path)
                .attr("fill", "none")
                .attr("stroke", "#2A2E35")
                .attr("stroke-width", 0.5)
                .attr("stroke-dasharray", "2,2");
        }

        // Draw countries
        if (worldDataRef.current && worldDataRef.current.objects) {
            const countries = topojson.feature(worldDataRef.current, worldDataRef.current.objects.countries);

            svg.append("path")
                .datum(countries)
                .attr("d", path)
                .attr("fill", "#2A3441")
                .attr("stroke", "#364155")
                .attr("stroke-width", 0.5)
                .attr("opacity", 0.8);

            // Add city markers
            cities.forEach(city => {
                const coords = projection([city.coordinates[0], city.coordinates[1]]);
                if (coords && isVisible(city.coordinates[0], city.coordinates[1])) {
                    svg.append("circle")
                        .attr("cx", coords[0])
                        .attr("cy", coords[1])
                        .attr("r", city.name === selectedCity ? 6 : 4)
                        .attr("fill", city.name === selectedCity ? "#2563EB" : "#9CA3AF")
                        .attr("stroke", "#FFFFFF")
                        .attr("stroke-width", 1)
                        .attr("cursor", "pointer")
                        .attr("class", "city-marker")
                        .attr("data-city", city.name)
                        .on("mouseover", (event) => {
                            setHoveredCity(city);
                            setTooltipPosition({
                                x: event.pageX - mapContainerRef.current!.getBoundingClientRect().left,
                                y: event.pageY - mapContainerRef.current!.getBoundingClientRect().top - 70
                            });
                        })
                        .on("mouseout", () => {
                            setHoveredCity(null);
                        });

                    // Add fixed tooltip for selected city
                    if (city.name === selectedCity) {
                        svg.append("foreignObject")
                            .attr("x", coords[0] - 75)
                            .attr("y", coords[1] - 80)
                            .attr("width", 150)
                            .attr("height", 80)
                            .html(`
                <div class="bg-black bg-opacity-70 px-3 py-2 rounded-lg shadow-lg text-white text-xs">
                  <div class="flex items-center space-x-1.5">
                    <span class="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span class="font-medium">${city.name}, ${city.country}</span>
                  </div>
                  <div class="mt-0.5">${city.temperature}° ${city.weatherCondition}</div>
                  <div class="text-gray-400">${city.humidity}% humidity</div>
                </div>
              `);
                    }
                }
            });
        }

        // Function to check if a point is visible on the globe
        function isVisible(lng: number, lat: number) {
            if (!projection) return false;

            const point = [lng, lat];
            const rotated = projection.rotate();
            const geoCircle = d3.geoCircle().center([-rotated[0], -rotated[1]]).radius(90);
            return geoCircle(point as any);
        }

        // Add gradient overlay for a more polished look
        svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            .attr("fill", "url(#globe-gradient)")
            .attr("opacity", 0.2);

        // Add defs for gradient
        const defs = svg.append("defs");
        const gradient = defs.append("radialGradient")
            .attr("id", "globe-gradient")
            .attr("cx", "50%")
            .attr("cy", "50%")
            .attr("r", "50%");

        gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "#0B0F15")
            .attr("stop-opacity", 0);

        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#0B0F15")
            .attr("stop-opacity", 0.8);
    }, [rotation, cities, selectedCity]);

    // Update on rotation changes
    useEffect(() => {
        updateGlobe();
    }, [updateGlobe]);

    // Auto-rotation effect
    useEffect(() => {
        const interval = setInterval(() => {
            setRotation(prev => (prev + 0.5) % 360); // Slower rotation - 0.5 degrees per step
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="bg-dark-card rounded-2xl p-4 sm:p-6 mb-6 w-full">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">World Weather</h2>
            <div className="relative" ref={mapContainerRef}>
                <svg ref={svgRef} className="w-full h-auto"></svg>

                {/* Interactive tooltip for hovered city */}
                {hoveredCity && hoveredCity.name !== selectedCity && (
                    <div
                        className="absolute pointer-events-none z-50"
                        style={{
                            left: `${tooltipPosition.x}px`,
                            top: `${tooltipPosition.y}px`,
                            transform: 'translate(-50%, -100%)'
                        }}
                    >
                        <MapTooltip
                            city={hoveredCity.name}
                            country={hoveredCity.country}
                            temperature={hoveredCity.temperature}
                            humidity={hoveredCity.humidity}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default GlobeMap; 