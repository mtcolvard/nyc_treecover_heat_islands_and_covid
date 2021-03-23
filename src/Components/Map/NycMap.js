import React, {useState, useEffect, useCallback} from 'react';
import { MapFill } from './MapFill'
// import { useMousePosition } from './useMousePosition'

import { interpolateBlues, schemeBlues, scaleThreshold, scalePow, scaleQuantize, scaleSequential, scaleSequentialLog, scaleSequentialQuantile, scaleLinear, scaleLog, max, extent } from 'd3'

export const NycMap = ({ boundaries, covidData, width, height, mousePosition }) => {

  const [hoveredValue, setHoveredValue] = useState(null)
  console.log('hoveredValue', hoveredValue)

  const handleSetHoveredValue = useCallback((d) => {
    d ? setHoveredValue(d) : setHoveredValue(null)
  }, [])

  const rowByCity = new Map()
    covidData.forEach(d => {
      rowByCity.set(d.MODIFIED_ZCTA, d)
    })

  const colorValue = d => d.PERCENT_POSITIVE
  const colorScale =
    scaleThreshold()
    .domain([4,6,8,10,12,14,16,18,20])
    .range(schemeBlues[9])


  console.log(mousePosition.y)
  return(
      <MapFill
      boundaries={boundaries}
      rowByCity={rowByCity}
      width={width}
      height={height}
      colorScale={colorScale}
      colorValue={colorValue}
      onHover={handleSetHoveredValue}
      />
  )
}

// <g transform={`translate(${mousePosition.x}, ${mousePosition.y})`}>
//   <text>Foo</text>
// </g>

// <circle
//   cx={mousePosition.x}
//   cy={mousePosition.y}
//   r={10}
// />
