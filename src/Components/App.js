import React, { useState, useEffect, useCallback } from 'react'
import './App.css'
import { useBoundaries } from './useBoundaries'
import { useCovidData } from './useCovidData'
import { useMousePosition } from './useMousePosition'
import { TreeHistogram } from './Histogram/TreeHistogram'
import { NycMap } from './Map/NycMap'
// import { Calc } from './Utilities/Calc'

import { interpolateBlues, schemeBlues, scaleThreshold, scalePow, scaleQuantize, scaleSequential, scaleSequentialLog, scaleSequentialQuantile, scaleLinear, scaleLog, max, extent } from 'd3'

const mainWidth = 1280
const mainHeight = 700
const margin = { top: 20, right: 20, bottom: 20, left:20 }
const width = mainWidth
const height = mainHeight
// const width = mainWidth - margin.left - margin.right
// const height = mainHeight - margin.top - margin.bottom
const treeHistogramHeight = 0.382
// const innerHeight =
// const innerWidth =


const App = () => {
  const boundaries = useBoundaries()
  const covidData = useCovidData()
  const mousePosition = useMousePosition()

  if (!boundaries || !covidData) {
    return <pre>Loading...</pre>
  }

  return (
    <>
      <svg width={width} height={height} margin={20}>
        <NycMap
          boundaries={boundaries}
          covidData={covidData}
          width={width}
          height={(1 - treeHistogramHeight) * height}
          mousePosition={mousePosition}
        />
        <g transform={`translate(0, ${height - treeHistogramHeight * height})`}>
          <TreeHistogram
          covidData={covidData}
          width={width/2}
          height={treeHistogramHeight * height}/>
        </g>
      </svg>
    </>
  )
}

export default App

// <>
//   <svg width={width} height={height}>
//     <NycMap
//       covidData={covidData}
//       hoveredValue={hoveredValue}
//       boundaries={boundaries}
//       width={width}
//       height={height}
//     />
//   </svg>
// </>
