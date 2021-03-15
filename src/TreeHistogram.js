import React, { useState, useCallback } from 'react';
import { MarksHistogram } from  './MarksHistogram'
import { schemeBlues, format, scaleLog, scaleLinear, scaleThreshold, scaleTime, max, timeFormat, extent, histogram as bin, timeMonths, sum } from 'd3'


const width = 960;
const height = 500;
const margin = { top: 70, right: 200, bottom: 15, left: 220 };

// const menuHeight = 40;
// const xAxisLabelOffset = -60;
// const yAxisLabelOffset = 60;
// const initialMousePosition = {x: width/2, y: height/2}
// const circleRadius = 10;

export const TreeHistogram = ({ covidData }) => {

const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;

const initialMousePosition = {x: width/2, y: height/2}
const [mousePosition, setMousePosition] = useState(initialMousePosition);
const [hoveredValue, setHoveredValue] = useState(null);

const handleMouseMove = useCallback(event => {
  const { clientX, clientY } = event;
  setMousePosition({ x: clientX, y: clientY });
}, [setMousePosition]);

//const covidDataFields = [MODIFIED_ZCTA, NEIGHBORHOOD_NAME, BOROUGH_GROUP, label, lat, lon, COVID_CASE_COUNT, COVID_CASE_RATE, POP_DENOMINATOR, COVID_DEATH_COUNT, COVID_DEATH_RATE, PERCENT_POSITIVE, TOTAL_COVID_TESTS]
const attributes = [
  { id: 1, modZipTract: 'MODIFIED_ZCTA', value: 'NEIGHBORHOOD_NAME', label: 'Neighborhood', domainMin: 0, yColorScale: [0, 1] },
  { id: 2, modZipTract: 'MODIFIED_ZCTA', value: 'BOROUGH_GROUP', label: 'Borough', domainMin: 0, yColorScale: [10,100,200,250,300,350,400,450,500]  },
  { id: 3, modZipTract: 'MODIFIED_ZCTA', value: 'POP_DENOMINATOR', label: 'Neighborhood Population', domainMin: 0, yColorScale: [5000, 10000, 20000, 40000, 60000, 80000, 100000, 120000]  },
  { id: 4, modZipTract: 'MODIFIED_ZCTA', value: 'COVID_CASE_RATE', label: 'Cases/Neighborhood Population', domainMin: 1, yColorScale: [1000, 2000, 4000, 6000, 8000, 10000, 12500, 15000]  },
  { id: 5, modZipTract: 'MODIFIED_ZCTA', value: 'COVID_DEATHS_COUNT', label: 'Deaths', domainMin: 1, yColorScale: [10,100,200,250,300,350,400,450,500] },
  { id: 6, modZipTract: 'MODIFIED_ZCTA', value: 'PERCENT_POSITIVE', label: 'Positive Test Percentage (Cumulative)', domainMin: 1, yColorScale: [4,6,8,10,12,14,16,18,20] },
  { id: 7, modZipTract: 'MODIFIED_ZCTA', value: 'TOTAL_COVID_TESTS', label: 'Total Tests Administered', domainMin: 1, yColorScale: [4000,6000,9000,15000,30000,45000,60000,75000,90000] },
  ]

const getLabel = value => {
  for(let i = 0; i < attributes.length; i++) {
  if(attributes[i].value === value){
    return attributes[i].label;
  }}};

const getDomainMin = value => {
  for(let i = 0; i < attributes.length; i++) {
  if(attributes[i].value === value){
    return attributes[i].domainMin;
  }}};

  const getYColorScale = value => {
  for(let i = 0; i < attributes.length; i++) {
  if(attributes[i].value === value){
    return attributes[i].yColorScale;
  }}};

  const initialXAttribute = 'Families'
  const [xAttribute, setXAttribute] = useState(initialXAttribute);

  const xValue = d => d[xAttribute];
  const xAxisLabel = getLabel(xAttribute);
//  const xColorValue = d => d[xAttribute];

  const initialYAttribute = 'DeathRate'
  const [yAttribute, setYAttribute] = useState(initialYAttribute);

  const yValue = d => d[yAttribute];
  const yDomainMin = getDomainMin(yAttribute);
  const yAxisLabel = getLabel(yAttribute);
  const yColorScale = getYColorScale(yAttribute);
  const yColorValue = d => d[yAttribute];

  const siFormat = format('.2s');
  const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLog()
    .domain([yDomainMin, max(data, yValue)])
    .range([innerHeight - 50, 0])
  	.nice();

  const colorScale =
    scaleThreshold()
//    	.domain([10,100,200,250,300,350,400,450,500])
  		.domain(yColorScale)
    	.range(schemeBlues[9]);

return(
  <g transform={`translate(${margin.left},${margin.top})`}>
    <MarksHistogram
        binnedData={binnedData}
        xScale={xScale}
        yScale={yScale}
        tooltipFormat={d => d}
        colorScale={colorScale}
        yColorValue={yColorValue}
        onHover={setHoveredValue}
      />
  </g>
)}

// <AxisBottom
//   xScale={xScale}
//   innerHeight={innerHeight - 100}
//   tickFormat={xAxisTickFormat}
// />
// <text
//   className="axis-label"
//   x={yAxisLabelOffset}
//   y={-15}
//   textAnchor="middle"
// >
//   {yAxisLabel}
// </text>
// <AxisLeft yScale={yScale} innerWidth={innerWidth}/>
// <text
//   className="axis-label"
//   x={innerWidth / 2}
//   y={innerHeight + xAxisLabelOffset}
//   textAnchor="middle"
// >
//   {xAxisLabel}
// </text>
// <g transform={`translate(${innerWidth +100})`}>
//   <ColorLegend
//     colorScale={colorScale}
//     yColorValue={yColorValue}
//     legendTickSpacing={20}
//     legendTickSize={5}
//     legendTickTextOffset={20}
//     circleRadius={circleRadius}
//   />
// </g>
