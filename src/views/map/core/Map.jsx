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
import { changeRuasJalan } from "../../../features/ruas/ruasJalanSlice"
import { changeWilayah } from "../../../features/wilayah/wilayahSlice"
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
      map.forEachFeatureAtPixel(e.pixel, (feature) => {
        const type = feature.getGeometry().getType()
        if (type === 'Point') {
          hasPoint = true
          let laporanId = feature.get('uid')
          console.log('Ini Point? ', hasPoint)
          dispatch(changeCoordinate({coordinate: coord, hasPoint, laporanId}))
        }
        if (type === 'LineString' || type === 'MultiLineString') {
          const ruasId = feature.get('id')
          console.log(ruasId)
          dispatch(changeRuasJalan(ruasId))
        }
        if (type === 'MultiPolygon' || type === 'Polygon') {
          const wilayahId = feature.get('id')
          console.log(wilayahId)
          dispatch(changeWilayah(wilayahId))
        }
      })
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
