import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { RainChance } from '../../types/weather';

interface RainChanceChartProps {
    data: RainChance[];
}

const RainChanceChart: React.FC<RainChanceChartProps> = ({ data }) => {
    const chartRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        // Clear previous chart
        d3.select(chartRef.current).selectAll('*').remove();

        // Chart dimensions
        const margin = { top: 30, right: 20, bottom: 30, left: 60 };
        const width = chartRef.current.clientWidth - margin.left - margin.right;
        const height = 350 - margin.top - margin.bottom;

        // Create SVG
        const svg = d3.select(chartRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Define scales
        const xScale = d3.scaleBand()
            .domain(data.map(d => d.time))
            .range([0, width])
            .padding(0.5);

        const yScale = d3.scalePoint()
            .domain(['Rainy', 'Sunny', 'Heavy'])
            .range([0, height - 20])
            .padding(0.5);

        // Add horizontal grid lines
        svg.selectAll('line.grid')
            .data(['Rainy', 'Sunny', 'Heavy'])
            .enter()
            .append('line')
            .attr('class', 'grid')
            .attr('x1', 0)
            .attr('x2', width)
            .attr('y1', d => yScale(d) as number)
            .attr('y2', d => yScale(d) as number)
            .attr('stroke', '#2A2E35')
            .attr('stroke-width', 1)
            .attr('stroke-dasharray', '3,3')
            .attr('opacity', 0.3);

        // Add category labels (y-axis)
        svg.selectAll('text.y-label')
            .data(['Rainy', 'Sunny', 'Heavy'])
            .enter()
            .append('text')
            .attr('class', 'y-label')
            .attr('x', -10)
            .attr('y', d => (yScale(d) as number) + 4)
            .attr('text-anchor', 'end')
            .attr('fill', '#A1A1AA')
            .attr('font-size', '12px')
            .text(d => d);

        // Add vertical bars for each time period
        data.forEach(d => {
            // Calculate bar height based on value
            const barHeight = d.value * 0.6; // Scale to look good visually

            // Gradient for the bars
            const gradient = svg.append('linearGradient')
                .attr('id', `bar-gradient-${d.time}`)
                .attr('x1', '0%')
                .attr('y1', '0%')
                .attr('x2', '0%')
                .attr('y2', '100%');

            gradient.append('stop')
                .attr('offset', '0%')
                .attr('stop-color', '#64b5f6')
                .attr('stop-opacity', 1);

            gradient.append('stop')
                .attr('offset', '100%')
                .attr('stop-color', '#64b5f6')
                .attr('stop-opacity', 0.5);

            svg.append('rect')
                .attr('x', xScale(d.time) as number + xScale.bandwidth() / 2 - 3)
                .attr('y', (yScale(d.type) as number) - barHeight / 2)
                .attr('width', 6)
                .attr('height', barHeight)
                .attr('rx', 3)
                .attr('ry', 3)
                .attr('fill', `url(#bar-gradient-${d.time})`);
        });

        // Add time labels (x-axis)
        svg.selectAll('text.x-label')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'x-label')
            .attr('x', d => (xScale(d.time) as number) + xScale.bandwidth() / 2)
            .attr('y', height + 15)
            .attr('text-anchor', 'middle')
            .attr('fill', '#A1A1AA')
            .attr('font-size', '12px')
            .text(d => d.time);

        // Add chart title
        svg.append('text')
            .attr('x', -margin.left + 10)
            .attr('y', -margin.top + 15)
            .attr('font-size', '14px')
            .attr('font-weight', 'bold')
            .attr('fill', 'white')
            .text('Chance of rain');

    }, [data]);

    return (
        <div className="bg-dark-card rounded-2xl p-4 sm:p-6 mb-6">
            <svg ref={chartRef} width="100%" height="350" className="overflow-visible"></svg>
        </div>
    );
};

export default RainChanceChart; 