import {scaleSequential, scaleLinear, create, quantize, interpolate, axisBottom, interpolateViridis } from 'd3'
import {legend} from './d3Legend'


export const MapLegend = () => {
// const fahrenheitScale = scaleLinear()
//   .domain([0, 100])
//   .range(['#ffffb2', '#bd0026'])

// legend({
//   color: scaleSequential([86, 100], fahrenheitScale),
//   title: "Temperature (°F)"
// })
// }
legend({
  color: scaleSequential([0, 100], interpolateViridis),
  title: "Temperature (°F)"
})
}
