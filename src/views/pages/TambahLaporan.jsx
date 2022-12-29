import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

import { usePostLaporanMutation } from '../../services/laporan'
import { useState } from "react"
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function TambahLaporan() {
  const [alert, setAlert] = useState(false)
  const [message, setMessage] = useState(false)
  const { selectedCoordinate } = useSelector((state) => state.coordinate.value)
  const [postLaporan, {isLoading, error, data}] = usePostLaporanMutation()
  
  const coordRef = useRef()
  const nameRef = useRef()
  const emailRef = useRef()
  const addressRef = useRef()
  const phoneRef = useRef()
  const deskripsiRef = useRef()
  const fileRef = useRef()

  useEffect(() => {
    coordRef.current.value = selectedCoordinate
  }, [selectedCoordinate])

  useEffect(() => {
    setAlert(true)
    if (error) setMessage(error.data.message)
    if (data) setMessage("Success")
  }, [error, data])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const body = {
      koordinat: coordRef.current.value,
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      password: 'password',
      alamatLokasi: addressRef.current.value,
      deskripsi: deskripsiRef.current.value,
      foto: null,
    }
    await postLaporan(new URLSearchParams(body))
  }

  return (
    <div className={`relative ${alert && 'h-screen overflow-y-hidden'}`}>
      <main>
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
              readOnly
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
              <span className="label-text">Email?</span>
              <span className="label-text-alt">Alt label</span>
            </label>
            <input type="text"
              placeholder="Type here"
              className="input input-bordered bg-white w-full"
              ref={emailRef}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Phone?</span>
              <span className="label-text-alt">Alt label</span>
            </label>
            <input type="tel"
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
              ref={deskripsiRef}
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
      </main>
      {alert && (
        <div className='absolute w-full h-full bg-slate-600/10 backdrop-blur-sm top-0 left-0 flex justify-center items-center' onClick={() => {
          setAlert(false)
          setMessage(null)
        }}>
          <div className={`shadow-xl rounded bg-white p-6 flex items-center flex-col space-y-8`}>
            <div>
              <FontAwesomeIcon icon={faInfoCircle} size='1x' width={48} height={48} className='text-blue-600' />
            </div>
            <h3 className="font-bold">{message}</h3>
          </div>
        </div>
      )}
    </div>
  )
}

export default TambahLaporan
