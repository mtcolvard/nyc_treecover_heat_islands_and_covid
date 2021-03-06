import React, { useState , useCallback } from 'react'
import ReactDropdown from 'react-dropdown'
import './style.css'
import { HistogramMarks } from  './Marks'
// import { AxisBottom } from './AxisBottom'
import { XAxis } from './XAxis'
import { YAxis } from './YAxis'
import { schemeBlues, scaleLinear, format, max, extent, bin, sum, count, mean } from 'd3'

export const DegreeHistogram = ({ covidData, width, height, hoveredValue, sendHoveredValue, histogramXAttribute, histogramYAttribute, attributes, xScaleMin, xScaleMax, yScaleMin, yScaleMax, rectFillColor, margin }) => {

  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right
  const xAxisLabelOffset = 48
  const xAxisLabel = attributes[histogramXAttribute].label

  const xValue = d => d[histogramXAttribute]
  const yValue = d => d[histogramYAttribute]

  const xScale = scaleLinear()
    .domain([xScaleMin, max(covidData, xValue)])
    .range([0, innerWidth])
    .nice()

  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(xScale.ticks(14))
    (covidData)
    .map(array => ({
      y: mean(array, yValue),
      x0: array.x0,
      x1: array.x1
    }))

  const yScale = scaleLinear()
    .domain([yScaleMin, max(binnedData, d => d.y)])
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
          <HistogramMarks
            binnedData={binnedData}
            xScale={xScale}
            yScale={yScale}
            tooltipFormat={d => d}
            circleRadius={2}
            innerHeight={innerHeight}
          />
          <text
            className="chart-title"
            transform={`translate(-6, -12)`}
            textAnchor="start"
          >And suffered much higher temperatures
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
          >by average August temperature
          </text>

    </g>
  </>
)}
