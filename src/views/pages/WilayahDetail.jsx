import React from "react"
import { useGetWilayahDetailQuery } from "../../services/wilayah"

function WilayahDetail(id) {
  const { error, isLoading, data } = useGetWilayahDetailQuery(id)
  return (
    <div className="w-full">
      <div className="card bg-white">
        <div className="card-body">
          <h5>Wilayah Detail</h5>
          {error ? (
            <>Error happened</>
          ) : isLoading ? (
            <>...Loading</>
          ) : data ? (
            <>
              <h5>{data.result.nama}</h5>
              <p>Luas: {data.result.luas / 1000} km</p>
              <p>Deskripsi: {data.result.deskripsi ?? 'Tidak ada'}</p>
            </>
          ) : (
            <>
              <p>Data is Empty</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default WilayahDetail
