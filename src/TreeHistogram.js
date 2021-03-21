import React, { useState , useCallback } from 'react'
import ReactDropdown from 'react-dropdown'
import { MarksHistogram } from  './MarksHistogram'
import { AxisBottom } from './AxisBottom'
import { AxisLeft } from './AxisLeft'
import { Dropdown } from './Dropdown'


import { scaleSequential, schemeBlues, format, scaleLog, scaleLinear, scaleThreshold, scaleTime, max, timeFormat, extent, bin, timeMonths, sum, count } from 'd3'


const width = 960
const height = 500
const margin = { top: 60, right: 50, bottom: 65, left: 90 }
const innerHeight = height - margin.top - margin.bottom
const innerWidth = width - margin.left - margin.right
const xAxisLabelOffset = 54
const yAxisLabelOffset = 50

// const menuHeight = 40
// const xAxisLabelOffset = -60
// const yAxisLabelOffset = 60
// const initialMousePosition = {x: width/2, y: height/2}
// const circleRadius = 10

export const TreeHistogram = ({ covidData }) => {

//const covidDataFields = [MODIFIED_ZCTA, NEIGHBORHOOD_NAME, BOROUGH_GROUP, label, lat, lon, COVID_CASE_COUNT, COVID_CASE_RATE, POP_DENOMINATOR, COVID_DEATH_COUNT, COVID_DEATH_RATE, PERCENT_POSITIVE, TOTAL_COVID_TESTS]

const attributes = {
  NEIGHBORHOOD_NAME: { id: 1, value: 'NEIGHBORHOOD_NAME', label: 'Neighborhood', domainMin: 0, yColorScale: [0, 1] },
  BOROUGH_GROUP: { id: 2, value: 'BOROUGH_GROUP', label: 'Borough', domainMin: 0, yColorScale: [10,100,200,250,300,350,400,450,500]  },
  POP_DENOMINATOR: { id: 3, value: 'POP_DENOMINATOR', label: 'Neighborhood Population', domainMin: 0, yColorScale: [5000, 10000, 20000, 40000, 60000, 80000, 100000, 120000]  },
  COVID_CASE_RATE: { id: 4, value: 'COVID_CASE_RATE', label: 'Cases/Neighborhood Population', domainMin: 1, yColorScale: [1000, 2000, 4000, 6000, 8000, 10000, 12500, 15000]  },
  COVID_DEATHS_COUNT: { id: 5, value: 'COVID_DEATHS_COUNT', label: 'Deaths', domainMin: 1, yColorScale: [10,100,200,250,300,350,400,450,500] },
  PERCENT_POSITIVE: { id: 6, value: 'PERCENT_POSITIVE', label: 'Positive Test Percentage (Cumulative)', domainMin: 1, yColorScale: [4,6,8,10,12,14,16,18,20] },
  TOTAL_COVID_TESTS: { id: 7, value: 'TOTAL_COVID_TESTS', label: 'Total Tests Administered', domainMin: 1, yColorScale: [4000,6000,9000,15000,30000,45000,60000,75000,90000] },
  ALL_HOUSEHOLDS: { id: 8, value: 'ALL_HOUSEHOLDS', label: 'Median Income: All Households', domainMin: 1, yColorScale: [20000,40000,60000,80000,100000,120000,140000,160000,180000,200000] },
  FAMILIES: { id: 9, value: 'FAMILIES', label: 'Median Income: Families', domainMin: 1, yColorScale: [20000,40000,60000,80000,100000,120000,140000,160000,180000,200000] },
  FAMILIES_WITH_CHILDREN: { id: 10, value: 'FAMILIES_WITH_CHILDREN', label: 'Median Income: Families with Children', domainMin: 1, yColorScale: [20000,40000,60000,80000,100000,120000,140000,160000,180000,200000] },
  FAMILIES_WITHOUT_CHILDREN: { id: 11, value: 'FAMILIES_WITHOUT_CHILDREN', label: 'Median Income: Families without Children', domainMin: 1, yColorScale: [20000,40000,60000,80000,100000,120000,140000,160000,180000,200000] },
}

  const attributeOptions = Object.keys(attributes)

  const initialXAttribute = 'ALL_HOUSEHOLDS'
  const initialYAttribute = 'POP_DENOMINATOR'
  const [xAttribute, setXAttribute] = useState(initialXAttribute)
  const [yAttribute, setYAttribute] = useState(initialYAttribute)

  const xValue = d => d[xAttribute]
  const yValue = d => d[yAttribute]

  const xAxisLabel = attributes[xAttribute].label
  const yAxisLabel = attributes[yAttribute].label

  const siFormat = format('.2s');
  const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');
  const yAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');


  console.log('check xAxisLabel', yAxisLabel)
  if (!covidData) {
    return <pre>Loading...</pre>
  }

  const xScale = scaleLinear()
    .domain(extent(covidData, xValue))
    .range([0, innerWidth])
    .nice()


  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(xScale.ticks(20))
    (covidData)
    .map(array => ({
      y: sum(array, yValue),
      x0: array.x0,
      x1: array.x1
    }))

  const yScale = scaleLinear()
    .domain([0, max(binnedData, d => d.y)])
    .range([innerHeight, 0])


  console.log('y scale domain', yScale.domain())
  console.log('covid data count', count(covidData, xValue))

return(
  <>
  <div className="menus-container">
    <span className="dropdown-label">x</span>
    <ReactDropdown
      options={attributeOptions}
      value={xAttribute}
      onChange={({ value }) => setXAttribute(value)}
     />
   <span className="dropdown-label">y</span>
    <ReactDropdown
      options={attributeOptions}
      value={yAttribute}
      onChange={({ value }) => setYAttribute(value)}
    />
  </div>
  <div className="chart-container">
    <svg width={width} height={height}>
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
          <MarksHistogram
            binnedData={binnedData}
            xScale={xScale}
            yScale={yScale}
            tooltipFormat={d => d}
            circleRadius={2}
            innerHeight={innerHeight}
          />
        </g>
      </svg>
    </div>
  </>
)}

// <MarksHistogram
//     binnedData={binnedData}
//     xScale={xScale}
//     yScale={yScale}
//     tooltipFormat={d => d}
//     // colorScale={colorScale}
//     // yColorValue={yColorValue}
//     // onHover={setHoveredValue}
//   />
