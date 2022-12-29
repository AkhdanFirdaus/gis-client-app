import { useSelector } from "react-redux"

export default function RuasJalanItem({item, handleClick}) {
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
