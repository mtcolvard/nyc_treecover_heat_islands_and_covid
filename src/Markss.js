import {
  geoEquirectangular,
  geoPath,
} from 'd3'
import { json } from 'd3'
import { feature, mesh } from 'topojson'

const missingDataColor = 'rgba(0, 140, 255, 0)'

export const Markss = ({
  boundaries: { neighborhood },
  rowByCity,
  width,
  height,
  colorScale,
  colorValue,
  onHover
}) => {

  const projection = geoEquirectangular()
    .center([-118, 33.33])
    .fitSize([width, height], neighborhood)
  const path = geoPath(projection)

  return (
    <g className="marks">
      {neighborhood.features.map((feature, i) => {
        const d = rowByCity.get(feature.properties.MODZCTA)

        return <path
          fill={d ? colorScale(colorValue(d)) : missingDataColor}
          d={path(feature)}
          onMouseEnter={() => { onHover(d) }}
          key={i}
        />
      })}
    </g>
  )
}
