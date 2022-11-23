import React from "react"
import { useDispatch, useSelector } from "react-redux"
import WilayahDetail from "../pages/WilayahDetail"
import SelectedCoordinate from "./SelectedCoordinate"
import { toggleMap } from "../../features/basemap/basemapSlice"

function ControlComponent() {
  const dispatch = useDispatch()
  const mapVisibility = useSelector((state) => state.basemap.value)

  // React.useEffect(() => {
  //   console.log(mapVisibility.visible)
  // }, [mapVisibility])
  return (
    <>
      <div className="card bg-white">
        <div className="card-body">
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text">Remember me</span> 
              <input 
                type="checkbox" 
                className="toggle toggle-accent" 
                defaultChecked={mapVisibility} 
                value={mapVisibility} 
                onChange={() => dispatch(toggleMap())} 
              />
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

function SelectedComponent() {
  return (
    <>
      <div className='absolute left-0 bottom-0 m-10 w-1/3 space-y-3'>
        <WilayahDetail />
        <SelectedCoordinate />
        <ControlComponent />
      </div>
    </>
  )
}

export default SelectedComponent
