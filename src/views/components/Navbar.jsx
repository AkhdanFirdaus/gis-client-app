import React from "react";
import { useNavigate } from "react-router-dom";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar({ hasBack = false, title }) {
  const navigate = useNavigate()

  return (
    <div className='navbar'>
      <div className='flex-none'>
        {hasBack && (
          <button className="btn btn-ghost" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        )}
        
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">{title}</a>
      </div>
    </div>
  )
}

export default Navbar
