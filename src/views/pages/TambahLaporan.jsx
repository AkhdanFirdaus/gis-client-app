import React from "react"
import { useSelector } from "react-redux"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

function TambahLaporan() {
  const { selectedCoordinate: koordinat } = useSelector((state) => state.basemap.value)
  return (
    <>
      <Navbar hasBack={true} title='Tambah Laporan' />
      <form className="space-y-4 h-full">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Koordinat</span>
            <span className="label-text-alt">Alt label</span>
          </label>
          <input type="text" placeholder="Type here" className="input input-bordered bg-white w-full" value={koordinat} />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">What is your name?</span>
            <span className="label-text-alt">Alt label</span>
          </label>
          <input type="text" placeholder="Type here" className="input input-bordered bg-white w-full" />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Email/Phone?</span>
            <span className="label-text-alt">Alt label</span>
          </label>
          <input type="text" placeholder="Type here" className="input input-bordered bg-white w-full" />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Alamat?</span>
            <span className="label-text-alt">Alt label</span>
          </label>
          <textarea className="textarea textarea-bordered bg-white w-full" placeholder="Type Here"></textarea>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Keluhan?</span>
            <span className="label-text-alt">Alt label</span>
          </label>
          <textarea className="textarea textarea-bordered bg-white w-full" placeholder="Type Here"></textarea>
        </div>
        <input type="file" className="file-input file-input-bordered bg-white w-full" />
        <button type="submit" className="btn btn-primary">Kirim</button>
      </form>
      <Footer />
    </>
  )
}

export default TambahLaporan
