import { createBrowserRouter } from 'react-router-dom'
import Overview from './views/pages/Overview'
import Wilayah from './views/pages/Wilayah'
import RuasJalan from './views/pages/RuasJalan'
import Laporan from './views/pages/Laporan'
import TambahLaporan from './views/pages/TambahLaporan'

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
