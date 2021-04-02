import React, { useState, useEffect, useCallback } from 'react'
import ReactDropdown from 'react-dropdown'
import './App.css'
import { useBoundaries } from './useBoundaries'
import { useCovidData } from './useCovidData'
import { useMousePosition } from './useMousePosition'
import { Histogram } from './Histogram/index'
import { NycMap } from './Map/index'
import { ScatterPlot } from './Scatter/index'
import { Dropdown } from './Dropdown'
import { BinnedScatter } from './BinnedScatter/index'
import { Maps } from './Maps'

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
  area: {id:12, value:'area', label: 'area', domainMin: 1, ycolorScale: [4,6,8,10,12,14,16,18,20]},
  count: {id:13, value:'count', label: 'count', domainMin: 1, ycolorScale: [4,6,8,10,12,14,16,18,20]},
  sum: {id:14, value:'sum', label: 'sum', domainMin: 1, ycolorScale: [4,6,8,10,12,14,16,18,20]},
  mean: {id:15, value:'mean', label: 'mean', domainMin: 80, ycolorScale: [80,82,84,86,88,90,92,94,96,98,100]},
  median: {id:16, value:'median', label: 'median', domainMin: 80, ycolorScale: [80,82,84,86,88,90,92,94,96,98,100]},
  stdev: {id:17, value:'stdev', label: 'stdev', domainMin: 1, ycolorScale: [4,6,8,10,12,14,16,18,20]},
  range: {id:18, value:'range', label: 'range', domainMin: 1, ycolorScale: [4,6,8,10,12,14,16,18,20]},
  majority: {id:19, value:'majority', label: 'majority', domainMin: 1, ycolorScale: [4,6,8,10,12,14,16,18,20]},
  variance: {id:20, value:'variance', label: 'variance', domainMin: 1, ycolorScale: [4,6,8,10,12,14,16,18,20]},
  treesPerMilesq: {id:21, value:'treesPerMilesq', label: 'treesPerMilesq', domainMin: 1, ycolorScale: [4,6,8,10,12,14,16,18,20]},
  MODIFIED_ZCTA: {id:22, value:'MODIFIED_ZCTA', label: 'MODIFIED_ZCTA', domainMin: 1, ycolorScale: [4,6,8,10,12,14,16,18,20]},
}

const mainWidth = 1280
const mainHeight = 1280
const dropdownWidth = 40
const dropdownHeight = 160
const margin = { top: 20, right: 20, bottom: 20, left:20 }
const svgMapWidth = mainWidth - dropdownWidth
const svgMapHeight = mainHeight - dropdownHeight
const svgWidth = mainWidth - dropdownWidth
const svgHeight = mainHeight - dropdownHeight
const graphHeight = 0.5

// const mapboxToken = process.env.REACT_APP_MAPBOX_KEY

// pk.eyJ1IjoibXRjb2x2YXJkIiwiYSI6ImNqemI4emZydjA2dHIzYm80ZG96ZmQyN2wifQ.kVp6eB7AkWjslUOtsJyLDQ

const App = () => {
  const boundaries = useBoundaries()
  const covidData = useCovidData()
  const attributeOptions = Object.keys(attributes)

  const scatterInitialXAttribute = 'ALL_HOUSEHOLDS'
  const scatterInitialYAttribute = 'PERCENT_POSITIVE'
  const histogramInitialXAttribute = 'treesPerMilesq'
  const histogramInitialYAttribute = 'PERCENT_POSITIVE'
  const histogramTwoInitialXAttribute = 'majority'
  const histogramTwoInitialYAttribute = 'PERCENT_POSITIVE'

  const [scatterXAttribute, setScatterXAttribute] = useState(scatterInitialXAttribute)
  const [scatterYAttribute, setScatterYAttribute] = useState(scatterInitialYAttribute)
  const [histogramXAttribute, setHistogramXAttribute] = useState(histogramInitialXAttribute)
  const [histogramYAttribute, setHistogramYAttribute] = useState(histogramInitialYAttribute)
  const [histogramTwoXAttribute, setHistogramTwoXAttribute] = useState(histogramTwoInitialXAttribute)
  const [histogramTwoYAttribute, setHistogramTwoYAttribute] = useState(histogramTwoInitialYAttribute)

  const mousePosition = [0, 0]

  const [hoveredValue, setHoveredValue] = useState(null)
  const handleSetHoveredValue = useCallback((d) => {
    d ? setHoveredValue(d) : setHoveredValue(null)
  }, [])
  // const [hoveredValue, setHoveredValue] = useState(null)
  // const handleSetHoveredValue = useCallback((d) => {
  //   d ? setHoveredValue([d]) : setHoveredValue(null)
  // }, [])

  if (!boundaries || !covidData) {
    return <pre>Loading...</pre>
  }

  const keyedCovidData = new Map()
    covidData.forEach(d => {
      keyedCovidData.set(d.MODIFIED_ZCTA, d)
    })
    //
    // src='https://api.mapbox.com//styles/mtcolvard/ckmzb6l1603hr17mtbxwmn1w8.html?title=true&zoomwheel=false&access_token=pk.eyJ1IjoibXRjb2x2YXJkIiwiYSI6ImNrbXpjMXV2dzAxOW4ycHBiZDB1NzE0amsifQ.p28rFaL7eqlLVZ0hdS-t_w#10/40.716/-73.971'

// https://api.mapbox.com/styles/v1/mtcolvard/ckmzb6l1603hr17mtbxwmn1w8.html?fresh=true&title=copy&access_token=pk.eyJ1IjoibXRjb2x2YXJkIiwiYSI6ImNqemI4emZydjA2dHIzYm80ZG96ZmQyN2wifQ.kVp6eB7AkWjslUOtsJyLDQ

    // <div>
    //   <div className="divZero">Maps</div>
    //   <Maps />
    // </div>
  return (
    <>
      <div className="svg-iframe-container">
        <div className="sideBySide" transform={`translate(0, 0)`}>
          <iframe
            src={`https://api.mapbox.com/styles/v1/mtcolvard/ckmzb6l1603hr17mtbxwmn1w8.html?fresh=true&title=false&access_token=pk.eyJ1IjoibXRjb2x2YXJkIiwiYSI6ImNqemI4emZydjA2dHIzYm80ZG96ZmQyN2wifQ.kVp6eB7AkWjslUOtsJyLDQ`}


            width={`${svgWidth/2}`} height={svgHeight/2} title='NYC Heat Islands, Foliage, and Covid'>
          </iframe>
        </div>
      </div>

      <svg className="sideBySide" width={svgWidth/2} height={svgHeight/2} margin={0}>
        <g
        transform={`translate(0, 0)`}>
          <NycMap
            boundaries={boundaries}
            covidData={covidData}
            keyedCovidData={keyedCovidData}
            width={svgWidth/2}
            height={(1 - graphHeight) * svgHeight}
            mousePosition={mousePosition}
            sendHoveredValue={handleSetHoveredValue}
            hoveredValue={hoveredValue}
          />
        </g>
      </svg>
        <svg width={svgWidth} height={svgHeight/2} margin={20}>
          <g transform={`translate(${svgWidth/2}, 0)`}>
            <Histogram
            covidData={covidData}
            keyedCovidData={keyedCovidData}
            width={svgWidth/2}
            height={graphHeight * svgHeight}
            hoveredValue={hoveredValue}
            sendHoveredValue={handleSetHoveredValue}
            histogramXAttribute={histogramXAttribute}
            histogramYAttribute={histogramYAttribute}
            attributes={attributes}
            yScaleMin={0}
            xScaleMin={0}
            />
          </g>
          <g transform={`translate(0, 0)`}>
            <Histogram
            covidData={covidData}
            keyedCovidData={keyedCovidData}
            width={svgWidth/2}
            height={graphHeight * svgHeight}
            hoveredValue={hoveredValue}
            sendHoveredValue={handleSetHoveredValue}
            histogramXAttribute={histogramTwoXAttribute}
            histogramYAttribute={histogramTwoYAttribute}
            attributes={attributes}
            yScaleMin={0}
            xScaleMin={86}
            />
          </g>
        </svg>
      <div className="menus-container">
          <span className="dropdown-label">x</span>
          <ReactDropdown
            options={attributeOptions}
            value={scatterXAttribute}
            onChange={({ value }) => setScatterXAttribute(value)}
           />
         <span className="dropdown-label">y</span>
          <ReactDropdown
            options={attributeOptions}
            value={scatterYAttribute}
            onChange={({ value }) => setScatterYAttribute(value)}
          />
          <span className="dropdown-label">x</span>
          <ReactDropdown
            options={attributeOptions}
            value={histogramXAttribute}
            onChange={({ value }) => setHistogramXAttribute(value)}
           />
         <span className="dropdown-label">y</span>
          <ReactDropdown
            options={attributeOptions}
            value={histogramYAttribute}
            onChange={({ value }) => setHistogramYAttribute(value)}
          />
        </div>
    </>
  )
}
export default App
// transform={`translate(${svgWidth/2}, 0)`}
// <g transform={`translate(0, 0)`}>
// <Histogram
// covidData={covidData}
// keyedCovidData={keyedCovidData}
// width={svgWidth/2}
// height={graphHeight * svgHeight}
// hoveredValue={hoveredValue}
// sendHoveredValue={handleSetHoveredValue}
// histogramXAttribute={histogramXAttribute}
// histogramYAttribute={histogramYAttribute}
// attributes={attributes}
// yScaleMin={0}
// xScaleMin={0}
// />
// </g>


// <g transform={`translate(0, ${svgHeight - graphHeight * svgHeight})`}>
//   <ScatterPlot
//   covidData={covidData}
//   keyedCovidData={keyedCovidData}
//   width={svgWidth/2}
//   height={graphHeight * svgHeight}
//   hoveredValue={hoveredValue}
//   sendHoveredValue={handleSetHoveredValue}
//   scatterXAttribute={scatterXAttribute}
//   scatterYAttribute={scatterYAttribute}
//   attributes={attributes}
//   yScaleMin={0}
//   xScaleMin={90}
//   />
// </g>





// <g transform={`translate(${svgWidth/2}, ${svgHeight - graphHeight * svgHeight})`}>
//   <BinnedScatter
//   covidData={covidData}
//   keyedCovidData={keyedCovidData}
//   width={svgWidth/2}
//   height={graphHeight * svgHeight}
//   hoveredValue={hoveredValue}
//   sendHoveredValue={handleSetHoveredValue}
//   histogramXAttribute={histogramXAttribute}
//   histogramYAttribute={histogramYAttribute}
//   attributes={attributes}
//   yScaleMin={0}
//   xScaleMin={0}
//   />
// </g>
