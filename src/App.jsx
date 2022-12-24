import './App.css'

import { RouterProvider } from 'react-router-dom'
import routes from './routes'

import MapWrapper from './views/pages/MapWrapper'
import WilayahDetail from "./views/pages/WilayahDetail"
import RuasJalanDetail from "./views/pages/RuasJalanDetail"
import SelectedCoordinate from "./views/components/SelectedCoordinate"
import ToggleMap from "./views/map/controls/ToggleMap"
import { useSelector } from 'react-redux'

function LeftComponent() {
  const selectedWilayah = useSelector((state) => state.wilayah.value)
  const selectedRuasJalan = useSelector((state) => state.ruasJalan.value)
  return (
    <div className='absolute left-0 bottom-0 space-y-3 p-5 md:w-1/3 lg:1/4'>
      {selectedWilayah && <WilayahDetail id={selectedWilayah} />}
      {selectedRuasJalan && <RuasJalanDetail id={selectedRuasJalan} />}
      <SelectedCoordinate />
      <ToggleMap />
    </div>
  )
}

function RightComponent() {
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
  const visible = useSelector((state) => state.menu.isVisible)
  return (
    <div className='w-full h-full overflow-hidden'>
      <div className='relative'>
        <MapWrapper />
        <LeftComponent />
        {visible && (<RightComponent />)}
      </div>
    </div>
  )
}

export default App
