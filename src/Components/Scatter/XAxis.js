// export const AxisBottom = ({ xScale, innerHeight, tickFormat, tickOffset = 3 }) =>
//   xScale.ticks().map(tickValue => (
//     <g
//       className="tick"
//       key={tickValue}
//       transform={`translate(${xScale(tickValue)},0)`}
//     >
//       <line y2={innerHeight} />
//       <text style={{ textAnchor: 'middle' }} dy=".71em" y={innerHeight + tickOffset}>
//         {tickFormat(tickValue)}
//       </text>
//     </g>
//   ))

import { useRef, useEffect } from 'react';
import { select, axisBottom, format } from 'd3';

export const XAxis = ({xScale, innerHeight}) => {
  const ref = useRef()
  useEffect(() => {
     const xAxisG = select(ref.current)
     const xAxis = axisBottom(xScale)
       .tickSize(-innerHeight)
       .tickPadding(18)
       // .tickArguments([6, '~s'])
       .tickValues([40000,80000,120000,160000,200000,240000])
       .tickFormat(format('~s'))
     xAxisG.call(xAxis)
   }, []);

  return <g transform={`translate(0,${innerHeight})`} ref={ref} />
  }
