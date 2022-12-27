import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useGetRuasJalanQuery } from "../../services/ruasJalan"
import { changeRuasJalan } from "../../features/ruas/ruasJalanSlice"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

function CardRuasJalan({item, handleClick}) {
  const style = {
    card: 'card shadow hover:bg-slate-200 hover:transition-opacity hover:cursor-pointer'
  }
  const selected = useSelector((state) => state.ruasJalan.value)

  return (
    <div className={`${style.card} ${selected == item.id ? 'bg-slate-200' : ''}`} onClick={() => handleClick(item.id)}>
      <div className="card-body">
        <div className="card-title">{item.nama}</div>
      </div>
    </div>
  )
}

function RuasJalan() {
  const { isLoading, error, data } = useGetRuasJalanQuery()
  const [count, setCount] = useState(0)
  const dispatch = useDispatch()

  const handleClick = (id) => {
    dispatch(changeRuasJalan(id))
  }

  useEffect(() => {
    if (data) {
      setCount(data.results.length)
    }
  }, [data])

  return (
    <>
      <Navbar hasBack={true} title={`${count} Ruas Jalan`} />
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
                  <CardRuasJalan item={val} handleClick={handleClick} />
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
