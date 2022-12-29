import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetRuasByWilayahQuery } from "../../services/ruasJalan";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RuasJalanItem from "../components/RuasJalanItem";
import { useDispatch } from "react-redux";
import { changeRuasJalan } from "../../features/ruas/ruasJalanSlice";

export default function WilayahRuas() {
  const { id } = useParams()
  const { isLoading, error, data } = useGetRuasByWilayahQuery({wilayah_id: id})
  const [count, setCount] = useState(0)
  const [wilayahNama, setWilayahNama] = useState('')
  const dispatch = useDispatch()

  const handleClick = (id) => {
    dispatch(changeRuasJalan(id))
  }

  useEffect(() => {
    if (data) {
      setCount(data.results.length)
      setWilayahNama(data.results[0].wilayah_nama)
    }
  }, [data])

  return (
    <>
      <Navbar hasBack={true} title={`${count} Ruas Jalan di ${wilayahNama}`} />
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
                  <RuasJalanItem item={val} handleClick={handleClick} />
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
      <Footer />
    </>
  )
}
