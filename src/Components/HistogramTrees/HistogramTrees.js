import React, { useState , useCallback } from 'react'
import ReactDropdown from 'react-dropdown'
import './style.css'
import { HistogramMarks } from  './Marks'
// import { AxisBottom } from './AxisBottom'
import { XAxis } from './XAxis'
import { YAxis } from './YAxis'
import { schemeBlues, scaleLinear, format, max, extent, bin, sum, count, mean } from 'd3'

export const HistogramTrees = ({ covidData, width, height, hoveredValue, sendHoveredValue, histogramXAttribute, histogramYAttribute, attributes, xScaleMin, xScaleMax, yScaleMin, yScaleMax, rectFillColor }) => {

  const margin = { top: 20, right: 20, bottom: 65, left: 60 }
  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right
  const xAxisLabelOffset = 54

  const siFormat = format('.2s');
  const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');
  const yAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');
  const xAxisLabel = attributes[histogramXAttribute].label

  const xValue = d => d[histogramXAttribute]
  const yValue = d => d[histogramYAttribute]

  const xScale = scaleLinear()
    .domain([xScaleMin, max(covidData, xValue)])
    // .domain(extent(covidData, xValue))
    .range([0, innerWidth])
    .nice()

  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(xScale.ticks(14))
    (covidData)
    .map(array => ({
      y: mean(array, yValue),
      // y: sum(array, yValue),
      x0: array.x0,
      x1: array.x1
    }))

  const yScale = scaleLinear()
    // .domain(extent(binnedData, d => d.y))
    // .domain([yScaleMin, max(binnedData, d => d.y)])
    .domain([yScaleMin, 22])
    // .domain([yScaleMin, max(yScaleMax)])
    .range([innerHeight, 0])
    .nice()

return(
  <>
    <rect width={width} height={height} fill={rectFillColor} />
      <g transform={`translate(${margin.left},${margin.top})`}>
          <XAxis
            xScale={xScale}
            innerHeight={innerHeight}
            // tickFormat={xAxisTickFormat}
            // tickOffset={8}
          />
          <YAxis
            yScale={yScale}
            innerWidth={innerWidth}
            // tickFormat={yAxisTickFormat}
            // tickOffset={5}
            />
          <text
            className="axis-label"
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
            textAnchor="middle"
          >
            {xAxisLabel}
          </text>
          <HistogramMarks
            binnedData={binnedData}
            xScale={xScale}
            yScale={yScale}
            tooltipFormat={d => d}
            circleRadius={2}
            innerHeight={innerHeight}
          />
    </g>
  </>
)}


// <AxisBottom
//   xScale={xScale}
//   innerHeight={innerHeight}
//   tickFormat={xAxisTickFormat}
//   tickOffset={8}
// />


// <g transform={`translate(${margin.left},${margin.top})`}>
//   <div className="menus-container">
//     <span className="dropdown-label">x</span>
//     <ReactDropdown
//       options={attributeOptions}
//       value={histogramXAttribute}
//       onChange={({ value }) => setXAttribute(value)}
//      />
//    <span className="dropdown-label">y</span>
//     <ReactDropdown
//       options={attributeOptions}
//       value={histogramYAttribute}
//       onChange={({ value }) => setYAttribute(value)}
//     />
//   </div>
//   <div className="chart-container">
//     <AxisBottom
//       xScale={xScale}
//       innerHeight={innerHeight}
//       tickFormat={xAxisTickFormat}
//       tickOffset={8}
//     />
//     <text
//       className="axis-label"
//       textAnchor="middle"
//       transform={`translate(${-yAxisLabelOffset},${innerHeight /
//         2}) rotate(-90)`}
//     >
//       {yAxisLabel}
//     </text>
//     <AxisLeft
//       yScale={yScale}
//       innerWidth={innerWidth}
//       tickFormat={yAxisTickFormat}
//       tickOffset={5}
//       />
//     <text
//       className="axis-label"
//       x={innerWidth / 2}
//       y={innerHeight + xAxisLabelOffset}
//       textAnchor="middle"
//     >
//       {xAxisLabel}
//     </text>
//     <MarksHistogram
//       binnedData={binnedData}
//       xScale={xScale}
//       yScale={yScale}
//       tooltipFormat={d => d}
//       circleRadius={2}
//       innerHeight={innerHeight}
//     />
// </div>
// </g>
