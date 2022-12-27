import { useEffect, useRef, useState } from "react"

import { useDispatch, useSelector } from "react-redux"

import { 
  initMapRef, 
  removeMapRef, 
  addInteraction,
  removeInteraction,
  toggleFeatureOrLayerInteraction,
  addOverlay
} from "../../../features/basemap/basemapSlice"
import { changeCoordinate } from "../../../features/controls/coordinateSlice"
import Popup from "../../components/Popup"

const Map = ({ children, zoom, center }) => {
  const mapRef = useRef()
  const map = useSelector((state) => state.basemap.value)
  const { clickFeatureOrLine } = useSelector(state => state.controls.value)
  const { selectedCoordinate, currentCoordinateHasPoint } = useSelector(state => state.coordinate.value)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initMapRef(mapRef.current))
    return () => dispatch(removeMapRef())
  }, [])
  
  useEffect(() => {
    if (!map) return
    map.getView().setZoom(zoom)
  }, [zoom])

  useEffect(() => {
    if (!map) return
    map.getView().setCenter(center)
  }, [center])

  useEffect(() => {
    if (!map) return
    map.on('click', (e) => {
      const coord = map.getCoordinateFromPixel(e.pixel)
      let hasPoint = false
      let laporanId = null
      map.forEachFeatureAtPixel(e.pixel, (feature) => {
        if (feature.getGeometry().getType() === 'Point') {
          hasPoint = true
          laporanId = feature.get('uid')
        }
      })
      console.log('Ini Point? ', hasPoint)
      dispatch(changeCoordinate({coordinate: coord, hasPoint, laporanId}))
    })
  }, [])

  useEffect(() => {
    if (!map) return
    if (currentCoordinateHasPoint) {
      dispatch(addOverlay({
        coordinate: selectedCoordinate, 
        popupId: String(selectedCoordinate)
      }))
    }
  }, [currentCoordinateHasPoint])

  useEffect(() => {
    if (!map) return
    dispatch(addInteraction())
    return () => {
      dispatch(removeInteraction())
    }
  }, [])

  useEffect(() => {
    if (!map) return
    dispatch(toggleFeatureOrLayerInteraction({feature: clickFeatureOrLine}))
  }, [clickFeatureOrLine])

  return (
    <>
      <div className="w-full h-screen" ref={mapRef}>
        {children}
        <div className="hidden">
          <div id="popup-overlay">
            <Popup name='Ini Nama' description='Ini Description' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Map
