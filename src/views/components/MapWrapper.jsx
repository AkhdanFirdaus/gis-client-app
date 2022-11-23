import React from 'react'

import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ';
import GeoJSON from 'ol/format/GeoJSON'

import { useDispatch, useSelector } from 'react-redux'
import { changeCoordinate } from '../../features/coordinate/coordinateSlice'
import { useGetWilayahUPTD3JabarQuery } from '../../services/wilayah'

import { Player } from '@lottiefiles/react-lottie-player'
import loadingMap from '../../assets/lottie/97952-loading-animation-blue.json'
import Style from 'ol/style/Style'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import Select from 'ol/interaction/Select'
import { altKeyOnly, click, pointerMove } from 'ol/events/condition'

function MapCore(props) {
  const [map, setMap] = React.useState()
  const dispatch = useDispatch()

  const mapElement = React.useRef()
  const mapRef = React.useRef()
  mapRef.current = map

  const basemapVisiblity = useSelector((state) => state.basemap.value)

  const baseMapLayer = new TileLayer({
    source: new XYZ({
      url: `https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}`
    })
  })

  const initialFeaturesLayer = new VectorLayer({
    source: new VectorSource()
  })

  const selectStyle = new Style({
    fill: new Fill({
      color: '#eeeeee'
    }),
    stroke: new Stroke({
      color: 'rgba(255, 255, 255, 0.7)',
      width: 2
    })
  })

  let selected = null

  const handleMapClick = (event) => {
    const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel)
    dispatch(changeCoordinate(clickedCoord))
    
    if (selected !== null) {
      selected.setStyle(undefined)
      selected = null
    }

    mapRef.current.forEachFeatureAtPixel(event.pixel, (f) => {
      selected = f
      selectStyle.getFill().setColor('#ffeeee')
      f.setStyle(selectStyle)
      return true
    })
  }

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

    // const style = new Style({
    //   fill: new Fill({
    //     color: '#eeeeee',
    //   })
    // })
    // 
    // const selected = new Style({
    //   fill: new Fill({
    //     color: '#eeeeee'
    //   }),
    //   stroke: new Stroke({
    //     color: 'rgba(255, 255, 255, 0.7',
    //     width:2
    //   })
    // })
  
    // const selectStyle = (feature) => {
    //   const color = feature.get('COLOR') || '#eeeeee'
    //   selected.getFill().setColor(color)
    //   return selected
    // }

    // let select = new Select({
    //   condition: pointerMove,
    //   style: selectStyle
    // })

    // initialMap.addInteraction(select)

    setMap(initialMap)
  }, [])

  React.useEffect(() => {
    if (props.features) {
      initialFeaturesLayer.setSource(
        new VectorSource({
          features: new GeoJSON().readFeatures(props.features)
        })
      )
    }
  }, [props.features])

  React.useEffect(() => {
    console.log(map)
  }, [basemapVisiblity])

  return (
    <>
      <div ref={mapElement} className="w-full h-screen"></div>
    </>
  )
}

function MapWrapper() {
  const { data, error, isLoading } = useGetWilayahUPTD3JabarQuery()

  if (error) return (<>Something Error happened</>)
  if (isLoading) return (
    <>
      <div className='flex justify-center items-center w-screen h-screen'>
        <div className='w-48 h-48'>
          <Player src={loadingMap} loop autoplay />
        </div>
      </div>
    </>
  )
  return (
    <>
      <MapCore features={data} />
    </>
  )
}

export default MapWrapper
