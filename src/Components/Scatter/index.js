import React, { useState , useCallback } from 'react';
import './style.css'
import { XAxis } from './XAxis'
import { YAxis } from './YAxis'
import { ScatterMarks }  from  './Marks'
import { max, format, scaleLinear, extent } from 'd3'

export const ScatterPlot = ({ covidData, keyedCovidData, width, height, hoveredValue, sendHoveredValue, scatterXAttribute, scatterYAttribute, attributes, xScaleMin, yScaleMin, rectFillColor, margin }) => {

  const circleRadius = 8
  const fadeOpacity = 0.3
  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right
  const xAxisLabelOffset = 48

  const xAxisLabel = attributes[scatterXAttribute].label
  const yAxisLabel = attributes[scatterYAttribute].label

  const xValue = d => d[scatterXAttribute]
  const yValue = d => d[scatterYAttribute]

  const xScale = scaleLinear()
    .domain([xScaleMin, max(covidData, xValue)])
    // .domain(extent(covidData, xValue))
    .range([0, innerWidth])
    .nice()

  const yScale = scaleLinear()
    .domain([yScaleMin, max(covidData, yValue)])
    // .domain(extent(covidData, yValue))
    .range([innerHeight, 0])
    .nice()

return(
  <>
    <rect width={width} height={height} fill={rectFillColor} />
    <g transform={`translate(${margin.left},${margin.top+18})`}>
      <XAxis
        xScale={xScale}
        innerHeight={innerHeight}
      />
      <YAxis
        yScale={yScale}
        innerWidth={innerWidth}
        />
      {hoveredValue!==false && <ScatterMarks
        data={covidData}
        xValue={xValue}
        yValue={yValue}
        xScale={xScale}
        yScale={yScale}
        circleRadius={circleRadius}
        fillColor={'#137B80'}
        opacity={0.3}
        // onHover={sendHoveredValue}
      />}
      {hoveredValue && <ScatterMarks
        data={[keyedCovidData.get(hoveredValue)]}
        xValue={xValue}
        yValue={yValue}
        xScale={xScale}
        yScale={yScale}
        circleRadius={circleRadius}
        fillColor={'#08519C'}
        opacity={1}
      />}
      <text
        className="chart-title"
        transform={`translate(${0}, -12)`}
        textAnchor="start"
      >Earned far less income...
      </text>
      <text
        className="axis-label" x={innerWidth/2} y={innerHeight + xAxisLabelOffset}
        textAnchor="middle"
      >Distribution of neighborhoods
      </text>
      <text
        className="axis-label"
        x={innerWidth/2} y={innerHeight + xAxisLabelOffset + 20}
        // alignment-baseling="hanging"
        textAnchor="middle"
      >by median household income
      </text>
    </g>
  </>
)}
