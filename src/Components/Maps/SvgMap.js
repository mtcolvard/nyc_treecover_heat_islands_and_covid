import React, {useState, useEffect, useCallback} from 'react';
import { schemeBlues, scaleThreshold } from 'd3'
import { SvgMapFill } from './SvgMapFill'
// import { useMousePosition } from './useMousePosition'

export const SvgMap = ({ boundaries, width, height, mousePosition, sendHoveredValue, hoveredValue, keyedCovidData, covidData, mapYAttribute }) => {

  const colorValue = d => d[mapYAttribute]
  const colorScale =
    scaleThreshold()
    .domain([4,6,8,10,12,14,16,18,20])
    .range(schemeBlues[9])

  return(
    <>
      <SvgMapFill
      boundaries={boundaries}
      keyedCovidData={keyedCovidData}
      width={width}
      height={height}
      colorScale={colorScale}
      colorValue={colorValue}
      onHover={sendHoveredValue}
      hoveredValue={hoveredValue}
      />
      {hoveredValue && <SvgMapFill
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
