import { useRef, useEffect } from 'react';
import { select, axisLeft } from 'd3';

export const YAxis = ({ yScale, innerWidth}) => {
  const ref = useRef();
  useEffect(() => {
    const yAxisG = select(ref.current)
    const yAxis = axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(12)
      // .tickValues([2,4,6,8,10,12,14,16,18,20,22])
    yAxisG.call(yAxis)
  }, []);
  return <g ref={ref} />;
};
