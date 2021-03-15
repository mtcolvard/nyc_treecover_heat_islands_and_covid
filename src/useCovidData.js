import { useState, useEffect } from 'react'
import { csv } from 'd3'

  const csvUrl = 'https://gist.githubusercontent.com/mtcolvard/341f5b92bf3b6edc9c991d668b56e2e4/raw/c5d932fbc32290e4e556405ebd68767b99116fa2/COVID%2520and%2520Income.csv'

  const row = d => {
    d.PERCENT_POSITIVE = +d['PERCENT_POSITIVE']
    return d
  }

  export const useCovidData = () => {
    const [covidData, setCovidData] = useState(null)
    useEffect(() => { csv(csvUrl, row).then(setCovidData)}, [])
    return covidData
  }
