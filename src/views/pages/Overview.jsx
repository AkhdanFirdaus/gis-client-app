import React from "react"
import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Navbar from "../components/Navbar"

function Overview() {
  return (
    <>
      <div className="h-full flex flex-col justify-between">
        <Navbar title='Overview' />
        <main>
          <Header title='Rata-Rata' subtitle='Indeks Kondisi Perkerasan' />
          <div className='mt-4'>
            <div className="grid grid-cols-2 gap-4">
              <Link to={'/wilayah'}>
                <div className='card bg-white shadow'>
                  <div className='card-body items-center text-center'>
                    <h2 className="card-title">24</h2>
                    <p>Wilayah</p>
                  </div>
                </div>
              </Link>
              <Link to={'/ruas-jalan'}>
                <div className='card bg-white shadow'>
                  <div className='card-body items-center text-center'>
                    <h2 className="card-title">123</h2>
                    <p>Ruas Jalan</p>
                  </div>
                </div>
              </Link>
              <Link to={'/laporan'}>
                <div className='card bg-white shadow'>
                  <div className='card-body items-center text-center'>
                    <h2 className="card-title">4</h2>
                    <p>Laporan</p>
                  </div>
                </div>
              </Link>
              <Link to={'/buat-laporan'}>
                <div className='card bg-white shadow'>
                  <div className='card-body items-center text-center'>
                    <h2 className="card-title">+</h2>
                    <p>Buat Laporan</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Overview
