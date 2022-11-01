import React from "react"
import { useNavigate } from "react-router-dom"

function Laporan() {
  const navigate = useNavigate()
  return (
    <>
      Laporan
      <button type="button" className="btn btn-primary" onClick={() => navigate(-1)}>Kembali</button>
    </>
  )
}

export default Laporan
