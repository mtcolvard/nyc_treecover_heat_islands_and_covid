import React, { useState, useEffect, useCallback, useRef } from 'react'
// import { useIframe } from 'use-iframe';

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
import { Child } from './Child'
import { Maps2 } from './Maps2'

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

const margin = { top: 20, right: 20, bottom: 20, left:20 }
const width = window.innerWidth
const height = window.innerHeight

const innerWidth = width - (margin.right + margin.left)
const innerHeight = height - (margin.top + margin.bottom)

const mapsWidth = innerWidth/2
const mapsHeight = mapsWidth
const svgWidth = innerWidth
const svgHeight = innerHeight

const centerWidth = innerWidth/2
const graphWidth = innerWidth/3
const graphHeight = 0.67 * centerWidth
const graphOffset = innerWidth/6
const graph3XTranslate = centerWidth + graphOffset
const graph2XTranslate = centerWidth - graphOffset
const graph1XTranslate = 0
// const rectFillColor = 'hsla(185, 3%, 94%, 1)'
const rectFillColor = 'hsla(185, 3%, 83%, 0.5)'

// const dropdownWidth = 40
// const dropdownHeight = 160

const App = () => {
  const boundaries = useBoundaries()
  const covidData = useCovidData()
  const attributeOptions = Object.keys(attributes)
  const mapInitialYAttribute = 'PERCENT_POSITIVE'
  const scatterInitialXAttribute = 'ALL_HOUSEHOLDS'
  const scatterInitialYAttribute = 'PERCENT_POSITIVE'
  const histogramInitialXAttribute = 'treesPerMilesq'
  const histogramInitialYAttribute = 'PERCENT_POSITIVE'
  const histogramTwoInitialXAttribute = 'majority'
  const histogramTwoInitialYAttribute = 'PERCENT_POSITIVE'
  const [mapYAttribute, setMapYAttribute] = useState(mapInitialYAttribute)
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

console.log('mapsWidth', mapsWidth, mapsHeight)

    // <div>
    //   <Maps />
    // </div>

  return (
  <>
    <div>
      <div className="headline" width={innerWidth} height={width/6}>
        <h1>Urban "heat islands" have exacerbated pandemic suffering amongst New York City's poorest</h1>
      </div>
      <div className="captions">
        <p>Neighborhoods lacking foliage and greenspace suffer dramatically higher temperatures</p>
        <p>COVID-positive test rates are especially high in low-income neighborhoods</p>
      </div>
    </div>
    <div className="iframe-svg-container">
      <div>
        <Maps2
          mapsWidth={mapsWidth}
          mapsHeight={mapsHeight}/>
      </div>
      <div>
        <svg className="sideBySide" width={mapsWidth} height={mapsHeight} margin={0}>
          <g transform={`translate(0, 0)`}>
            <NycMap
              boundaries={boundaries}
              covidData={covidData}
              keyedCovidData={keyedCovidData}
              width={mapsWidth}
              height={mapsHeight}
              mousePosition={mousePosition}
              sendHoveredValue={handleSetHoveredValue}
              hoveredValue={hoveredValue}
              mapYAttribute={mapYAttribute}
            />
          </g>
        </svg>
      </div>
    </div>
    <div className="captions maps-footer">
      <div className="caption-1" width={innerWidth/2} height={'1em'}>
        <p>Temperature variations by neighborhood on a hot August day, typical pattern</p>
        <p className="footnote">Data: USGS, Landsat-8 ARD</p>
      </div>
      <div className="caption-2" width={innerWidth/2} height={'1em'}>
        <p>Antibody Prevalence: Confirmed infections per residents tested, cumulative by neighborhood</p>
        <p className="footnote">Data: NYC Dept. of Health and Mental Hygiene</p>
      </div>
    </div>
    <div>
      <p>“Of all the climate change exposures we study, heat is the No. 1 killer.” Rupa Basu, chief of air and climate epidemiology, California Office of Environmental Health Hazard Assessment"</p>
    </div>
    <div>
      <svg className={"three-graphs"} width={svgWidth} height={svgWidth} margin={20}>
        <g  transform={`translate(${graph3XTranslate}, 0)`}>
          <Histogram
          covidData={covidData}
          keyedCovidData={keyedCovidData}
          width={graphWidth}
          height={graphHeight}
          hoveredValue={hoveredValue}
          sendHoveredValue={handleSetHoveredValue}
          histogramXAttribute={histogramXAttribute}
          histogramYAttribute={histogramYAttribute}
          attributes={attributes}
          yScaleMin={0}
          xScaleMin={0}
          rectFillColor={rectFillColor}
          />
        </g>
        <g  transform={`translate(${graph2XTranslate}, 0)`}>
          <Histogram
          covidData={covidData}
          keyedCovidData={keyedCovidData}
          width={graphWidth}
          height={graphHeight}
          hoveredValue={hoveredValue}
          sendHoveredValue={handleSetHoveredValue}
          histogramXAttribute={histogramTwoXAttribute}
          histogramYAttribute={histogramTwoYAttribute}
          attributes={attributes}
          yScaleMin={0}
          xScaleMin={86}
          rectFillColor={rectFillColor}
          />
        </g>
        <g  transform={`translate(${graph1XTranslate}, 0)`}>
          <ScatterPlot
          covidData={covidData}
          keyedCovidData={keyedCovidData}
          width={graphWidth}
          height={graphHeight}
          hoveredValue={hoveredValue}
          sendHoveredValue={handleSetHoveredValue}
          scatterXAttribute={scatterXAttribute}
          scatterYAttribute={scatterYAttribute}
          attributes={attributes}
          yScaleMin={0}
          xScaleMin={90}
          rectFillColor={rectFillColor}
          />
        </g>
      </svg>
    </div>
  </>
  )
}
export default App


// const ref = useRef(null)
//
//   const handler = useCallback(message => {
//     switch (message.type) {
//       case "child-says":
//         console.log(`The child said: ${message.text}`)
//     }
//   }, [])
//
//   const [dispatch] = useIframe(handler, { ref })
//
//   const onClick = () => dispatch({ type: "parent-says", text: "Hello, Child!" })

// <div>
//   <p>I am the parent component</p>
//   <iframe
//     ref={ref}
//     id="NYC"
//     title='NYC Heat Islands, Foliage, and Covid'
//     src="/iframe-component"/>
// </div>




// <div>
//   <div className="divZero">Maps</div>
//   <Maps />
// </div>

// <svg width={innerWidth} height={innerHeight}>
//    <g transform={`translate(${margin.left},${margin.top})`}>
//     <text transform={`translate(${innerWidth / 2},0)`} text-anchor="middle">
//     “Of all the climate change exposures we study, heat is the No. 1 killer.” - Rupa Basu, chief of air and climate epidemiology for the California Office of Environmental Health Hazard Assessment
//     </text>
//    </g>
// </svg>

// <foreignObject className='btn' width='auto' height="20">
//   <button className='btn'>Antibody Prevalence</button>
// </foreignObject>

// <g transform={`translate(0, ${mapsHeight-mapsHeight/16})`}>
//   <rect width={mapsHeight/8} height={mapsHeight/16} fill='white' />
// </g>

// <iframe
//   width={`${mapsWidth}`}
//   height={mapsHeight}
//   title='NYC Heat Islands, Foliage, and Covid'
//   src={`https://api.mapbox.com/styles/v1/mtcolvard/ckmzb6l1603hr17mtbxwmn1w8.html?fresh=true&title=false&zoomwheel=false&access_token=pk.eyJ1IjoibXRjb2x2YXJkIiwiYSI6ImNqemI4emZydjA2dHIzYm80ZG96ZmQyN2wifQ.kVp6eB7AkWjslUOtsJyLDQ#9.32/40.687/-73.963`}>
// </iframe>
// <iframe
//   ref={ref}
//   width={`${mapsWidth}`}
//   height={mapsHeight}
//   title='NYC Heat Islands, Foliage, and Covid'
//   src="/iframe-content"/>


// <svg width={innerWidth/2} height={height/9}>
//   <g width={mapsWidth} height={mapsHeight} transform={`translate(${innerWidth/2},0)`}>
//     <text >COVID-positive test rates are especially high in low-income neighborhoods. Data: NYC Dept. of Health and Mental Hygiene</text>
//   </g>
//
//   <g transform={`translate(0,0)`}>
//     <text text-anchor="right" alignment-baseline="hanging">A typical summers day. Temperatures across NYC neighborhoods vary as much as 16 degrees in neighborhoods lacking foliage and greenspace. August 19th, 2019 Data: USGS, Landsat-8 ARD</text>
//   </g>
// </svg>



// <div className="menus-container">
//     <span className="dropdown-label">x</span>
//     <ReactDropdown
//       options={attributeOptions}
//       value={scatterXAttribute}
//       onChange={({ value }) => setScatterXAttribute(value)}
//      />
//    <span className="dropdown-label">y</span>
//     <ReactDropdown
//       options={attributeOptions}
//       value={scatterYAttribute}
//       onChange={({ value }) => setScatterYAttribute(value)}
//     />
//     <span className="dropdown-label">x</span>
//     <ReactDropdown
//       options={attributeOptions}
//       value={histogramXAttribute}
//       onChange={({ value }) => setHistogramXAttribute(value)}
//      />
//    <span className="dropdown-label">y</span>
//     <ReactDropdown
//       options={attributeOptions}
//       value={histogramYAttribute}
//       onChange={({ value }) => setHistogramYAttribute(value)}
//     />
//   </div>

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
