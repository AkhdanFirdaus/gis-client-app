import React from "react"
import { FullScreen } from "ol/control"
import MapContext from "../core/MapContext"

const FullScreenControl = () => {
  const { map } = React.useContext(MapContext)

  React.useEffect(() => {
    if (!map) return
    const fullScreenControl = new FullScreen({})
    map.controls.push(fullScreenControl)
    
    return () => map.controls.remove(fullScreenControl)
  }, [map])

  return null
}

export default FullScreenControl
