import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Wilayah() {
  return (
    <>
        <div className="h-full flex flex-col justify-between">
            <Navbar hasBack={true} title='Wilayah' />
            Halaman 
            <Footer />
        </div>
    </>
  )
}

export default Wilayah

