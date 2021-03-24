import React, { useState , useCallback } from 'react';
import './style.css'
import { AxisBottom } from './AxisBottom'
import { AxisLeft } from './AxisLeft'
import { ScatterMarks }  from  './Marks'
import { max, format, scaleLinear, extent } from 'd3'

export const ScatterPlot = ({ covidData, width, height, hoveredValue }) => {

  const circleRadius = 8
  const fadeOpacity = 0.3
  const margin = { top: 20, right: 20, bottom: 65, left: 80 }
  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right
  const xAxisLabelOffset = 54
  const yAxisLabelOffset = 50

  const attributes = {
    NEIGHBORHOOD_NAME: { id: 1, value: 'NEIGHBORHOOD_NAME', label: 'Neighborhood', domainMin: 0, yColorScale: [0, 1] },
    BOROUGH_GROUP: { id: 2, value: 'BOROUGH_GROUP', label: 'Borough', domainMin: 0, yColorScale: [10,100,200,250,300,350,400,450,500]  },
    POP_DENOMINATOR: { id: 3, value: 'POP_DENOMINATOR', label: 'Neighborhood Population', domainMin: 0, yColorScale: [5000, 10000, 20000, 40000, 60000, 80000, 100000, 120000]  },
    COVID_CASE_RATE: { id: 4, value: 'COVID_CASE_RATE', label: 'Cases/Neighborhood Population', domainMin: 1, yColorScale: [1000, 2000, 4000, 6000, 8000, 10000, 12500, 15000]  },
    COVID_DEATH_COUNT: { id: 5, value: 'COVID_DEATH_COUNT', label: 'Deaths', domainMin: 1, yColorScale: [10,100,200,250,300,350,400,450,500] },
    PERCENT_POSITIVE: { id: 6, value: 'PERCENT_POSITIVE', label: 'Positive Test Percentage (Cumulative)', domainMin: 1, yColorScale: [4,6,8,10,12,14,16,18,20] },
    TOTAL_COVID_TESTS: { id: 7, value: 'TOTAL_COVID_TESTS', label: 'Total Tests Administered', domainMin: 1, yColorScale: [4000,6000,9000,15000,30000,45000,60000,75000,90000] },
    ALL_HOUSEHOLDS: { id: 8, value: 'ALL_HOUSEHOLDS', label: 'Median Income: All Households', domainMin: 1, yColorScale: [20000,40000,60000,80000,100000,120000,140000,160000,180000,200000] },
    FAMILIES: { id: 9, value: 'FAMILIES', label: 'Median Income: Families', domainMin: 1, yColorScale: [20000,40000,60000,80000,100000,120000,140000,160000,180000,200000] },
    FAMILIES_WITH_CHILDREN: { id: 10, value: 'FAMILIES_WITH_CHILDREN', label: 'Median Income: Families with Children', domainMin: 1, yColorScale: [20000,40000,60000,80000,100000,120000,140000,160000,180000,200000] },
    FAMILIES_WITHOUT_CHILDREN: { id: 11, value: 'FAMILIES_WITHOUT_CHILDREN', label: 'Median Income: Families without Children', domainMin: 1, yColorScale: [20000,40000,60000,80000,100000,120000,140000,160000,180000,200000] },
  }

  const siFormat = format('.2s');
  const percFormat = format('');
  const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B')
  const yAxisTickFormat = tickValue => percFormat(tickValue).replace('G', 'B')


  const attributeOptions = Object.keys(attributes)
  const initialXAttribute = 'ALL_HOUSEHOLDS'
  const initialYAttribute = 'PERCENT_POSITIVE'
  const [xAttribute, setXAttribute] = useState(initialXAttribute)
  const [yAttribute, setYAttribute] = useState(initialYAttribute)
  const xAxisLabel = attributes[xAttribute].label
  const yAxisLabel = attributes[yAttribute].label

  const xValue = d => d[xAttribute]
  const yValue = d => d[yAttribute]
  // const zipCode = d => d['MODIFIED_ZCTA']
  // const filteredData = covidData.filter(d => hoveredValue[0].MODIFIED_ZCTA === zipCode(d))
  // console.log('hoveredValue', hoveredValue[0])

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
        tooltipFormat={d => d}
      />
      <ScatterMarks
        data={[hoveredValue]}
        xValue={xValue}
        yValue={yValue}
        xScale={xScale}
        yScale={yScale}
        circleRadius={circleRadius}
        fillColor={'#08519C'}
        opacity={ hoveredValue !== {null:null} ? 1 : 0}
        tooltipFormat={d => d}
      />
    </g>
  </>
)}

// colorScale={colorScale}
// yColorValue={yColorValue}
// onHover={setHoveredValue}
