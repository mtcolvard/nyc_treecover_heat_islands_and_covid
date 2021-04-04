import {useEffect, useRef} from 'react'
import {select, axisBottom} from 'd3'

export const XAxis = ({xScale, innerHeight, tickSize, tickPadding}) => {
  const ref = useRef()

  useEffect(() => {
     const xAxisG = select(ref.current)
     const xAxis = axisBottom(xScale)
       .tickSize(-innerHeight)
       .tickPadding(18)
       .tickFormat((tickValue) => tickValue)
     xAxisG.call(xAxis)
   }, []);

  return <g transform={`translate(0,${innerHeight})`} ref={ref} />
  }
