import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

/**
 * WorldMap renders a simple D3 world map. It converts the
 * world_map_route.js demo into a reusable React component by
 * drawing the same GeoJSON data inside a React lifecycle.
 */
export default function WorldMap() {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    const projection = d3.geoNaturalEarth1()
      .scale(width / 1.3 / Math.PI)
      .translate([width / 2, height / 2]);
    const path = d3.geoPath(projection);

    svg.selectAll('*').remove();
    svg.attr('viewBox', `0 0 ${width} ${height}`);

    d3.json('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
      .then((geojson) => {
        svg.append('g')
          .selectAll('path')
          .data(geojson.features)
          .enter()
          .append('path')
          .attr('d', path)
          .attr('fill', '#d4d4d4')
          .attr('stroke', '#999');
      })
      .catch((err) => console.error('Failed to load map', err));
  }, []);

  return <svg ref={svgRef} style={{ width: '100%', height: '100%' }} />;
}
