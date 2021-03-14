import './App.css'
import {useState} from 'react'
import { useBoundaries } from './useBoundaries'
import { useCovidData } from './useCovidData'
import { Markss } from './Markss'
import { interpolateBlues, schemeBlues, scaleThreshold, scalePow, scaleQuantize, scaleSequential, scaleSequentialLog, scaleSequentialQuantile, scaleLinear, scaleLog, max, extent } from 'd3'
import { Calc } from './Calc'

const width = 960
const height = 500

function App() {
const boundaries = useBoundaries()
const covidData = useCovidData()
const [hoveredValue, setHoveredValue] = useState({null:null})

// const [colorLevel, setColorLevel] = useState([null])
// console.log(hoveredValue.MODIFIED_ZCTA)


// const handleSetHoveredValue = useCallback(event => {
//   const { d } = event
//   setHoveredValue({ d })
//   }, [setHoveredValue])

// const doSetColorLevel = useCallback(event => {
//   const l
//   setColorLevel({ d })
//   }, [setColorLevel])

if (!boundaries || !covidData) {
  return <pre>Loading...</pre>
}

const rowByCity = new Map()
covidData.forEach(d => {
  rowByCity.set(d.MODIFIED_ZCTA, d)
})

const colorValue = d => +d.PERCENT_POSITIVE

const colorScale =
scaleThreshold()
.domain([4,6,8,10,12,14,16,18,20])
.range(schemeBlues[9])

const percentp = [7.02,
11.35,
5.88,
6.53,
5.86,
6.18,
5.35,
8.31,
5.57,
6.43,
6.28,
6.62,
6.05,
7.06,
6.31,
6.12,
7.01,
6.58,
6.07,
6.04,
6.23,
7.08,
10.5,
9.1,
6.44,
12.14,
11.36,
12.82,
13.62,
13.57,
14.03,
12.57,
7.7,
10.94,
8.12,
11.97,
14.63,
8,
5.92,
6.85,
7.88,
6.67,
5.68,
5.27,
16.11,
18.58,
16.88,
17.28,
18.66,
18.29,
18.33,
17.76,
18.23,
15.89,
17.51,
17.95,
14.93,
16.69,
17.15,
15.06,
15.55,
14.55,
15.69,
16.55,
15.38,
16.44,
16.49,
15.83,
13.93,
12.5,
16.38,
15.5,
16.02,
17.8,
15.69,
16.2,
12.17,
16.62,
16.17,
15.78,
13.86,
12.71,
8.97,
11.46,
10.61,
10.8,
11.1,
11.33,
7.12,
5.71,
13.53,
16.76,
9.59,
12.04,
14.45,
17.13,
11.91,
15.27,
10.61,
14.19,
12.86,
15.47,
5.77,
8.58,
7,
13.04,
15.25,
15.22,
11,
7.46,
18.6,
18,
10.78,
12.5,
15.03,
17.37,
18.34,
6.86,
13.72,
11.54,
14.53,
19.02,
13.8,
12.25,
7.26,
16.19,
12.91,
15.3,
15.06,
13.51,
11.32,
11.11,
11.11,
10.79,
9.83,
10.87,
12.87,
15.33,
14.47,
16.12,
16.79,
17.23,
14.79,
15.5,
15.42,
12.24,
14.95,
14.05,
14.3,
15.49,
14.67,
14.87,
14.35,
17.23,
14.1,
18.26,
18.56,
17.18,
20.11,
19.14,
18.9,
15.43,
16.67,
16.27,
16.29,
16.63,
15.52,
16.33,
15.2,
14.53,
17.01,
16.47,
17.14,
14.18,
15.09,
15.31,
14.28]

let thecounter = null
percentp.forEach((i) => {
   thecounter = i++
})

return (
  <>
  <svg width={width} height={height}>
    <Markss
      boundaries={boundaries}
      rowByCity={rowByCity}
      width={width}
      height={height}
      colorScale={colorScale}
      colorValue={colorValue}
      onHover={setHoveredValue}
      />
  </svg>
  <Calc
    thecounter={thecounter}
    />
  </>
  )
}

export default App
