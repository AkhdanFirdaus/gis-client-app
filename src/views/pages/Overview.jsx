import React from "react"
import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Navbar from "../components/Navbar"

function Card({props}) {
  return (
    <>
      <Link to={props.link}>
        <div className='card bg-white shadow'>
          <div className='card-body items-center text-center'>
            <h2 className="card-title">{props.leading}</h2>
            <p>{props.title}</p>
          </div>
        </div>
      </Link>
    </>
  )
}

function Overview() {
  const datalist = [
    {
      leading: 24,
      title: "Wilayah",
      link: "/wilayah"
    },
    {
      leading: 123,
      title: "Ruas Jalan",
      link: "/ruas-jalan"
    },
    {
      leading: 4,
      title: "Laporan",
      link: "/laporan"
    },
    {
      leading: "+",
      title: "Buat Laporan",
      link: "/buat-laporan"
    }
  ]
  return (
    <>
      <div className="h-full flex flex-col justify-between">
        <Navbar title='Overview' />
        <main>
          <Header title='Rata-Rata' subtitle='Indeks Kondisi Perkerasan' />
          <div className='mt-4'>
            <div className="grid grid-cols-2 gap-4">
              {datalist.map(item => {
                return <Card key={item.link} props={item} />
              })}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Overview
