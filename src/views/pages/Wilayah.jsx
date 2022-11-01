import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Wilayah() {
  return (
    <>
      <div className="space-y-4">
        <Navbar hasBack={true} title='Wilayah' />
        <Header title='Wilayah' subtitle='24' />
        <input type="text" placeholder="Type here" className="input w-full input-bordered bg-white"/>
        <div className="p-2">
          <ul className="space-y-2 h-max overflow-y-auto">
            {[1, 2, 3, 4, 5].map(val => {
              return (
                <li key={val.toString()}>
                  <div className="card shadow">
                    <div className="card-body">
                      <div className="card-title">Kabupaten Bandung {val}</div>
                      <div className="card-text">lorem ipsum dolor</div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Wilayah

