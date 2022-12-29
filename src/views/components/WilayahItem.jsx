import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export default function WilayahItem({place, id, handleClick}) {
  const style = {
    card: 'card shadow hover:bg-slate-200 hover:transition-opacity hover:cursor-pointer'
  }
  const selected = useSelector((state) => state.wilayah.value)

  return (
    <Link to={`/wilayah/${id}/ruas-jalan`} className={`${style.card} ${selected == id ? 'bg-slate-200' : ''}`} onClick={() => handleClick(id)}>
      <div className="card-body">
        <div className="card-title">{place}</div>
      </div>
    </Link>
  )
}
