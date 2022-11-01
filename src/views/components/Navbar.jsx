import React from "react";
import { useNavigate } from "react-router-dom";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar({ hasBack = false, title }) {
  const navigate = useNavigate()

  return (
    <div className='navbar'>
      <div className='flex-none'>
        {hasBack ? (
          <button className="btn btn-ghost" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        ) : (
          <label className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://placeimg.com/80/80/people" />
            </div>
          </label>
        )}
        
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">{title}</a>
      </div>
    </div>
  )
}

export default Navbar
