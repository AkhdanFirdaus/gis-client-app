import { useEffect, useState } from "react"
import { useGetLaporanQuery } from "../../services/laporan"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

function LaporanCard({data}) {
  return (
    <li key={data.uid}>
      <div className="card shadow card-compact">
        <div className="card-body">
          <div className="card-title">{data.deskripsi}</div>
          <div className="card-text">{String(JSON.parse(data.koordinat).coordinates)}</div>
        </div>
      </div>
    </li>
  )
}

function Laporan() {
  const {isLoading, error, data} = useGetLaporanQuery()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (data) {
      setCount(data.results.length)
    }
  }, [data])
  return (
    <>
      <Navbar hasBack={true} title={`${count} Laporan`} />
      <div>
      <input type="text" placeholder="Type here" className="input w-full input-bordered bg-white"/>
      </div>
      {error ? (
        <>Error Happened</>
      ) : isLoading ? (
        <>...Loading</>
      ) : data ? (
        <ul className="space-y-2 h-max overflow-y-auto">
          {data.results.map(val => {
            return <LaporanCard data={val} />
          })}
        </ul>
      ) : (
        <>Data is Empty</>
      )}
      <Footer />
    </>
  )
}

export default Laporan
