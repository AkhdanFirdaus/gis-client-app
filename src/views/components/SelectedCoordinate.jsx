import React from "react"
import { useSelector } from "react-redux"

function SelectedCoordinate() {
  const selectedCoordinate = useSelector((state) => state.coordinate.value)

  if (selectedCoordinate.length < 1) return (<></>)
  return (
    <div className="w-full md:w-1/2">
      <div className="card bg-white">
        <div className="card-body">
          <h6 className="text-black font-medium">Selected Coord</h6>
          <p>{selectedCoordinate[0]}, {selectedCoordinate[1]}</p>
        </div>
      </div>
    </div>
  )
}

export default SelectedCoordinate
