

import { useRef, useEffect } from 'react';
import { select, axisLeft } from 'd3';

export const AxisLeft = ({ yScale, innerWidth }) => {
  const ref = useRef();
  useEffect(() => {
    const yAxisG = select(ref.current);
    const yAxis = axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(18);
    yAxisG.call(yAxis);
  }, []);
  return <g ref={ref} />;
};


// export const AxisLeft = ({ yScale, innerWidth, tickOffset = 3, tickFormat }) =>
//   yScale.ticks().map(tickValue => (
//     <g className="tick" key={tickValue} transform={`translate(0,${yScale(tickValue)})`}>
//       <line x2={innerWidth} />
//       <text
//
//         style={{ textAnchor: 'end' }}
//         x={-tickOffset}
//         dy=".32em"
//       >
//         {tickFormat(tickValue)}
//       </text>
//     </g>
//   ))
