import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { CityWithCoordinates } from '../../types/weather';

interface StaticWorldMapProps {
    cities: CityWithCoordinates[];
    selectedCity?: string;
}

const StaticWorldMap: React.FC<StaticWorldMapProps> = ({ cities, selectedCity }) => {
    const mapRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const zoomRef = useRef<d3.ZoomBehavior<Element, unknown> | null>(null);

    useEffect(() => {
        if (!mapRef.current || !containerRef.current) return;

        const width = containerRef.current.clientWidth;
        const height = 400;

        // Clear the SVG
        d3.select(mapRef.current).selectAll("*").remove();

        const svg = d3.select(mapRef.current)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", `0 0 ${width} ${height}`)
            .style("background-color", "#121720");

        // Create a projection
        const projection = d3.geoMercator()
            .scale(width / 6)
            .center([0, 20])
            .translate([width / 2, height / 2]);

        const path = d3.geoPath().projection(projection);

        // Create base groups
        const mapGroup = svg.append("g").attr("id", "map-layer");
        const markersGroup = svg.append("g").attr("id", "markers-layer");
        const tooltipGroup = svg.append("g").attr("id", "tooltip-layer");

        // Add subtle noise texture for the background
        const defs = svg.append("defs");

        // Create noise pattern
        const noiseFilter = defs.append("filter")
            .attr("id", "noise")
            .attr("x", "0%")
            .attr("y", "0%")
            .attr("width", "100%")
            .attr("height", "100%");

        noiseFilter.append("feTurbulence")
            .attr("type", "fractalNoise")
            .attr("baseFrequency", "0.65")
            .attr("numOctaves", "3")
            .attr("stitchTiles", "stitch")
            .attr("result", "noise");

        noiseFilter.append("feColorMatrix")
            .attr("type", "matrix")
            .attr("values", "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0")
            .attr("result", "colorNoise");

        svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            .attr("fill", "#121720")
            .attr("filter", "url(#noise)");

        // Add grid lines
        const addGridLines = () => {
            const grid = svg.append("g").attr("id", "grid-layer");

            // Add longitude lines
            for (let i = -180; i <= 180; i += 30) {
                const coordinates = Array.from({ length: 181 }, (_, j) => [i, j - 90] as [number, number]);
                grid.append("path")
                    .datum({
                        type: "Feature",
                        geometry: {
                            type: "LineString",
                            coordinates: coordinates
                        },
                        properties: {}
                    })
                    .attr("d", path as any)
                    .attr("stroke", "#2A2E35")
                    .attr("stroke-width", 0.3)
                    .attr("fill", "none")
                    .attr("opacity", 0.3);
            }

            // Add latitude lines
            for (let i = -60; i <= 60; i += 30) {
                const coordinates = Array.from({ length: 361 }, (_, j) => [j - 180, i] as [number, number]);
                grid.append("path")
                    .datum({
                        type: "Feature",
                        geometry: {
                            type: "LineString",
                            coordinates: coordinates
                        },
                        properties: {}
                    })
                    .attr("d", path as any)
                    .attr("stroke", "#2A2E35")
                    .attr("stroke-width", 0.3)
                    .attr("fill", "none")
                    .attr("opacity", 0.3);
            }
        };

        // Load and draw world map
        fetch("https://unpkg.com/world-atlas@2.0.2/countries-110m.json")
            .then(response => response.json())
            .then(data => {
                // Draw map
                mapGroup.append("path")
                    .datum(topojson.feature(data, data.objects.countries))
                    .attr("d", path)
                    .attr("fill", "#1c2026")
                    .attr("stroke", "#2a2e35")
                    .attr("stroke-width", 0.5);

                addGridLines();

                // Add city markers
                cities.forEach(city => {
                    const [x, y] = projection([city.coordinates[0], city.coordinates[1]]) || [0, 0];

                    // Create city marker group
                    const markerGroup = markersGroup.append("g")
                        .attr("transform", `translate(${x}, ${y})`)
                        .attr("class", "city-marker")
                        .attr("data-city", city.name);

                    // Black circle background
                    markerGroup.append("circle")
                        .attr("r", 12)
                        .attr("fill", "black")
                        .attr("stroke", "#2A2E35")
                        .attr("stroke-width", 1);

                    // Weather icon (simplified for now)
                    const weatherIcons: { [key: string]: string } = {
                        'sunny': '☀️',
                        'cloudy': '☁️',
                        'rainy': '🌧️',
                        'snowy': '❄️',
                        'partly cloudy': '⛅',
                        'mostly cloudy': '☁️',
                        'windy': '💨',
                    };

                    // Icon
                    markerGroup.append("text")
                        .attr("text-anchor", "middle")
                        .attr("dy", "0.35em")
                        .attr("fill", "white")
                        .attr("font-size", "10px")
                        .text(weatherIcons[city.weatherCondition.toLowerCase()] || '☁️');

                    // Create tooltip for selected or active city
                    if (city.name === selectedCity || city.name === activeTooltip) {
                        const tooltip = tooltipGroup.append("g")
                            .attr("class", "city-tooltip")
                            .attr("transform", `translate(${x}, ${y - 35})`);

                        // Background for tooltip
                        const tooltipBg = tooltip.append("rect")
                            .attr("rx", 4)
                            .attr("ry", 4)
                            .attr("fill", "rgba(0, 0, 0, 0.7)")
                            .attr("stroke", "#2A2E35")
                            .attr("stroke-width", 0.5);

                        // Create a text group
                        const textGroup = tooltip.append("g");

                        // City and country
                        textGroup.append("text")
                            .attr("text-anchor", "middle")
                            .attr("dy", "-3.6em")
                            .attr("fill", "white")
                            .attr("font-size", "12px")
                            .attr("font-weight", "500")
                            .text(`${city.name}, ${city.country.toUpperCase()}`);

                        // Temperature
                        textGroup.append("text")
                            .attr("text-anchor", "middle")
                            .attr("dy", "-2.2em")
                            .attr("fill", "#64b5f6")
                            .attr("font-size", "11px")
                            .text(`${city.temperature}°C`);

                        // Weather condition
                        textGroup.append("text")
                            .attr("text-anchor", "middle")
                            .attr("dy", "-0.8em")
                            .attr("fill", "#e0e0e0")
                            .attr("font-size", "11px")
                            .text(`${city.weatherCondition}`);

                        // Humidity
                        textGroup.append("text")
                            .attr("text-anchor", "middle")
                            .attr("dy", "0.6em")
                            .attr("fill", "#80cbc4")
                            .attr("font-size", "11px")
                            .text(`Humidity: ${city.humidity}%`);

                        // Get bounding box of the text group to size the background properly
                        const textBox = (textGroup.node() as SVGGElement).getBBox();

                        // Size and position the background rect to fit all text
                        tooltipBg
                            .attr("x", textBox.x - 10)
                            .attr("y", textBox.y - 4)
                            .attr("width", textBox.width + 20)
                            .attr("height", textBox.height + 8);
                    }

                    // Add interactivity
                    markerGroup.style("cursor", "pointer")
                        .on("mouseenter", () => {
                            markerGroup.select("circle").attr("r", 14);
                            setActiveTooltip(city.name);
                        })
                        .on("mouseleave", () => {
                            markerGroup.select("circle").attr("r", 12);
                            setActiveTooltip(null);
                        });
                });

                // Add zoom and pan functionality with limits
                const zoom = d3.zoom()
                    .scaleExtent([0.7, 3])
                    .translateExtent([[-width * 0.5, -height * 0.5], [width * 1.5, height * 1.5]])
                    .on("zoom", (event) => {
                        mapGroup.attr("transform", event.transform);
                        markersGroup.attr("transform", event.transform);
                        tooltipGroup.attr("transform", event.transform);
                        d3.select("#grid-layer").attr("transform", event.transform);
                    });

                svg.call(zoom as any);
                zoomRef.current = zoom;
                setMapLoaded(true);
            })
            .catch(error => console.error("Error loading world map data:", error));

        // Cleanup
        return () => {
            d3.select(mapRef.current).selectAll("*").remove();
        };
    }, [cities, selectedCity, activeTooltip]);

    // Handle zoom in button click
    const handleZoomIn = () => {
        if (mapRef.current && zoomRef.current) {
            d3.select(mapRef.current)
                .transition()
                .duration(300)
                .call(zoomRef.current.scaleBy as any, 1.3);
        }
    };

    // Handle zoom out button click
    const handleZoomOut = () => {
        if (mapRef.current && zoomRef.current) {
            d3.select(mapRef.current)
                .transition()
                .duration(300)
                .call(zoomRef.current.scaleBy as any, 0.7);
        }
    };

    return (
        <div className="bg-dark-card rounded-2xl p-4 sm:p-6 mb-6 w-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg sm:text-xl font-semibold">World Map</h2>

                {/* Controls like in the image */}
                <div className="flex space-x-2">
                    <button
                        className="w-8 h-8 bg-dark-border rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors"
                        onClick={handleZoomIn}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="16"></line>
                            <line x1="8" y1="12" x2="16" y2="12"></line>
                        </svg>
                    </button>
                    <button
                        className="w-8 h-8 bg-dark-border rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors"
                        onClick={handleZoomOut}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="8" y1="12" x2="16" y2="12"></line>
                        </svg>
                    </button>
                </div>
            </div>

            <div className="relative h-[310px] rounded-lg overflow-hidden" ref={containerRef}>
                <svg ref={mapRef} className="w-full h-full"></svg>
                {!mapLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-dark-subtext">Loading map...</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StaticWorldMap; 