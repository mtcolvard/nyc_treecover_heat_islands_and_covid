// import React, { useState , useCallback } from 'react';
// import { MarksHistogram } from  './MarksHistogram'
//
// import { scaleSequential, schemeBlues, format, scaleLog, scaleLinear, scaleThreshold, scaleTime, max, timeFormat, extent, histogram as bin, timeMonths, sum } from 'd3'
//
//
// const width = 960;
// const height = 500;
// const margin = { top: 20, right: 50, bottom: 65, left: 90 };
// const innerHeight = height - margin.top - margin.bottom;
// const innerWidth = width - margin.left - margin.right;
// const xAxisLabelOffset = 54;
// const yAxisLabelOffset = 50;
//
// // const menuHeight = 40;
// // const xAxisLabelOffset = -60;
// // const yAxisLabelOffset = 60;
// // const initialMousePosition = {x: width/2, y: height/2}
// // const circleRadius = 10;
//
// export const TreeHistogram = ({ covidData }) => {
//
// // const initialMousePosition = {x: width/2, y: height/2}
// // const [mousePosition, setMousePosition] = useState(initialMousePosition);
// // const [hoveredValue, setHoveredValue] = useState(null);
// // const handleMouseMove = useCallback(event => {
// //   const { clientX, clientY } = event;
// //   setMousePosition({ x: clientX, y: clientY });
// // }, [setMousePosition]);
//
// //const covidDataFields = [MODIFIED_ZCTA, NEIGHBORHOOD_NAME, BOROUGH_GROUP, label, lat, lon, COVID_CASE_COUNT, COVID_CASE_RATE, POP_DENOMINATOR, COVID_DEATH_COUNT, COVID_DEATH_RATE, PERCENT_POSITIVE, TOTAL_COVID_TESTS]
//
// const attributes = [
//   { id: 1, value: 'NEIGHBORHOOD_NAME', label: 'Neighborhood', domainMin: 0, yColorScale: [0, 1] },
//   { id: 2, value: 'BOROUGH_GROUP', label: 'Borough', domainMin: 0, yColorScale: [10,100,200,250,300,350,400,450,500]  },
//   { id: 3, value: 'POP_DENOMINATOR', label: 'Neighborhood Population', domainMin: 0, yColorScale: [5000, 10000, 20000, 40000, 60000, 80000, 100000, 120000]  },
//   { id: 4, value: 'COVID_CASE_RATE', label: 'Cases/Neighborhood Population', domainMin: 1, yColorScale: [1000, 2000, 4000, 6000, 8000, 10000, 12500, 15000]  },
//   { id: 5, value: 'COVID_DEATHS_COUNT', label: 'Deaths', domainMin: 1, yColorScale: [10,100,200,250,300,350,400,450,500] },
//   { id: 6, value: 'PERCENT_POSITIVE', label: 'Positive Test Percentage (Cumulative)', domainMin: 1, yColorScale: [4,6,8,10,12,14,16,18,20] },
//   { id: 7, value: 'TOTAL_COVID_TESTS', label: 'Total Tests Administered', domainMin: 1, yColorScale: [4000,6000,9000,15000,30000,45000,60000,75000,90000] },
//   { id: 8, value: 'All Households', label: 'Median Income: All Households', domainMin: 1, yColorScale: [20000,40000,60000,80000,100000,120000,140000,160000,180000,200000] },
//   { id: 9, value: 'Families', label: 'Median Income: Families', domainMin: 1, yColorScale: [20000,40000,60000,80000,100000,120000,140000,160000,180000,200000] },
//   { id: 10, value: 'Families with Children', label: 'Median Income: Families with Children', domainMin: 1, yColorScale: [20000,40000,60000,80000,100000,120000,140000,160000,180000,200000] },
//   { id: 11, value: 'Families without Children', label: 'Median Income: Families without Children', domainMin: 1, yColorScale: [20000,40000,60000,80000,100000,120000,140000,160000,180000,200000] },
//   ]
//
//   const initialXAttribute = 'All Households'
//   const xValue = d => d[xAttribute];
//   const initialYAttribute = 'PERCENT_POSITIVE'
//   const yValue = d => d[yAttribute];
//   const [xAttribute, setXAttribute] = useState(initialXAttribute);
//   const [yAttribute, setYAttribute] = useState(initialYAttribute);
//
//   if (!covidData) {
//     return <pre>Loading...</pre>;
//   }
//
//   const getLabel = value => {
//     for(let i = 0; i < attributes.length; i++) {
//     if(attributes[i].value === value){
//       return attributes[i].label;
//     }}};
//
//   const getDomainMin = value => {
//     for(let i = 0; i < attributes.length; i++) {
//     if(attributes[i].value === value){
//       return attributes[i].domainMin;
//     }}};
//
//   const getYColorScale = value => {
//   for(let i = 0; i < attributes.length; i++) {
//   if(attributes[i].value === value){
//     return attributes[i].yColorScale;
//   }}};
//
//   const xAxisLabel = getLabel(xAttribute);
//   const siFormat = format('.2s');
//   const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');
// //  const xAxisTickFormat = timeFormat('%m/%d/%Y');
// //  const xColorValue = d => d[xAttribute];
//   const yDomainMin = getDomainMin(yAttribute);
//   const yAxisLabel = getLabel(yAttribute);
//   const yColorScale = getYColorScale(yAttribute);
//   const yColorValue = d => d[yAttribute];
//
// //THIS IS T0 BIN TIMESERIES DATA
// //  const xScale = scaleTime()
// //     .domain(extent(data, xValue))
// //     .range([0, innerWidth])
// //     .nice();
// // const [start, stop] = xScale.domain();
// // const binnedData = bin()
//   // .value(xValue)
//   // .domain(xScale.domain())
//   // .thresholds(timeMonths(start, stop))(covidData)
//   // .map(array => ({
//   //   y: sum(array, yValue),
//   //   x0: array.x0,
//   //   x1: array.x1
//   // }));
//
// //THIS IS FOR NON-Timeseries DATA
//   // const xScale = scaleSequential()
//   //   .domain(extent(covidData, xValue))
//   //   .range([0, innerWidth])
//   //   .nice();
//   const xScale = [0,1]
//
//   const binnedData = bin()
//     // .thresholds(
//     //   [10000,20000,30000,40000,50000,
//     //   60000,70000,80000,90000,100000,
//     //   110000,120000,130000,140000,150000,
//     //   160000,170000,180000,190000,200000,
//     //   210000,220000,230000,240000,250000])
//   //     .value(xValue)
//   //     .domain(xScale.domain())
//   //
//   // const yScale = scaleLinear()
//   //     .domain([0, max(binnedData, d => d.y)])
//   //     .range([innerHeight, 0])
//
//   // const yScale = scaleLog()
//   //   .domain([yDomainMin, max(data, yValue)])
//   //   .range([innerHeight - 50, 0])
//   // 	.nice();
//
// //   const colorScale =
// //     scaleThreshold()
// // //    	.domain([10,100,200,250,300,350,400,450,500])
// //   		.domain(yColorScale)
// //     	.range(schemeBlues[9]);
//
// return(
//   <g transform={`translate(${margin.left},${margin.top})`}>
//     <MarksHistogram
//         binnedData={binnedData}
//         xScale={xScale}
//         yScale={yScale}
//         tooltipFormat={d => d}
//         // colorScale={colorScale}
//         yColorValue={yColorValue}
//         // onHover={setHoveredValue}
//       />
//   </g>
// )}
