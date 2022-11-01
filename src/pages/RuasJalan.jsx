import React from "react"
import { useNavigate } from "react-router-dom"

function RuasJalan() {
  const navigate = useNavigate()
  return (
    <>
      Ruas Jalan
      <button type="button" className="btn btn-primary" onClick={() => navigate(-1)}>Kembali</button>
    </>
  )
}

export default RuasJalan
