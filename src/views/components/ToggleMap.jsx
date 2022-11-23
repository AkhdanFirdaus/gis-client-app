import { useDispatch, useSelector } from "react-redux"
import { toggleMap, addFeatureLayer } from "../../features/basemap/basemapSlice"


function ToggleComponent() {
  const dispatch = useDispatch()

  const { visible } = useSelector((state) => state.basemap.value)

  const showUptd = () => {
    fetch('http://127.0.0.1:5173/wilayah_uptd3.geojson')
      .then(response => response.json())
      .then(result => {
        dispatch(addFeatureLayer(result))
      })
  }

  return (
    <div className="w-full md:w-1/2">
      <div className="card bg-white">
        <div className="card-body">
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text">Wilayah UPTD 3</span>
              <button 
                className="btn btn-sm btn-primary" 
                onClick={showUptd} 
              >
                +
              </button>
            </label>
          </div>
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text">Toggle Map</span> 
              <input 
                type="checkbox" 
                className="toggle toggle-accent" 
                defaultChecked={visible} 
                value={visible} 
                onChange={() => dispatch(toggleMap())} 
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToggleComponent
