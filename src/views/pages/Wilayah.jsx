import { useDispatch } from "react-redux"
import { changeWilayah } from "../../features/wilayah/wilayahSlice"
import { useGetWilayahQuery } from "../../services/wilayah";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WilayahItem from "../components/WilayahItem"

function Wilayah() {
  const [count, setCount] = useState(0)
  const { isLoading, error, data } = useGetWilayahQuery()

  const dispatch = useDispatch()
  const handleClick = (id) => {
    dispatch(changeWilayah(id))
  }

  useEffect(() => {
    if (data) {
      setCount(Array.from(data.results).length)
    }
  }, [data])

  return (
    <>
      <div className="space-y-4">
        <Navbar hasBack={true} title={`${count} Wilayah`} />
        <input type="text" placeholder="Type here" className="input w-full input-bordered bg-white"/>
        <div className="">
          {error ? (
            <>Error happened</>
          ) : isLoading ? (
            <>...Loading</>
          ) : data ? (
            <>
              <ul className="space-y-2 p-2 h-max overflow-y-auto">
                {Array.from(data.results).map(val => {
                  return (
                    <li key={val.id}>
                      <WilayahItem handleClick={handleClick} place={val.nama} id={val.id} />
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
      </div>
    </>
  )
}

export default Wilayah

