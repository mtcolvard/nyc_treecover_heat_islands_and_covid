import {useEffect, useRef} from 'react'
import {select, axisBottom, format} from 'd3'

export const XAxis = ({xScale, innerHeight}) => {
  const ref = useRef()

  useEffect(() => {
     const xAxisG = select(ref.current)
     const xAxis = axisBottom(xScale)
       .tickSize(-innerHeight)
       .tickPadding(12)
       .tickFormat(format('~s'))
       .tickValues([88,92,96,100])
     xAxisG.call(xAxis)
   }, []);

  return <g transform={`translate(0,${innerHeight})`} ref={ref} />
  }
