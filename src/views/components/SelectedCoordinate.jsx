import React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearCoordinate } from "../../features/basemap/basemapSlice"

function SelectedCoordinate() {
  const dispatch = useDispatch()
  const { selectedCoordinate } = useSelector((state) => state.basemap.value)
  const [isVisible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(selectedCoordinate.length > 1)
  }, [selectedCoordinate])

  if (!isVisible) return (<></>)

  return (
    <div className="w-full">
      <div className="card bg-white">
        <div className="card-body">
          <h6 className="text-black font-medium">
            <span>Selected Coord</span>
          </h6>
          <div className="space-y-3">
            <ul className="list-none">
              <li>Longitude: {selectedCoordinate[0]}</li>
              <li>Latitude: {selectedCoordinate[1]}</li>
            </ul>
          </div>
          <div className="flex justify-start align-middle space-x-2">
            <button className="btn btn-primary">Add Marker</button>
            <button className="btn btn-outline btn-error" onClick={() => dispatch(clearCoordinate())}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectedCoordinate
