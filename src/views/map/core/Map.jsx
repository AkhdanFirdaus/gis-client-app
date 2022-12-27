import { useEffect, useRef, useState } from "react"

import { useDispatch, useSelector } from "react-redux"

import { initMapRef, removeFeatureInteraction, removeLineInteraction, removeMapRef, selectFeature, selectLine } from "../../../features/basemap/basemapSlice"
import { changeCoordinate } from "../../../features/controls/coordinateSlice"
import Popup from "../../components/Popup"

const Map = ({ children, zoom, center }) => {
  const mapRef = useRef()
  const map = useSelector((state) => state.basemap.value)
  const { clickableFeature, clickableLine } = useSelector(state => state.controls.value)
  const [coordPixel, setCoordPixel] = useState(null)

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
    if (clickableFeature) {
      dispatch(selectFeature())
    } else {
      dispatch(removeFeatureInteraction())
    }
  }, [clickableFeature])

  useEffect(() => {
    if (!map) return
    if (clickableLine) {
      dispatch(selectLine())
    } else {
      dispatch(removeLineInteraction())
    }
  }, [clickableLine])

  useEffect(() => {
    if (!map) return
    map.on('click', (e) => {
      setCoordPixel(map.getCoordinateFromPixel(e.pixel))
    })
  }, [])

  useEffect(() => {
    if (coordPixel !== null) dispatch(changeCoordinate({coordinate: coordPixel}))
  }, [coordPixel])

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
