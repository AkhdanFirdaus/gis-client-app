import React from "react"
import { useGetRuasJalanQuery } from "../../services/ruasJalan"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

function RuasJalan() {
  const { isLoading, error, data } = useGetRuasJalanQuery()

  return (
    <>
      <Navbar hasBack={true} title='Ruas Jalan' />
      <div>
        <input type="text" placeholder="Type here" className="input w-full input-bordered"/>
      </div>
      <div>
        {error ? (
          <>Error happened</>
        ) : isLoading ? (
          <>...Loading</>
        ) : data ? (
          <>
            <ul className="space-y-2 h-max overflow-y-auto">
            {Array.from(data.results).map(val => {
              return (
                <li key={val.id}>
                  <div className="card shadow card-compact">
                    <div className="card-body">
                      <div className="card-title">{val.nama}</div>
                      {/* <p className="card-text" dangerouslySetInnerHTML={{ __html: val.deskripsi }} /> */}
                    </div>
                  </div>
                </li>
              )
            })}
            </ul>
          </>
        ) : (
          <>
            <p>Data is Empty</p>
          </>
        )}
      </div>
      <Footer />
    </>
  )
}

export default RuasJalan
