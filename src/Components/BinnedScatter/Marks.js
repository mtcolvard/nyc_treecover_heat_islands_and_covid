export const Marks = ({
  binnedData,
  xScale,
  yScale,
  xValue,
  yValue,
  circleRadius,
  fillColor,
  opacity,
  onHover,

}) =>

 binnedData.map((d, i) => {
   return (
    // <g className="scatter-mark-group" >
      <circle
        className="scatter-marks"
        key={d.y + d.x0}
        cx={xScale(d.x0)}
        cy={yScale(d.y)}
        r={circleRadius}
        fill={fillColor}
        opacity={opacity}
        // onMouseOver={() => { onHover(d.MODIFIED_ZCTA) }}
        // onMouseLeave={() => { onHover(null) }}
      >
      </circle>
    // </g>
  )})

  // <rect
  //   className="histogram-marks"
  //   key={d.y + d.x0}
  //   x={xScale(d.x0)}
  //   y={yScale(d.y)}
  //   width={xScale(d.x1) - xScale(d.x0)}
  //   height={innerHeight - yScale(d.y)}
  // >
