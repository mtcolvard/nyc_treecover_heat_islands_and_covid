import React, {useState, useEffect, useCallback} from 'react';
import { schemeBlues, scaleThreshold } from 'd3'
import { MapFill } from './MapFill'
// import { useMousePosition } from './useMousePosition'

export const NycMap = ({ boundaries, width, height, mousePosition, sendHoveredValue, hoveredValue, keyedCovidData, covidData, mapYAttribute }) => {

  const colorValue = d => d[mapYAttribute]
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
