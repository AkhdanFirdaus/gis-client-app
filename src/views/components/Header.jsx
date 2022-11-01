import React from "react";

function Header({title, subtitle}) {
  return (
    <div className="card lg:card-side bg-white shadow">
      <figure><img src="https://placeimg.com/140/140/arch" alt="Album"/></figure>
      <div className="card-body justify-center items-end">
        <p>{subtitle}</p>
        <h2 className="card-title">{title}</h2>
      </div>
    </div>
  )
}

export default Header

