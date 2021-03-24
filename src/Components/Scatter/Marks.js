export const ScatterMarks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  circleRadius,
  fillColor,
  opacity
}) =>
 data.map(d => (
    <circle
      className="scatter-marks"
      key={d.MODIFIED_ZCTA}
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      r={circleRadius}
      fill={fillColor}
      opacity={opacity}
    >
    </circle>
  ))

  // colorScale,
  // yColorValue,
  // tooltipFormat,
  // onHover
  //
  // fill={colorScale(yColorValue(d))}
  // onMouseEnter={() => { onHover([xValue(d),yValue(d)]) }}
//      onMouseEnter={() => { onHover((xValue,yValue)) }}

// <title>{tooltipFormat(xValue(d))}</title>
