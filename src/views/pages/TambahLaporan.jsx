import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

import { usePostLaporanMutation } from '../../services/laporan'

function TambahLaporan() {
  const selectedCoordinate = useSelector((state) => state.coordinate.value)
  const [postLaporan, {isLoading, error, data}] = usePostLaporanMutation()
  
  const coordRef = useRef()
  const nameRef = useRef()
  const phoneRef = useRef()
  const addressRef = useRef()
  const reportRef = useRef()
  const fileRef = useRef()

  useEffect(() => {
    coordRef.current.value = selectedCoordinate
  }, [selectedCoordinate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const body = {
      coordinator: coordRef.current.value,
      name: nameRef.current.value,
      phone: phoneRef.current.value,
      address: addressRef.current.value,
      report: reportRef.current.value,
    }
    await postLaporan(new URLSearchParams(body))
  }

  return (
    <>
      <Navbar hasBack={true} title='Tambah Laporan' />
      <form onSubmit={handleSubmit} className="space-y-4 h-full">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Koordinat</span>
            <span className="label-text-alt">Alt label</span>
          </label>
          <input 
            type="text" 
            placeholder="Type here" 
            className="input input-bordered bg-white w-full" 
            ref={coordRef}
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">What is your name?</span>
            <span className="label-text-alt">Alt label</span>
          </label>
          <input 
            type="text"
            placeholder="Type here"
            className="input input-bordered bg-white w-full"
            ref={nameRef}
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Email/Phone?</span>
            <span className="label-text-alt">Alt label</span>
          </label>
          <input type="text"
            placeholder="Type here"
            className="input input-bordered bg-white w-full"
            ref={phoneRef}
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Alamat?</span>
            <span className="label-text-alt">Alt label</span>
          </label>
          <textarea 
            className="textarea textarea-bordered bg-white w-full"
            placeholder="Type Here"
            ref={addressRef}
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Keluhan?</span>
            <span className="label-text-alt">Alt label</span>
          </label>
          <textarea 
            className="textarea textarea-bordered bg-white w-full" 
            placeholder="Type Here"
            ref={reportRef}
          />
        </div>
        <input 
          type="file" 
          className="file-input file-input-bordered bg-white w-full"
          ref={fileRef}
        />
        <button type="submit" className="btn btn-primary" disabled={isLoading}>{isLoading ? '...Loading' : 'Kirim'}</button>
      </form>
      <Footer />
    </>
  )
}

export default TambahLaporan
