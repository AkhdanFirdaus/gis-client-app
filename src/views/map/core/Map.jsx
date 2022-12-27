import { useEffect, useRef, useState } from "react"

import { useDispatch, useSelector } from "react-redux"

import { 
  initMapRef, 
  removeMapRef, 
  addInteraction,
  removeInteraction,
  toggleFeatureOrLayerInteraction
} from "../../../features/basemap/basemapSlice"
import { changeCoordinate } from "../../../features/controls/coordinateSlice"
import Popup from "../../components/Popup"
import { selectLineClick } from "../controls/interactions"

const Map = ({ children, zoom, center }) => {
  const mapRef = useRef()
  const map = useSelector((state) => state.basemap.value)
  const { clickFeatureOrLine } = useSelector(state => state.controls.value)
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
    map.on('click', (e) => {
      setCoordPixel(map.getCoordinateFromPixel(e.pixel))
    })
  }, [])

  useEffect(() => {
    if (coordPixel !== null) dispatch(changeCoordinate({coordinate: coordPixel}))
  }, [coordPixel])

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
