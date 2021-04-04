import React, {useRef, useEffect, useState } from 'react'

export const Maps2 = ({mapsWidth, mapsHeight}) =>  {
  const [lng, setLng] = useState(-73.970973)
  const [lat, setLat] = useState(40.716419)
  const [zoom, setZoom] = useState(9)
  return(
    <iframe
      width={`${mapsWidth}`}
      height={mapsHeight}
      title='NYC Heat Islands, Foliage, and Covid'
      srcdoc={`<!DOCTYPE html>
        <html>
        <head>
        <meta charset="utf-8">
        <title>Display a map on a webpage</title>
        <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
        <link href="https://api.mapbox.com/mapbox-gl-js/v2.2.0/mapbox-gl.css" rel="stylesheet">
        <script src="https://api.mapbox.com/mapbox-gl-js/v2.2.0/mapbox-gl.js"></script>
        <style>
        body { margin: 0; padding: 0; }
        #map { position: absolute; top: 0; bottom: 0; width: 100%; }
        </style>
        </head>
        <body>
        <div id="map"></div>
        <script>
        	mapboxgl.accessToken = 'pk.eyJ1IjoibXRjb2x2YXJkIiwiYSI6ImNrbXpjMXV2dzAxOW4ycHBiZDB1NzE0amsifQ.p28rFaL7eqlLVZ0hdS-t_w';
        const map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mtcolvard/ckmzb6l1603hr17mtbxwmn1w8',
        center: [${lng}, ${lat}],
        zoom: ${zoom}
        });
        map.on('load', () => {
          map.addSource('temperatureRaster', {
            'type': 'raster',
            'url': 'mapbox://mtcolvard.abtfqj2f',
          })

          map.addLayer({
          'id': 'temperatureRasterLayer',
          'type': 'raster',
          'source': 'temperatureRaster',
          'layout': {'visibility': 'visible'
          },
          'source-layer': 'whiteback',
          })

          map.addSource('modzctaVector', {
            'type': 'vector',
            'url': 'mapbox://mtcolvard.c01qzd4e',
          })

          map.addLayer({
          'id': 'modzctaVectorLayer',
          'type': 'fill',
          'source': 'modzctaVector',
          'layout': {'visibility': 'visible'
          },
          'source-layer': 'modzcta-1m1hy2',
          })

          map.setLayoutProperty('temperatureRasterLayer', 'visibility', 'none')
          map.setPaintProperty('temperatureRasterLayer', 'raster-opacity', 0)


          })
        </script>
        </body>
        </html>`}>
    </iframe>
)}
