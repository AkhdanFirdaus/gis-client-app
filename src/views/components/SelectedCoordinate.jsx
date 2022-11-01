import React from "react"
import { useSelector } from "react-redux"

function SelectedCoordinate() {
  const selectedCoordinate = useSelector((state) => state.coordinate.value)
  return (
    <>
      <div className='absolute bg-white left-0 bottom-0 px-5 py-2 m-10'>Selected Coord: {selectedCoordinate[0]}, {selectedCoordinate[1]}</div>
    </>
  )
}

export default SelectedCoordinate
