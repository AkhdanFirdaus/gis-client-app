import React from "react";
import { useNavigate } from "react-router-dom";

function Wilayah() {
  const navigate = useNavigate()
  return (
    <>
      Halaman Wilayah
      <button className="btn btn-primary" type="button" onClick={() => navigate(-1)}>Kembali</button>
    </>
  )
}

export default Wilayah

