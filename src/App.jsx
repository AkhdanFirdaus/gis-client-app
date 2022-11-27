import './App.css'

import {useState} from 'react'

import { RouterProvider } from 'react-router-dom'
import routes from './routes'

import MapWrapper from './views/pages/MapWrapper'
import WilayahDetail from "./views/pages/WilayahDetail"
import SelectedCoordinate from "./views/components/SelectedCoordinate"
import ToggleMap from "./views/map/controls/ToggleMap"
import { useSelector } from 'react-redux'

function LeftComponent() {
  return (
    <div className='absolute left-0 bottom-0 w-full space-y-3 p-5'>
      <WilayahDetail />
      <SelectedCoordinate />
      <ToggleMap />
    </div>
  )
}

function RightComponent() {
  const visible = useSelector((state) => state.menu.isVisible)
  if (!visible) return <></>
  return (
    <div className='sm:w-full md:w-1/3 h-full absolute top-0 right-0 p-4'>
      <div className='card bg-white h-full'>
        <div className='card-body scroll-auto overflow-y-auto'>
          <RouterProvider router={routes} />
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className='w-full h-full overflow-hidden'>
      <div className='relative'>
        <MapWrapper />
        <LeftComponent />
        <RightComponent />
      </div>
    </div>
  )
}

export default App
