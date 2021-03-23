import React, { useState, useEffect } from 'react'
import { json } from 'd3'
import { feature } from 'topojson'

const NYC_CommunitiesUrl = 'https://gist.githubusercontent.com/mtcolvard/b6e149b64853fdf15bbf3b5da7959c18/raw/cc1908f4b5ae3d78c25353bef815f393ee72048f/NYC_MODZCTA.json'

export const useBoundaries = () => {
  const [boundaries, setBoundaries] = useState(null)


  useEffect(() => {
    json(NYC_CommunitiesUrl).then(topojsonData => {
      const { NYC_MODZCTA } = topojsonData.objects
      setBoundaries({
      	neighborhood: feature(topojsonData, NYC_MODZCTA)
      })
    })
  }, [])
  return boundaries
}
