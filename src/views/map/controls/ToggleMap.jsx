import { OSM } from "ol/source"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addFeatureLayer, addTileLayer, toggleLayer } from "../../../features/basemap/basemapSlice"
import { toggleMenu as toggleMenuAction } from "../../../features/menu/menuSlice"
import { useGetRuasJalanGeoJSONQuery } from "../../../services/ruasJalan"
import { useGetWilayahUPTD3JabarQuery } from "../../../services/wilayah"


function ToggleComponent() {
  const dispatch = useDispatch()

  const { visible } = useSelector((state) => state.basemap.value)
  const mapVisiblity = useSelector((state) => state.menu.value)
  const [allowClickWilayah, setAllowClickWilayah] = useState(true)

  const { isSuccess: successWilayah, data: dataWilayah } = useGetWilayahUPTD3JabarQuery()
  const { isSuccess: successRuasJalan, data: dataRuasJalan } = useGetRuasJalanGeoJSONQuery()

  useEffect(() => {
    dispatch(addTileLayer({tile: new OSM(), name: 'baseosm'}))
    dispatch(addFeatureLayer({name: 'marker', featureType: 'marker'}))
  }, [])

  useEffect(() => {
    if (dataWilayah) {
      const { results } = dataWilayah
      dispatch(addFeatureLayer({
        ...results, 
        color: 'magenta', 
        featureType: 'geojson', 
        name: 'wilayah_uptd3'
      }))
    }
  }, [successWilayah, dataWilayah])

  useEffect(() => {
    if (dataRuasJalan) {
      const { results } = dataRuasJalan
      dispatch(addFeatureLayer({
        ...results, 
        color: 'yellow', 
        featureType: 'geojson', 
        name: 'ruas_jalan_all'
      }))
    }
  }, [successRuasJalan, dataRuasJalan])

  const toggleMenu = () => {
    dispatch(toggleMenuAction())
  }

  const toggleUptd = () => {
    dispatch(toggleLayer('wilayah_uptd3'))
  }

  const toggleRuasJalan = () => {
    dispatch(toggleLayer('ruas_jalan_all'))
  }

  const toggleBase = () => {
    dispatch(toggleLayer('baseosm'))
  }

  return (
    <div className="w-full">
      <div className="card bg-white">
        <div className="card-body">
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text">Menu</span>
              <input 
                type="checkbox" 
                className="toggle" 
                defaultChecked={mapVisiblity} 
                value={mapVisiblity} 
                onChange={toggleMenu} 
              />
            </label>
          </div>
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text">Wilayah UPTD 3</span>
              <input type="checkbox" checked={allowClickWilayah} className="checkbox" onChange={() => setAllowClickWilayah(!allowClickWilayah)} />
              <input 
                type="checkbox" 
                className="toggle" 
                defaultChecked={visible} 
                value={visible} 
                onChange={toggleUptd} 
              />
            </label>
          </div>
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text">Ruas Jalan</span>
              <input 
                type="checkbox" 
                className="toggle" 
                defaultChecked={visible} 
                value={visible} 
                onChange={toggleRuasJalan} 
              />
            </label>
          </div>
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text">Toggle Map</span> 
              <input 
                type="checkbox" 
                className="toggle" 
                defaultChecked={visible} 
                value={visible} 
                onChange={toggleBase} 
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToggleComponent
