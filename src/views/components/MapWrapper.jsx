import React from 'react'

import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ';
import GeoJSON from 'ol/format/GeoJSON'
import { useDispatch } from 'react-redux'
import { changeCoordinate } from '../../features/coordinate/coordinateSlice'
import { useGetWilayahJabarQuery } from '../../services/wilayah'

function MapCore(props) {
  const [map, setMap] = React.useState()
  const dispatch = useDispatch()

  const mapElement = React.useRef()

  const mapRef = React.useRef()
  mapRef.current = map

  const baseMapLayer = new TileLayer({
    source: new XYZ({
      url: `https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}`
    })
  })

  const initialFeaturesLayer = new VectorLayer({
    source: new VectorSource(),
  })
  
  React.useEffect(() => {
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
  }, [])

  React.useEffect(() => {
    console.log(props.features)
    if (props.features) {
      initialFeaturesLayer.setSource(
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
    </>
  )
}

function MapWrapper() {
  const { data, error, isLoading } = useGetWilayahJabarQuery()

  if (error) {
    return (
      <>Something Error happened</>
    )
  }

  if (isLoading) {
    return (
      <>Loading...</>
    )
  }

  return (
    <>
      <MapCore features={data} />
    </>
  )
}

export default MapWrapper
