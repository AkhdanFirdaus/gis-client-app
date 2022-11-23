import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux"
import { changeWilayah } from "../../features/wilayah/wilayahSlice"

function Card({place, handleClick}) {
  const style = {
    card: 'card shadow hover:bg-slate-200 hover:transition-opacity hover:cursor-pointer'
  }

  const selected = useSelector((state) => state.wilayah.value)
  return (
    <div className={`${style.card} ${selected == place ? 'bg-slate-200' : ''}`} onClick={() => handleClick(place)}>
      <div className="card-body">
        <div className="card-title">{place}</div>
      </div>
    </div>
  )
}

function Wilayah() {
  const listWiayah = [
    'Kota Cimahi',
    'Kota Bandung',
    'Kabupaten Bandung Barat',
    'Kabupaten Subang',
    'Kabupaten Purwakarta',
    'Kabupaten Karawang'
  ]
  const dispatch = useDispatch()
  const handleClick = (name) => {
    dispatch(changeWilayah(name))
  }

  return (
    <>
      <div className="space-y-4">
        <Navbar hasBack={true} title='Wilayah' />
        <Header title='Wilayah' subtitle='24' />
        <input type="text" placeholder="Type here" className="input w-full input-bordered bg-white"/>
        <div className="">
          <ul className="space-y-2 p-2 h-max overflow-y-auto">
            {listWiayah.map(val => {
              return (
                <li key={val.toString()}>
                  <Card handleClick={handleClick} place={val} />
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

