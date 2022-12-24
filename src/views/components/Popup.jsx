export default function Popup({name="Name", description="Desc"}) {
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
          <div className="flex justify-end mt-2">
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}
