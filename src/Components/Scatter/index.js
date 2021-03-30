import React, { useState , useCallback } from 'react';
import './style.css'
import { AxisBottom } from './AxisBottom'
import { AxisLeft } from './AxisLeft'
import { ScatterMarks }  from  './Marks'
import { max, format, scaleLinear, extent } from 'd3'

export const ScatterPlot = ({ covidData, keyedCovidData, width, height, hoveredValue, sendHoveredValue, scatterXAttribute, scatterYAttribute, attributes }) => {

  const circleRadius = 8
  const fadeOpacity = 0.3
  const margin = { top: 20, right: 20, bottom: 65, left: 80 }
  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right
  const xAxisLabelOffset = 54
  const yAxisLabelOffset = 50


  const siFormat = format('.2s');
  const percFormat = format('');
  const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B')
  const yAxisTickFormat = tickValue => percFormat(tickValue).replace('G', 'B')
  const xAxisLabel = attributes[scatterXAttribute].label
  const yAxisLabel = attributes[scatterYAttribute].label

  const xValue = d => d[scatterXAttribute]
  const yValue = d => d[scatterYAttribute]

  const xScale = scaleLinear()
    .domain([0, max(covidData, xValue)])
    .range([0, innerWidth])
    .nice()

  const yScale = scaleLinear()
    .domain([0, max(covidData, yValue)])
    .range([innerHeight, 0])
    .nice()

return(
  <>
    <rect width={width} height={height} fill='white' />
    <g transform={`translate(${margin.left},${margin.top})`}>
      <AxisBottom
        xScale={xScale}
        innerHeight={innerHeight}
        tickFormat={xAxisTickFormat}
        tickOffset={8}
      />
      <text
        className="axis-label"
        textAnchor="middle"
        transform={`translate(${-yAxisLabelOffset},${innerHeight /
          2}) rotate(-90)`}
      >
        {yAxisLabel}
      </text>
      <AxisLeft
        yScale={yScale}
        innerWidth={innerWidth}
        tickFormat={yAxisTickFormat}
        tickOffset={5}
        />
      <text
        className="axis-label"
        x={innerWidth / 2}
        y={innerHeight + xAxisLabelOffset}
        textAnchor="middle"
      >
        {xAxisLabel}
      </text>
      <ScatterMarks
        data={covidData}
        xValue={xValue}
        yValue={yValue}
        xScale={xScale}
        yScale={yScale}
        circleRadius={circleRadius}
        fillColor={'#137B80'}
        opacity={0.3}
        onHover={sendHoveredValue}
        // tooltipFormat={d => d}
      />
      {hoveredValue && <ScatterMarks
        data={[keyedCovidData.get(hoveredValue)]}
        xValue={xValue}
        yValue={yValue}
        xScale={xScale}
        yScale={yScale}
        circleRadius={circleRadius}
        fillColor={'#08519C'}
        opacity={1}
        // tooltipFormat={d => d}
      />}
    </g>
  </>
)}
