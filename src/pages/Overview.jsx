import React from "react"
import { Link } from "react-router-dom"

function Overview() {
  return (
    <>
      <div className="h-full flex flex-col justify-between">
        <div className='navbar'>
          <div className='flex-none'>
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://placeimg.com/80/80/people" />
              </div>
            </label>
          </div>
          <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">Overview</a>
          </div>
        </div>
        <main className="my-4">
          <div>
            
              <div className="card lg:card-side bg-base-100 shadow">
                <figure><img src="https://placeimg.com/140/140/arch" alt="Album"/></figure>
                <div className="card-body justify-center">
                  <p>Indeks Kondisi Perkerasan</p>
                  <h2 className="card-title">Rata-Rata</h2>
                </div>
              </div>
          </div>
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
        <footer className="flex justify-end">
          <span>&copy;2022</span>
        </footer>
      </div>
    </>
  )
}

export default Overview
