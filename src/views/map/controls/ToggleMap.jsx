import { OSM } from "ol/source"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addFeatureLayer, addTileLayer, toggleLayer } from "../../../features/basemap/basemapSlice"
import { toggleFeatureClick, toggleLineClick, toggleMapLayersVisible } from "../../../features/controls/controlSlice"
import { toggleMenu as toggleMenuAction } from "../../../features/menu/menuSlice"
import { useGetRuasJalanGeoJSONQuery } from "../../../services/ruasJalan"
import { useGetWilayahUPTD3JabarQuery } from "../../../services/wilayah"

function ToggleItem({id, name, hasClickAction = false, clickValue, handleClickAction, isVisible = true}) {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(isVisible)
  
  const toggleVisible = () => {
    setVisible(!visible)
    if (id === 'menu') {
      dispatch(toggleMenuAction())
    } else {
      dispatch(toggleLayer({name: id}))
    }
  }

  return (
    <div className="form-control">
      <label className="cursor-pointer label">
        <span className="label-text">{name}</span>
        {hasClickAction && (<input 
          type="checkbox" 
          className="checkbox" 
          defaultChecked={clickValue}
          value={clickValue} 
          onChange={handleClickAction} 
        />)}
        <input 
          type="checkbox" 
          className="toggle"
          defaultChecked={visible}
          value={visible} 
          onChange={toggleVisible} 
        />
      </label>
    </div>
  )
}

function ToggleComponent() {
  const dispatch = useDispatch()
  const { mapLayersVisible } = useSelector((state) => state.controls.value)

  const { isSuccess: successWilayah, data: dataWilayah } = useGetWilayahUPTD3JabarQuery()
  const { isSuccess: successRuasJalan, data: dataRuasJalan } = useGetRuasJalanGeoJSONQuery()
  // const { isSuccess: successDirection, data: dataDirection } = useGetDirectionQuery()

  useEffect(() => {
    dispatch(addTileLayer({tile: new OSM(), name: 'baseosm'}))
    dispatch(addFeatureLayer({name: 'marker', featureType: 'marker'}))
  }, [])

  useEffect(() => {
    if (dataWilayah) {
      const { results } = dataWilayah
      const layerName = 'wilayah_uptd3'
      dispatch(addFeatureLayer({
        ...results, 
        color: 'magenta', 
        featureType: 'geojson', 
        name: layerName
      }))
      dispatch(toggleMapLayersVisible({layerName}))
    }
  }, [successWilayah, dataWilayah])

  useEffect(() => {
    if (dataRuasJalan) {
      const { results } = dataRuasJalan
      const layerName = 'ruas_jalan_all'
      dispatch(addFeatureLayer({
        ...results, 
        strokeColor: 'yellow', 
        featureType: 'geojson', 
        name: layerName
      }))
      dispatch(toggleMapLayersVisible({layerName}))
    }
  }, [successRuasJalan, dataRuasJalan])

  // useEffect(() => {
  //   if (dataDirection) {
  //     const results = dataDirection
  //     console.log(results)
  //     const layerName = 'direction'
  //     dispatch(addFeatureLayer({
  //       ...results, 
  //       strokeColor: 'magenta', 
  //       featureType: 'geojson', 
  //       name: layerName
  //     }))
  //     dispatch(toggleMapLayersVisible({layerName}))
  //   }
  // }, [successDirection, dataDirection])

  const { clickableFeature, clickableLine } = useSelector(state => state.controls.value)

  return (
    <div className="w-full">
      <div className="card bg-white">
        <div className="card-body">
          <ToggleItem id='menu' name='Menu' isVisible={false} />
          <ToggleItem 
            id='wilayah_uptd3' 
            name='Wilayah UPTD 3' 
            hasClickAction={true}
            clickValue={clickableFeature}
            handleClickAction={() => {
              dispatch(toggleFeatureClick())
            }}
          />
          <ToggleItem 
            id='ruas_jalan_all' 
            name='Ruas Jalan'
            hasClickAction={true}
            clickValue={clickableLine}
            handleClickAction={() => {
              dispatch(toggleLineClick())
            }}
          />
          <ToggleItem id='baseosm' name='Base Map' />
        </div>
      </div>
    </div>
  )
}

export default ToggleComponent
