export const HistogramMarks = ({
  binnedData,
  xScale,
  yScale,
  tooltipFormat,
  innerHeight
}) =>
  binnedData.map(d => (
    <rect
      className="histogram-marks"
      key={d.x0}
      x={xScale(d.x0)}
      y={yScale(d.y)}
      width={xScale(d.x1) - xScale(d.x0)}
      height={d.y ? innerHeight - yScale(d.y) : innerHeight - yScale(0)}
    >
      <title>{tooltipFormat(d.y)}</title>
    </rect>
  ))
