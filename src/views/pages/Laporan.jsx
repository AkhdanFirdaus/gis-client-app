import React from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

function Laporan() {
  return (
    <>
      <Navbar hasBack={true} title='Laporan' />
      <div>
      <input type="text" placeholder="Type here" className="input w-full input-bordered bg-white"/>
      </div>
      <ul className="space-y-2 h-max overflow-y-auto">
        {[1, 2, 3, 4, 5].map(val => {
          return (
            <li key={val.toString()}>
              <div className="card shadow card-compact">
                <div className="card-body">
                  <div className="card-title">Jalan Berlubang {val}</div>
                  <div className="card-text">KM: 134</div>
                  <div className="card-text">Oleh Akhdan</div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
      <Footer />
    </>
  )
}

export default Laporan
