import React, {useState, useEffect, useCallback} from 'react';
import { MapFill } from './MapFill'
// import { useMousePosition } from './useMousePosition'

import { interpolateBlues, schemeBlues, scaleThreshold, scalePow, scaleQuantize, scaleSequential, scaleSequentialLog, scaleSequentialQuantile, scaleLinear, scaleLog, max, extent } from 'd3'

export const NycMap = ({ boundaries, covidData, width, height, mousePosition, sendHoveredValue }) => {

  const rowByCity = new Map()
    covidData.forEach(d => {
      rowByCity.set(d.MODIFIED_ZCTA, d)
    })

  const colorValue = d => d.PERCENT_POSITIVE
  const colorScale =
    scaleThreshold()
    .domain([4,6,8,10,12,14,16,18,20])
    .range(schemeBlues[9])

  return(
      <MapFill
      boundaries={boundaries}
      rowByCity={rowByCity}
      width={width}
      height={height}
      colorScale={colorScale}
      colorValue={colorValue}
      onHover={sendHoveredValue}
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
