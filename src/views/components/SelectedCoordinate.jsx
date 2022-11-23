import React from "react"
import { useSelector } from "react-redux"

function SelectedCoordinate() {
  const selectedCoordinate = useSelector((state) => state.coordinate.value)

  return (
    <div className="card bg-white">
      <div className="card-body">
        <h6 className="text-black font-medium">Selected Coord</h6>
        <p>{selectedCoordinate[0]}, {selectedCoordinate[1]}</p>
      </div>
    </div>
  )
}

export default SelectedCoordinate
