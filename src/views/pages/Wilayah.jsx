import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux"
import { changeWilayah } from "../../features/wilayah/wilayahSlice"
import { useGetWilayahQuery } from "../../services/wilayah";
import { useState, useEffect } from "react";

function Card({place, id, handleClick}) {
  const style = {
    card: 'card shadow hover:bg-slate-200 hover:transition-opacity hover:cursor-pointer'
  }
  const selected = useSelector((state) => state.wilayah.value)

  return (
    <div className={`${style.card} ${selected == id ? 'bg-slate-200' : ''}`} onClick={() => handleClick(id)}>
      <div className="card-body">
        <div className="card-title">{place}</div>
      </div>
    </div>
  )
}

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
                      <Card handleClick={handleClick} place={val.nama} id={val.id} />
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

