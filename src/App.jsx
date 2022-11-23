import './App.css'

import React from 'react'

import MapWrapper from './views/components/MapWrapper'
import SelectedComponent from './views/components/SelectedComponent'
import { RouterProvider } from 'react-router-dom'
import routes from './routes'

function App() {
  return (
    <div className='w-full h-full absolute left-0 overflow-hidden'>
      <div className='relative'>
        <MapWrapper />
        <SelectedComponent />
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
