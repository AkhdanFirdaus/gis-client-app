import { useEffect } from "react"
import { useGetRuasJalanDetailMutation } from "../../services/ruasJalan"

function RuasJalanDetail({id}) {
  const [getRuasJalanDetail, { error, isLoading, data }] = useGetRuasJalanDetailMutation()

  useEffect(() => {
    if (id) getRuasJalanDetail({id})
  }, [id])

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
