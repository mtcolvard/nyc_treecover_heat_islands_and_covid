import React, {useState, useEffect, useCallback} from 'react';
import { schemeBlues, scaleThreshold } from 'd3'
import { MapFill } from './MapFill'
// import { useMousePosition } from './useMousePosition'

export const NycMap = ({ boundaries, width, height, mousePosition, sendHoveredValue, hoveredValue, keyedCovidData, covidData }) => {

  const colorValue = d => d.PERCENT_POSITIVE
  const colorScale =
    scaleThreshold()
    .domain([4,6,8,10,12,14,16,18,20])
    .range(schemeBlues[9])

  return(
    <>
      <MapFill
      boundaries={boundaries}
      keyedCovidData={keyedCovidData}
      width={width}
      height={height}
      colorScale={colorScale}
      colorValue={colorValue}
      onHover={sendHoveredValue}
      hoveredValue={hoveredValue}
      />
      {hoveredValue && <MapFill
      boundaries={boundaries}
      keyedCovidData={keyedCovidData}
      width={width}
      height={height}
      colorScale={colorScale}
      colorValue={colorValue}
      onHover={sendHoveredValue}
      hoveredValue={hoveredValue}
      />}
    </>
  )
}

// covidData={[keyedCovidData.get(hoveredValue)]}


// <g transform={`translate(${mousePosition.x}, ${mousePosition.y})`}>
//   <text>Foo</text>
// </g>

// <circle
//   cx={mousePosition.x}
//   cy={mousePosition.y}
//   r={10}
// />
