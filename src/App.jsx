import './App.css'

import React from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MapWrapper from './views/components/MapWrapper'
import Overview from './views/pages/Overview'
import Wilayah from './views/pages/Wilayah'
import RuasJalan from './views/pages/RuasJalan'
import Laporan from './views/pages/Laporan'
import TambahLaporan from './views/pages/TambahLaporan'
import SelectedCoordinate from './views/components/SelectedCoordinate'

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
  return (
    <div className='w-full h-full absolute left-0 overflow-hidden'>
      <div className='relative'>
        <MapWrapper />
        <SelectedCoordinate />
        <div className='sm:w-full md:w-1/3 h-full absolute top-0 right-0 p-4'>
          <div className='card bg-white h-full'>
            <div className='card-body scroll-auto overflow-y-auto'>
              <RouterProvider router={routes} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
