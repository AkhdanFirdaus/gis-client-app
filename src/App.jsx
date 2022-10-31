import './App.css'

import React from 'react'
import GeoJSON from 'ol/format/GeoJSON'
import MapWrapper from './MapWrapper'

function App() {
  const [features, setFeatures] = React.useState([])

  React.useEffect(() => {
    fetch('http://127.0.0.1:5173/bataskecjabar.geojson')
      .then(res => res.json())
      .then(res => {
        setFeatures(new GeoJSON(res))
      })
  }, [])

  return (
    <div style={{ height: '100%', position: 'absolute', left: '0px', width: '100%', overflow: 'hidden'}}>
      <MapWrapper features={features} />
    </div>
  )
}

export default App
