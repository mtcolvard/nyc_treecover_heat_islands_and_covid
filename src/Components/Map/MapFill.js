import {
  geoEquirectangular,
  geoPath,
} from 'd3'

const missingDataColor = 'rgba(0, 140, 255, 0)'

export const MapFill = ({
  boundaries: { neighborhood },
  keyedCovidData,
  width,
  height,
  colorScale,
  colorValue,
  onHover,
  hoveredValue,
  opacity,
  fillData
}) => {

  const projection = geoEquirectangular()
    .center([-73.95, 40.74])
    .fitSize([width, height], neighborhood)
  const path = geoPath(projection)
  console.log(neighborhood)

  return (
    <g className="map-fill">
      {neighborhood.features.map((feature, i) => {
        const cityZip = +feature.properties.MODZCTA
        const d = keyedCovidData.get(cityZip)
        return <path
          key={cityZip}
          onMouseEnter={() => { onHover(cityZip) }}
          onMouseOut={() => { onHover(null) }}
          // fill={d ? colorScale(colorValue(d)) : missingDataColor}
          fill={cityZip === hoveredValue ? 'black' : (d  ? colorScale(colorValue(d)) : missingDataColor)}
          d={path(feature)}

        />
      })}
      />
    </g>
  )
}
// opacity={hoveredValue && d !== hoveredValue ? 0.3 : 1}
