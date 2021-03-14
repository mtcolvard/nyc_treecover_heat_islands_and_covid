import React from 'react';
import { Markss } from './Markss'

import { interpolateBlues, schemeBlues, scaleThreshold, scalePow, scaleQuantize, scaleSequential, scaleSequentialLog, scaleSequentialQuantile, scaleLinear, scaleLog, max, extent } from 'd3'

export const NycMap = ({ boundaries, covidData, hoveredValue }) => {
  // console.log(hoveredValue.MODIFIED_ZCTA)
  // const handleSetHoveredValue = useCallback(event => {
  //   const { d } = event
  //   setHoveredValue({ d })
  //   }, [setHoveredValue])



  const rowByCity = new Map()
    covidData.forEach(d => {
      rowByCity.set(d.MODIFIED_ZCTA, d)
    })

  const colorValue = d => +d.PERCENT_POSITIVE

  const colorScale =
    scaleThreshold()
    .domain([4,6,8,10,12,14,16,18,20])
    .range(schemeBlues[9])


  // let thecounter = null
  // percentp.forEach((i) => {
  //    thecounter = i++
  // })

  return(
    <Markss
    boundaries={boundaries}
    rowByCity={rowByCity}
    width={width}
    height={height}
    colorScale={colorScale}
    colorValue={colorValue}
    onHover={setHoveredValue}
    />)
}
