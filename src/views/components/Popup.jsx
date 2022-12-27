import { useDispatch, useSelector } from "react-redux"
import { removeOverlay } from "../../features/basemap/basemapSlice"

export default function Popup({name="Name", description="Desc"}) {
  const dispatch = useDispatch()
  const selectedCoordinate = useSelector((state) => state.coordinate.value)
  
  const handleClose = () => {
    const id = Array.from(selectedCoordinate).join(',')
    dispatch(removeOverlay({popupId: id}))
  }

  return (
    <div className="card bg-white">
      <div className="card-body">
        <h4 className="card-title">Silahkan Masukkan Detail</h4>
        <form>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea placeholder="Type here" className="textarea textarea-bordered w-full" />
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <button type="button" className="btn btn-outline btn-error" onClick={handleClose}>Cancel</button>
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}
