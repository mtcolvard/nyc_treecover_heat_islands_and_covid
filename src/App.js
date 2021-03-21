import React from 'react';
import './App.css'
import {useState} from 'react'
import { useBoundaries } from './useBoundaries'
import { useCovidData } from './useCovidData'
import { TreeHistogram } from './TreeHistogram'
import { NycMap } from './NycMap'
// import { Calc } from './Utilities/Calc'

import { interpolateBlues, schemeBlues, scaleThreshold, scalePow, scaleQuantize, scaleSequential, scaleSequentialLog, scaleSequentialQuantile, scaleLinear, scaleLog, max, extent } from 'd3'

const width = 960
const height = 500
// const margin = { top: 20, right: 30, bottom: 65, left:90 }

const App = () => {

  const boundaries = useBoundaries()
  const covidData = useCovidData()
  const [hoveredValue, setHoveredValue] = useState({null:null})

  if (!boundaries || !covidData) {
    return <pre>Loading...</pre>
  }

  return (
        <TreeHistogram
        covidData={covidData}/>
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
//     <TreeHistogram
//     covidData={covidData}/>
//   </svg>
// </>
