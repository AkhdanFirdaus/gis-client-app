import { useEffect, useRef } from "react"

import { OSM } from "ol/source"
import { useDispatch, useSelector } from "react-redux"

import { initMapRef, removeMapRef, addTileLayer, selectFeature, changeCoordinate } from "../../../features/basemap/basemapSlice"
import Popup from "../../components/Popup"
import { Overlay } from "ol"

const Map = ({ children, zoom, center }) => {
  const mapRef = useRef()
  const map = useSelector((state) => state.basemap.value.map)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initMapRef(mapRef.current))
    dispatch(addTileLayer({
      tile: new OSM(),
      name: 'baseosm'
    }))
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
    dispatch(selectFeature())
  }, [])
  
  useEffect(() => {
    if (!map) return
    map.on('click', (e) => {
      const selected = map.getCoordinateFromPixel(e.pixel)
      dispatch(changeCoordinate(selected))

      const overlay = new Overlay({
        element: document.querySelector('#popup-overlay'),
        autoPan: {
          animation: {
            duration: 250
          }
        }
      })
      overlay.setPosition(selected)
      map.addOverlay(overlay)
    })
  }, [])

  return (
    <>
      <div className="w-full h-screen" ref={mapRef}>
        {children}
        <div id="popup-overlay">
          <Popup name='Ini Nama' description='Ini Description' />
        </div>
      </div>
    </>
  )
}

export default Map
