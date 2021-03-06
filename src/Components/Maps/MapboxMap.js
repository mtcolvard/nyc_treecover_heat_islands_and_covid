import React, {useRef, useEffect, useState } from 'react'

export const MapboxMap = ({mapsWidth, mapsHeight, Temperature, Neighborhoods }) =>  {
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
        <style>
          #menu {
          background: #abcfe5;
          position: absolute;
          z-index: 1;
          top: 10px;
          left: 10px;
          border-radius: 3px;
          width: 120px;
          border: 1px solid hsla(180, 3%, 63%, 1);
          font-family: 'Open Sans', sans-serif;
          }

          #menu a {
          font-size: 13px;
          color: #0b4d94;
          display: block;
          margin: 0;
          padding: 0;
          padding: 10px;
          text-decoration: none;
          border-bottom: 1px solid hsla(180, 3%, 93%, 1);
          text-align: center;
          }

          #menu a:last-child {
          border: none;
          }

          #menu a.active:hover {
          background-color: #eff0f0;
          color: hsla(180, 3%, 43%, 1);
          }
          #menu a.active {
          background-color: #1c6aaf;
          color: #eff0f0;
          }



          </style>
        <nav id="menu"></nav>
        <div id="map"></div>
        <script>
        	mapboxgl.accessToken = 'pk.eyJ1IjoibXRjb2x2YXJkIiwiYSI6ImNrbXpjMXV2dzAxOW4ycHBiZDB1NzE0amsifQ.p28rFaL7eqlLVZ0hdS-t_w';
        const map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mtcolvard/ckmzb6l1603hr17mtbxwmn1w8',
        bounds: [[-74.255588, 40.496115],[-73.700011, 40.915532]],
        scrollZoom: false,
        logoPosition: 'bottom-left',
        showZoom: 'true',
        });
        map.on('load', () => {
          map.addSource('temperatureRaster', {
            'type': 'raster',
            'url': 'mapbox://mtcolvard.abtfqj2f',
          })

        map.addLayer({
        'id': 'Temperature',
        'type': 'raster',
        'source': 'temperatureRaster',
        'layout': {'visibility': 'none'}
        })


        map.addSource('treeRaster', {
          'type': 'raster',
          'url': 'mapbox://mtcolvard.3hivmcle',
        })

        map.addLayer({
        'id': 'TreeCover',
        'type': 'raster',
        'source': 'treeRaster',
        'layout': {'visibility': 'none'}
        })

        map.addSource('modzctaVector', {
          'type': 'vector',
          'url': 'mapbox://mtcolvard.c01qzd4e',
        })

        map.addLayer({
        'id': 'Neighborhoods',
        'type': 'line',
        'source': 'modzctaVector',
        'layout': {'visibility': 'none'},
        'source-layer': 'modzcta-1m1hy2',
        })

        map.setLayoutProperty('Temperature', 'visibility', 'visible')
        map.setLayoutProperty('Neighborhoods', 'visibility', 'none')
        map.setLayoutProperty('TreeCover', 'visibility', 'visible')
        map.setPaintProperty('Neighborhoods', 'line-color', 'hsla(180, 3%, 63%, 1)')

        })
        map.on('idle', function () {
        // If these two layers have been added to the style,
        // add the toggle buttons.
        if (map.getLayer('Temperature') && map.getLayer('TreeCover') && map.getLayer('Neighborhoods')) {
          // Enumerate ids of the layers.
          var toggleableLayerIds = ['Temperature', 'TreeCover', 'Neighborhoods']
          // Set up the corresponding toggle button for each layer.
          for (var i = 0; i < toggleableLayerIds.length; i++) {
            var id = toggleableLayerIds[i]
            if (!document.getElementById(id)) {
              // Create a link.
              var link = document.createElement('a')
              link.id = id
              link.href = '#'
              link.textContent = id
              link.className = 'active'
              // Show or hide layer when the toggle is clicked.
              link.onclick = function (e) {
                var clickedLayer = this.textContent
                e.preventDefault()
                e.stopPropagation()

                var visibility = map.getLayoutProperty(
                  clickedLayer,
                  'visibility'
                )
                // Toggle layer visibility by changing the layout object's visibility property.
                if (visibility === 'visible') {
                  map.setLayoutProperty(
                    clickedLayer,
                    'visibility',
                    'none'
                  )
                  this.className = ''
                } else {
                  this.className = 'active'
                  map.setLayoutProperty(
                    clickedLayer,
                    'visibility',
                    'visible'
                  )
                }
              }
              var layers = document.getElementById('menu')
              layers.appendChild(link)
            }
          }
        }
      })
      </script>
      </body>
      </html>`}>
    </iframe>
)}
