import './App.css'

import React from 'react'

import MapWrapper from './views/pages/MapWrapper'
import LeftComponent from './views/components/LeftComponent'
import { RouterProvider } from 'react-router-dom'
import routes from './routes'

function App() {
  return (
    <div className='w-full h-full overflow-hidden'>
      <div className='relative'>
        <MapWrapper />
        <LeftComponent />
        {/* <div className='sm:w-full md:w-1/3 h-full absolute top-0 right-0 p-4'>
          <div className='card bg-white h-full'>
            <div className='card-body scroll-auto overflow-y-auto'>
              <RouterProvider router={routes} />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default App
