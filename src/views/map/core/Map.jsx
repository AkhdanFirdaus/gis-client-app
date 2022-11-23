import { useEffect, useRef } from "react"

import { OSM } from "ol/source"
import { useDispatch, useSelector } from "react-redux"

import { initMapRef, removeMapRef, addTileLayer } from "../../../features/basemap/basemapSlice"

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
  }, [zoom, map])

  useEffect(() => {
    if (!map) return
    map.getView().setCenter(center)
  }, [center, map])

  return (
    <>
      <div className="w-full h-screen" ref={mapRef}>
        {children}
      </div>
    </>
  )
}

export default Map