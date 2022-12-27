import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { removeOverlay } from "../../features/basemap/basemapSlice"
import { useGetLaporanDetailMutation } from "../../services/laporan"

export default function Popup({name="Name", description="Desc"}) {
  const dispatch = useDispatch()
  const { selectedCoordinate, selectedLaporan } = useSelector((state) => state.coordinate.value)
  const [getLaporan, {isLoading, error, data}] = useGetLaporanDetailMutation()
  
  const handleClose = () => {
    dispatch(removeOverlay({popupId: String(selectedCoordinate)}))
  }

  useEffect(() => {
    if (selectedLaporan) {
      getLaporan({uid: selectedLaporan})
    }
  }, [selectedLaporan])

  return (
    <div className="card bg-white">
      <div className="card-body">
        <h4 className="card-title flex justify-between">
          <span>Laporan</span>
          <span className="cursor-pointer" onClick={handleClose}>x</span>
        </h4>
        <p>{selectedLaporan}</p>
        <div>
          {error ? (
            <>...Error Happened</>
          ) : isLoading ? (
            <>...Loading</>
          ) : data ? (
            <div>
              <p>Deskripsi</p>
              <p>{data.results.deskripsi}</p>
              <p>Tanggal</p>
              <p>{data.results.tanggal}</p>
            </div>
          ) : (
            <>Data is empty</>
          )}
        </div>
      </div>
    </div>
  )
}
