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
       .tickPadding(12)
       .tickArguments([5, '~s'])
     xAxisG.call(xAxis)
   }, []);

  return <g transform={`translate(0,${innerHeight})`} ref={ref} />
  }
