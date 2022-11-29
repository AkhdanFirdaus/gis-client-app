export default function Popup({name="Name", description="Desc"}) {
  return (
    <div className="card bg-white">
      <div className="body">
        <h4 className="card-title">{name}</h4>
        <p>{description}</p>
      </div>
    </div>
  )
}
