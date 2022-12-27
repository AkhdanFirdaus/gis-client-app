import React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearCoordinate } from "../../features/controls/coordinateSlice"

function SelectedCoordinate() {
  const dispatch = useDispatch()
  const { selectedCoordinate } = useSelector((state) => state.coordinate.value)
  const [isVisible, setVisible] = useState(false)

  const handleClearCoordinate = () => {
    dispatch(clearCoordinate())
  }

  useEffect(() => {
    setVisible(selectedCoordinate.length > 1)
  }, [selectedCoordinate])

  if (!isVisible) return (<></>)

  return (
    <div className="w-full">
      <div className="card bg-white">
        <div className="card-body">
          <h6 className="font-medium flex justify-between">
            <span>Selected Coord</span>
            <span className="cursor-pointer" tabIndex={0} onClick={handleClearCoordinate}>x</span>
          </h6>
          <div className="space-y-3">
            <p id="namaRuas"></p>
            <p id="jarakRuas"></p>
            <ul className="list-none">
              <li>Longitude: {selectedCoordinate[0]}</li>
              <li>Latitude: {selectedCoordinate[1]}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectedCoordinate
