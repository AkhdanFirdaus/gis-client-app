import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useGetCountRuasJalanQuery } from "../../services/ruasJalan"
import { useGetCountWilayahQuery } from "../../services/wilayah"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Navbar from "../components/Navbar"

function Card({link, leading, title}) {
  return (
    <>
      <Link to={link}>
        <div className='card shadow'>
          <div className='card-body items-center text-center'>
            <h2 className="card-title">{leading}</h2>
            <p>{title}</p>
          </div>
        </div>
      </Link>
    </>
  )
}

function Overview() {
  const { data: dataWilayah } = useGetCountWilayahQuery()
  const { data: dataRuasJalan } = useGetCountRuasJalanQuery()
  const datalist = [
    {
      leading: 0,
      title: "Wilayah",
      link: "/wilayah"
    },
    {
      leading: 0,
      title: "Ruas Jalan",
      link: "/ruas-jalan"
    },
    {
      leading: 0,
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
              <Card link={datalist[0].link} title={datalist[0].title} leading={dataWilayah && dataWilayah.result} />
              <Card link={datalist[1].link} title={datalist[1].title} leading={dataRuasJalan && dataRuasJalan.result} />
              <Card link={datalist[2].link} title={datalist[2].title} leading={datalist[2].leading} />
              <Card link={datalist[3].link} title={datalist[3].title} leading={datalist[3].leading} />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Overview
