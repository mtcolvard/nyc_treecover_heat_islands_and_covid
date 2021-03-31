export const AxisLeft = ({ yScale, innerWidth, tickOffset = 3, tickFormat }) =>
  yScale.ticks().map(tickValue => (
    <g className="tick" key={tickValue} transform={`translate(0,${yScale(tickValue)})`}>
      <line x2={innerWidth} />
      <text
        style={{ textAnchor: 'end' }}
        x={-tickOffset}
        dy=".32em"
      >
        {tickFormat(tickValue)}
      </text>
    </g>
  ))
