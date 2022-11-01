import React from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

function RuasJalan() {
  return (
    <>
      <Navbar hasBack={true} title='Ruas Jalan' />
      <input type="text" placeholder="Type here" className="input w-full input-bordered bg-white"/>
      <div className="p-2">
        <ul className="space-y-2 h-max overflow-y-auto">
          {[1, 2, 3, 4, 5].map(val => {
            return (
              <li key={val.toString()}>
                <div className="card shadow card-compact">
                  <div className="card-body">
                    <div className="card-title">Jl. A.H. Nasution {val}</div>
                    <div className="card-text">KM: 134-140</div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      <Footer />
    </>
  )
}

export default RuasJalan
