import './App.css'

import React from 'react'
import MapWrapper from './MapWrapper'
import axios from 'axios'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Overview from './pages/Overview'
import Wilayah from './pages/Wilayah'
import RuasJalan from './pages/RuasJalan'
import Laporan from './pages/Laporan'
import TambahLaporan from './pages/TambahLaporan'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Overview />
  },
  {
    path: '/wilayah',
    element: <Wilayah />
  },
  {
    path: '/ruas-jalan',
    element: <RuasJalan />
  },
  {
    path: '/laporan',
    element: <Laporan />
  },
  {
    path: '/buat-laporan',
    element: <TambahLaporan />
  },
])

function App() {
  const [features, setFeatures] = React.useState()

  React.useEffect(() => {
    axios.get('http://127.0.0.1:5173/bataskecjabar.geojson').then(res => {
      setFeatures(res.data)
    })
  }, [])

  return (
    <div className='w-full h-full absolute left-0 overflow-hidden'>
      <div className='relative'>
        <MapWrapper features={features} />
        <div className='absolute bg-white left-0 bottom-0 px-5 py-2 m-10'>Selected Coord: </div>
        <div className='sm:w-full md:w-1/3 h-full absolute top-0 right-0 p-4'>
          <div className='card bg-white h-full'>
            <div className='card-body'>
              <RouterProvider router={routes} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
