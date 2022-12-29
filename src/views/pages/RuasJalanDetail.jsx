import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { clearRuasJalan } from "../../features/ruas/ruasJalanSlice"
import { useGetRuasJalanDetailMutation } from "../../services/ruasJalan"

function RuasJalanDetail({id}) {
  const [getRuasJalanDetail, { error, isLoading, data }] = useGetRuasJalanDetailMutation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (id) getRuasJalanDetail({id})
  }, [id])

  return (
    <div className="w-full">
      <div className="card bg-white">
        <div className="card-body max-h-48 overflow-y-auto">
          <h5 className="flex justify-between">
            <span>Ruas Jalan Detail</span>
            <span className="cursor-pointer" onClick={() => {dispatch(clearRuasJalan())}}>x</span>
          </h5>
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
