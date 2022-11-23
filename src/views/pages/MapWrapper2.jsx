import { useState } from "react"
import { fromLonLat, get } from "ol/proj"
import GeoJSON from 'ol/format/GeoJSON'

import { Map } from "../map/core"
import { Layers, TileLayer, VectorLayer } from "../map/layers"
import { Controls, FullScreenControl } from "../map/controls"
import { vector, osm, xyz } from "../map/source"
import MapStyles from "../../assets/styles/MapStyles"


const MapWrapper = () => {
  const [center, setCenter] = useState([107.7177, -6.9254])
  const [zoom, setZoom] = useState(9)
  const [showLayer1, setShowLayer1] = useState(true)

  return (
    <>
      <div>
        <Map center={fromLonLat(center)} zoom={zoom}>
          <Layers>
            <TileLayer source={osm()} zIndex={0} />
          </Layers>
          <Controls>
            <FullScreenControl />
          </Controls>
        </Map>
      </div>
    </>
  )
}

export default MapWrapper
