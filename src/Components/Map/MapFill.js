import {
  geoEquirectangular,
  geoPath,
} from 'd3'

const missingDataColor = 'rgba(0, 140, 255, 0)'

export const MapFill = ({
  boundaries: { neighborhood },
  rowByCity,
  width,
  height,
  colorScale,
  colorValue,
  onHover
}) => {

  const projection = geoEquirectangular()
    .center([-73.95, 40.74])
    .fitSize([width, height], neighborhood)
  const path = geoPath(projection)

  return (
    <g className="marks">
      {neighborhood.features.map((feature, i) => {
        const cityZip = +feature.properties.MODZCTA
        const d = rowByCity.get(cityZip)
        const dCheck = d ? colorScale(colorValue(d)) : missingDataColor
        return <path
          key={cityZip}
          onMouseEnter={() => { onHover([d, dCheck]) }}
          onMouseOut={() => { onHover(null) }}
          fill={dCheck}
          d={path(feature)}
        />
      })}
      />

    </g>
  )
}
