import { useState } from "react"
import { Map } from "../map/core"

const MapWrapper = () => {
  const [center, setCenter] = useState([107.7177, -6.9254])
  const [zoom, setZoom] = useState(9)

  return (
    <>
      <Map center={center} zoom={zoom}></Map>
    </>
  )
}

export default MapWrapper
