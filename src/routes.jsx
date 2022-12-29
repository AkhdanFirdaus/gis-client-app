import { createBrowserRouter } from 'react-router-dom'
import Overview from './views/pages/Overview'
import Wilayah from './views/pages/Wilayah'
import RuasJalan from './views/pages/RuasJalan'
import Laporan from './views/pages/Laporan'
import TambahLaporan from './views/pages/TambahLaporan'
import WilayahRuas from './views/pages/WilayahRuas'

export default createBrowserRouter([
  {
    path: '/',
    element: <Overview />
  },
  {
    path: '/wilayah',
    element: <Wilayah />
  },
  {
    path: '/wilayah/:id/ruas-jalan',
    element: <WilayahRuas />
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
