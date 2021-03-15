import { useState, useEffect } from 'react'
import { csv } from 'd3'

  const csvUrl = 'https://gist.githubusercontent.com/mtcolvard/3b781fbc735f6aac0cda7b42a7a272c6/raw/33c8cacbebbb3aa92e36f103c03f843583893834/gistfile2.csv'

  const row = d => {
    d.PERCENT_POSITIVE = +d['PERCENT_POSITIVE']
    return d
  }

  export const useCovidData = () => {
    const [covidData, setCovidData] = useState(null)
    useEffect(() => { csv(csvUrl, row).then(setCovidData)}, [])
    return covidData
  }
