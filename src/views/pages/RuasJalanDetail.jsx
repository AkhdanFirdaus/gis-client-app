import React from "react"
import { useGetRuasJalanDetailQuery } from "../../services/ruasJalan"

function RuasJalanDetail(id) {
  const { error, isLoading, data } = useGetRuasJalanDetailQuery(id)
  return (
    <div className="w-full">
      <div className="card bg-white">
        <div className="card-body">
          <h5>Ruas Jalan Detail</h5>
          {error ? (
            <>Error happened</>
          ) : isLoading ? (
            <>...Loading</>
          ) : data ? (
            <>
              <h5>{data.result.nama}</h5>
              <p>Deskripsi:</p>
              <p dangerouslySetInnerHTML={{ __html: data.result.deskripsi }} />
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

export default RuasJalanDetail
