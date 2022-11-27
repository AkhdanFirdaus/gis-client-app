import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addFeatureLayer, toggleLayer } from "../../../features/basemap/basemapSlice"
import { toggleMenu as toggleMenuAction } from "../../../features/menu/menuSlice"


function ToggleComponent() {
  const dispatch = useDispatch()

  const { visible } = useSelector((state) => state.basemap.value)
  const mapVisiblity = useSelector((state) => state.menu.value)
  
  useEffect(() => {
    fetch('http://127.0.0.1:5173/wilayah_uptd3.geojson')
      .then(response => response.json())
      .then(result => {
        dispatch(addFeatureLayer({...result, color: 'magenta', featureType: 'geojson'}))
      })
      .then(() => {
        dispatch(addFeatureLayer({name: 'marker', featureType: 'vector'}))
      })
  }, [])

  const toggleMenu = () => {
    dispatch(toggleMenuAction())
  }

  const toggleUptd = () => {
    dispatch(toggleLayer('wilayah_uptd3'))
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
