import React, { useState, useEffect, useCallback } from 'react'
import './App.css'
import { useBoundaries } from './useBoundaries'
import { useCovidData } from './useCovidData'
import { useMousePosition } from './useMousePosition'
import { TreeHistogram } from './Histogram/index'
import { NycMap } from './Map/index'
import { ScatterPlot } from './Scatter/index'

const mainWidth = 1280
const mainHeight = 700
const margin = { top: 20, right: 20, bottom: 20, left:20 }
const width = mainWidth
const height = mainHeight
const treeHistogramHeight = 0.5

const App = () => {
  const boundaries = useBoundaries()
  const covidData = useCovidData()
  // const mousePosition = useMousePosition()
  const mousePosition = [0, 0]

  const [hoveredValue, setHoveredValue] = useState([{null:null}, null])
  const handleSetHoveredValue = useCallback((d) => {
    d ? setHoveredValue(d) : setHoveredValue([{null:null}, null])
  }, [])

  console.log('hoveredValue', hoveredValue)
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
          sendHoveredValue={handleSetHoveredValue}
        />
        <g transform={`translate(${width/2}, ${height - treeHistogramHeight * height})`}>
          <TreeHistogram
          covidData={covidData}
          width={width/2}
          height={treeHistogramHeight * height}
          hoveredValue={hoveredValue}
          />
        </g>
        <g transform={`translate(0, ${height - treeHistogramHeight * height})`}>
          <ScatterPlot
          covidData={covidData}
          width={width/2}
          height={treeHistogramHeight * height}
          hoveredValue={hoveredValue}
          />
        </g>
      </svg>
    </>
  )
}
export default App
