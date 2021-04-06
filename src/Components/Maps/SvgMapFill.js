import {
  geoMercator,
  geoPath,
} from 'd3'

const missingDataColor = 'rgba(0, 140, 255, 0)'

export const SvgMapFill = ({
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

  const projection = geoMercator()
    .center([-73.95, 40.74])
    .fitSize([width, height], neighborhood)
  const path = geoPath(projection)

  return (
    <g className="map-fill">
      {neighborhood.features.map((feature, i) => {
        const cityZip = +feature.properties.MODZCTA
        const d = keyedCovidData.get(cityZip)
        return <path
          key={cityZip}
          onMouseEnter={() => { onHover(cityZip) }}
          onMouseOut={() => { onHover(null) }}
          fill={isNaN(colorValue(d)) ? missingDataColor : (cityZip === hoveredValue ? 'black' : colorScale(colorValue(d)))}
          d={path(feature)}
        />
      })}
      />
    </g>
  )
}
// opacity={hoveredValue && d !== hoveredValue ? 0.3 : 1}
