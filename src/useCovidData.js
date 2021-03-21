import { useState, useEffect } from 'react'
import { csv } from 'd3'

  const csvUrl = 'https://gist.githubusercontent.com/mtcolvard/341f5b92bf3b6edc9c991d668b56e2e4/raw/c5d932fbc32290e4e556405ebd68767b99116fa2/COVID%2520and%2520Income.csv'

  const row = d => {
    d.MODIFIED_ZCTA = +d['MODIFIED_ZCTA']
    d.lat = +d['lat']
    d.lon = +d['lon']
    d.COVID_CASE_COUNT = +d['COVID_CASE_COUNT']
    d.COVID_CASE_RATE = +d['COVID_CASE_RATE']
    d.POP_DENOMINATOR = +d['POP_DENOMINATOR']
    d.COVID_DEATH_COUNT = +d['COVID_DEATH_COUNT']
    d.COVID_DEATH_RATE = +d['COVID_DEATH_RATE']
    d.PERCENT_POSITIVE = +d['PERCENT_POSITIVE']
    d.TOTAL_COVID_TESTS = +d['TOTAL_COVID_TESTS']
    d.ALL_HOUSEHOLDS = +d['All Households']
    d.FAMILIES = +d['Families']
    d.FAMILIES_WITH_CHILDREN = +d['Families with Children']
    d.FAMILIES_WITHOUT_CHILDREN = +d['Families without Children']
    return d
  }

  export const useCovidData = () => {
    const [covidData, setCovidData] = useState(null)
    useEffect(() => { csv(csvUrl, row).then(setCovidData)}, [])
    console.log('covidData',covidData)
    return covidData
  }
