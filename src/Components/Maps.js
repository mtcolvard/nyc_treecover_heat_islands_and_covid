import React, {useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import './Maps.css'

// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY
mapboxgl.accessToken='pk.eyJ1IjoibXRjb2x2YXJkIiwiYSI6ImNrbXkzMmQyazAwMjIycHBrZmhlanF6NW8ifQ.bVb3ILE1YOnHJYD5D2ymAA'

export const Maps = () => {
  const mapContainerRef = useRef(null)


  const [map, setMap] = useState(null)
  // const bounds = [[-65.6877582620000027,55.7263306070000013], [-64.7789215410000025,56.2744617039999966]]
  const mapStyle = {
    'version': 8,
    'name': 'Dark',
    'sources': {
      'mapbox': {
        'type': 'vector',
        'url': 'mapbox://mapbox.mapbox-streets-v8'
      },
    },
    'sprite': 'mapbox://sprites/mapbox/dark-v10',
    'glyphs': 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
    'layers': [
      {
        'id': 'background',
        'type': 'background',
        'paint': { 'background-color': '#111' }
      },
      {
        'id': 'water',
        'source': 'mapbox',
        'source-layer': 'water',
        'type': 'fill',
        'paint': { 'fill-color': '#2c2c2c' }
      },
      {
        'id': 'boundaries',
        'source': 'mapbox',
        'source-layer': 'admin',
        'type': 'line',
        'paint': {
          'line-color': '#797979',
          'line-dasharray': [2, 2, 6, 2]
        },
        'filter': ['all', ['==', 'maritime', 0]]
      },
      {
        'id': 'cities',
        'source': 'mapbox',
        'source-layer': 'place_label',
        'type': 'symbol',
        'layout': {
          'text-field': '{name_en}',
          'text-font': ['DIN Offc Pro Bold', 'Arial Unicode MS Bold'],
          'text-size': [
            'interpolate',
            ['linear'],
            ['zoom'],
            4,
            9,
            6,
            12
          ]
        },
        'paint': {
          'text-color': '#969696',
          'text-halo-width': 2,
          'text-halo-color': 'rgba(0, 0, 0, 0.85)'
        }
      },
      {
        'id': 'states',
        'source': 'mapbox',
        'source-layer': 'place_label',
        'type': 'symbol',
        'layout': {
          'text-transform': 'uppercase',
          'text-field': '{name_en}',
          'text-font': ['DIN Offc Pro Bold', 'Arial Unicode MS Bold'],
          'text-letter-spacing': 0.15,
          'text-max-width': 7,
          'text-size': [
            'interpolate',
            ['linear'],
            ['zoom'],
            4,
            10,
            6,
            14
          ]
        },
        'filter': ['==', ['get', 'class'], 'state'],
        'paint': {
          'text-color': '#969696',
          'text-halo-width': 2,
          'text-halo-color': 'rgba(0, 0, 0, 0.85)'
        }
      }
    ]
  }

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style:mapStyle,
      // bounds: bounds,
      zoom: 9,
      center: [-73.970973, 40.716419]
  })

  map.on('load', () => {
    map.addSource('overlay', {
      'type': 'raster',
      'url': 'mapbox://mtcolvard.7mhk1uko',
      'coordinates': [
        [-80.425, 46.437],
        [-71.516, 46.437],
        [-71.516, 37.936],
        [-80.425, 37.936]
      ]
    })
    map.addLayer({
     'id': 'overlay',
     'type': 'fill',
     'source': 'overlay',
     'paint': { 'raster-opacity': 0.85 }

     // 'source-layer': 'elections_vector_and_data',
    })




      setMap(map)
    })
    return () => map.remove()
  }, [])




  return(
    <div ref={mapContainerRef}/>
  )
}
