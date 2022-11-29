import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addFeatureLayer, toggleLayer } from "../../../features/basemap/basemapSlice"
import { toggleMenu as toggleMenuAction } from "../../../features/menu/menuSlice"


function ToggleComponent() {
  const dispatch = useDispatch()

  const { visible } = useSelector((state) => state.basemap.value)
  const mapVisiblity = useSelector((state) => state.menu.value)
  
  useEffect(() => {
    const requestdata = async () => {
      const getWilayahData = () => new Promise((resolve, reject) => {
        fetch('http://127.0.0.1:5173/wilayah_uptd3.geojson')
          .then(response => response.json())
          .then(result => resolve(result))
          .catch(err => reject(err))
      })
  
      const getRuasData = () => new Promise((resolve, reject) => {
        fetch('http://127.0.0.1:5173/ruas_jalan_all.geojson')
          .then(response => response.json())
          .then(result => resolve(result))
          .catch(err => reject(err))
      })
      
      await Promise.all([
        getWilayahData(),
        getRuasData()
      ]).then(result => {
        const [wilayah, ruas] = result;
        dispatch(addFeatureLayer({...wilayah, color: 'magenta', featureType: 'geojson'}))
        dispatch(addFeatureLayer({...ruas, featureType: 'geojson'}))
        dispatch(addFeatureLayer({name: 'marker', featureType: 'marker'}))
      })
    }

    requestdata().catch(err => console.log(err))
  }, [])

  const toggleMenu = () => {
    dispatch(toggleMenuAction())
  }

  const toggleUptd = () => {
    dispatch(toggleLayer('wilayah_uptd3'))
  }

  const toggleRuasJalan = () => {
    dispatch(toggleLayer('ruas_jalan_all'))
  }

  const toggleBase = () => {
    dispatch(toggleLayer('baseosm'))
  }

  return (
    <div className="w-full">
      <div className="card bg-white">
        <div className="card-body">
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text">Menu</span>
              <input 
                type="checkbox" 
                className="toggle" 
                defaultChecked={mapVisiblity} 
                value={mapVisiblity} 
                onChange={toggleMenu} 
              />
            </label>
          </div>
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text">Wilayah UPTD 3</span>
              <input 
                type="checkbox" 
                className="toggle" 
                defaultChecked={visible} 
                value={visible} 
                onChange={toggleUptd} 
              />
            </label>
          </div>
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text">Ruas Jalan</span>
              <input 
                type="checkbox" 
                className="toggle" 
                defaultChecked={visible} 
                value={visible} 
                onChange={toggleRuasJalan} 
              />
            </label>
          </div>
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text">Toggle Map</span> 
              <input 
                type="checkbox" 
                className="toggle" 
                defaultChecked={visible} 
                value={visible} 
                onChange={toggleBase} 
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToggleComponent
