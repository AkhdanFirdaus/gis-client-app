import React from "react"
import { useSelector } from "react-redux"

function WilayahDetail() {
  const selectedWilayah = useSelector((state) => state.wilayah.value)

  if (!selectedWilayah) return (<></>)
  return (
    <div className="w-full md:w-1/2">
      <div className="card bg-white">
        <div className="card-body">
          <h1>Wilayah Detail {selectedWilayah}</h1>
        </div>
      </div>
    </div>
  )
}

export default WilayahDetail