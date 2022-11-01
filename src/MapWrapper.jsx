import React from 'react'

import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ';
import Style from 'ol/style/Style'
import GeoJSON from 'ol/format/GeoJSON'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import { useDispatch } from 'react-redux'
import { changeCoordinate } from './features/coordinate/coordinateSlice'


function MapWrapper(props) {
  const [map, setMap] = React.useState()
  const [featuresLayer, setFeaturesLayer] = React.useState()
  const dispatch = useDispatch()

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
      style: new Style({
        fill: new Fill({
          color: '#0000ff',
        }),
        stroke: new Stroke({
          color: '#000',
          width: 2,
        })
      })
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
    if (props.features) {
      featuresLayer.setSource(
        new VectorSource({
          features: new GeoJSON().readFeatures(props.features)
        })
      )
    }
  }, [props.features])

  const handleMapClick = (event) => {
    const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel)
    console.log(clickedCoord)
    dispatch(changeCoordinate(clickedCoord))
  }

  return (
    <>
      <div ref={mapElement} className="w-full h-screen"></div>
      {/* <div className='absolute bg-white left-0 bottom-0 px-5 py-2 m-10'>Selected Coord: {selectedCoord}</div> */}
    </>
  )
}

export default MapWrapper
