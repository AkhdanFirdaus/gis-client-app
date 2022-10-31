import React from 'react'

import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ';
import Style from 'ol/style/Style'


function MapWrapper(props) {
  const [map, setMap] = React.useState()
  const [featuresLayer, setFeaturesLayer] = React.useState()
  const [selectedCoord, setSelectedCoord] = React.useState()

  const mapElement = React.useRef()

  const mapRef = React.useRef()
  mapRef.current = map

  const baseMapLayer = new TileLayer({
    source: new XYZ({
      url: `https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}`
    })
  })

  React.useEffect(() => {
    const initialFeaturesLayer = new VectorLayer({
      source: new VectorSource(),
      style: (feature) => {
        const style = new Style({
          fill: new Fill({
            color: [255, 255, 255, 0.5]
          }),
          stroke: new Stroke({
            color: [0, 153, 255, 1],
            width: 2,
          })
        })
        return style
      }
    })

    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        baseMapLayer,
        initialFeaturesLayer,
      ],
      view: new View({
        projection: 'EPSG:4326',
        center: [107.7177, -6.9254],
        zoom: 13,
      }),
      controls: []
    })

    initialMap.on('click', handleMapClick)

    setMap(initialMap)
    setFeaturesLayer(initialFeaturesLayer)
  }, [])

  React.useEffect(() => {
    if (props.features.length) {
      featuresLayer.setSource(
        new VectorSource({
          features: props.features
        })
      )

      map.getView().fit(featuresLayer.getSource().getExtent(), {
        padding: [100, 100, 100, 100]
      })
    }
  }, [props.features])

  const handleMapClick = (event) => {
    const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel)
    setSelectedCoord(clickedCoord)
    console.log(clickedCoord)
  }

  return (
    <div ref={mapElement} className="w-full h-screen"></div>
  )
}

export default MapWrapper
