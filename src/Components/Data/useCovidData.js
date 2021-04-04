import { useState, useEffect } from 'react'
import { csv } from 'd3'

  const csvUrl = 'https://gist.githubusercontent.com/mtcolvard/d64937111f2ced60077955d2d01152ba/raw/89e6b27f99e9daedc750d7e1c3350bbe5785ffcb/NYC_COVID_Trees_Temp_by_MODZCTA.csv'
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
    d.area = +d['area']
    d.count = +d['count']
    d.sum = +d['sum']
    d.mean = +d['mean']
    d.median = +d['median']
    d.stdev = +d['stdev']
    d.range = +d['range']
    d.majority = +d['majority']
    d.variance = +d['variance']
    d.treesPerMilesq = +d['treesPerMilesq']
    return d
  }

  export const useCovidData = () => {
    const [covidData, setCovidData] = useState(null)
    useEffect(() => { csv(csvUrl, row).then(setCovidData)}, [])
    return covidData
  }
