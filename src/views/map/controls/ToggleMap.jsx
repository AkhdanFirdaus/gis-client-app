import { OSM } from "ol/source"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addFeatureLayer, addPointLayer, addTileLayer, toggleLayer } from "../../../features/basemap/basemapSlice"
import { toggleClickFeatureOrLine, toggleMapLayersVisible } from "../../../features/controls/controlSlice"
import { toggleMenu as toggleMenuAction } from "../../../features/menu/menuSlice"
import { useGetLaporanGeoJSONQuery, useGetLaporanQuery } from "../../../services/laporan"
import { useGetRuasJalanGeoJSONQuery } from "../../../services/ruasJalan"
import { useGetWilayahUPTD3JabarQuery } from "../../../services/wilayah"

function ToggleLeftRightItem({left, right, value, handle}) {
  return (
    <div className="form-control">
      <label className="cursor-pointer label">
        <span className="label-text">{left}</span>
        <input 
          type="checkbox" 
          className="toggle"
          defaultChecked={value}
          value={value} 
          onChange={handle} 
        />
        <span className="label-text">{right}</span>
      </label>
    </div>
  )
}

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

  const { isSuccess: successWilayah, data: dataWilayah } = useGetWilayahUPTD3JabarQuery()
  const { isSuccess: successRuasJalan, data: dataRuasJalan } = useGetRuasJalanGeoJSONQuery()
  const { isSuccess: successLaporan, data: dataLaporan } = useGetLaporanGeoJSONQuery()
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
        width: 2,
        name: layerName
      }))
      dispatch(toggleMapLayersVisible({layerName}))
    }
  }, [successRuasJalan, dataRuasJalan])

  useEffect(() => {
    if (dataLaporan) {
      const { results } = dataLaporan
      const layerName = 'laporan_point'
      dispatch(addPointLayer({
        data: results, 
        name: layerName
      }))
      dispatch(toggleMapLayersVisible({layerName}))
    }
  }, [successLaporan, dataLaporan])

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

  const { clickableFeaturerOrLine } = useSelector(state => state.controls.value)

  return (
    <div className="w-full">
      <div className="card bg-white">
        <div className="card-body">
          <ToggleItem id='menu' name='Menu' isVisible={false} />
          <ToggleItem 
            id='wilayah_uptd3' 
            name='Wilayah UPTD 3' 
          />
          <ToggleItem 
            id='ruas_jalan_all' 
            name='Ruas Jalan'
          />
          <ToggleItem 
            id='laporan_point' 
            name='Laporan'
          />
          <ToggleItem id='baseosm' name='Base Map' />
          <hr />
          <ToggleLeftRightItem 
            left='Ruas' 
            right='Wilayah' 
            value={clickableFeaturerOrLine}
            handle={() => {
              dispatch(toggleClickFeatureOrLine())
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ToggleComponent
