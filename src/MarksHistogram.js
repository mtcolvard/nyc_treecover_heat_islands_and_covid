
export const MarksHistogram = ({
  binnedData,
  xScale,
  yScale,
  tooltipFormat,
  innerHeight
}) =>
  binnedData.map(d => {
    <rect
      className="marks-histogram"
      x={xScale(d.x)}
      y={yScale(d.y)}
      width={xScale(d.x1) - xScale(d.x0)}
      height={innerHeight = yScale(d.y)}
    >
    <title>{tooltipFormat(d.y)}</title>
    </rect>
  })
