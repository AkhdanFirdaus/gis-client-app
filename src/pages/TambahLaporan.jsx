import React from "react"
import { useNavigate } from "react-router-dom"

function TambahLaporan() {
  const navigate = useNavigate()
  return (
    <>
      Tambah Laporan
      <button type="button" className="btn btn-primary" onClick={() => navigate(-1)}>Kembali</button>
    </>
  )
}

export default TambahLaporan
