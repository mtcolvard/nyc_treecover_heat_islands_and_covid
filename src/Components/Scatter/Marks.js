export const ScatterMarks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  circleRadius,
  fillColor,
  opacity,
  onHover,

}) =>

 data.map((d, i) => {
   return (
    // <g className="scatter-mark-group" >
      <circle
        className="scatter-marks"
        key={d.MODIFIED_ZCTA}
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        r={circleRadius}
        fill={fillColor}
        opacity={opacity}
        onMouseOver={() => { onHover(d.MODIFIED_ZCTA) }}
        onMouseLeave={() => { onHover(null) }}
      >
      </circle>
    // </g>
  )})
  // <title>{d => (d.y)}</title>

  // PROPS
  // tooltipFormat
  // tooltipFormat={d => d}



  // colorScale,
  // yColorValue,
  // tooltipFormat,
  // onHover
  //
  // fill={colorScale(yColorValue(d))}
  // onMouseEnter={() => { onHover([xValue(d),yValue(d)]) }}
//      onMouseEnter={() => { onHover((xValue,yValue)) }}

// <title>{tooltipFormat(xValue(d))}</title>
