import { createSlice } from '@reduxjs/toolkit'
import { View, Map } from 'ol'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import TileLayer from "ol/layer/Tile"
import {Style, Fill, Stroke} from 'ol/style'
import GeoJSON from "ol/format/GeoJSON"

const initialState = {
  value: {
    visible: true,
    activeLayer: 0,
    savedLayers: ['wilayah_uptd3'],
    map: new Map({
      layers: [],
      view: new View({
        projection: 'EPSG:4326',
        center: [107.7177, -6.9254],
        zoom: 9
      }),
      controls: []
    })
  }
}

export const basemapSlice = createSlice({
  name: 'basemap',
  initialState,
  reducers: {
    initMapRef: (state, action) => {
      const { map } = state.value
      map.setTarget(action.payload)
    },
    removeMapRef: (state) => {
      const { map } = state.value
      map.setTarget(undefined)
    },
    addTileLayer: (state, action) => {
      const { map } = state.value
      const newlayer = new TileLayer({
        source: action.payload
      })
      map.addLayer(newlayer)
    },
    addFeatureLayer: (state, action) => {
      const { map } = state.value
      
      map.getLayers().forEach(item => {
        console.log(item)
      })

      const newlayer = new VectorLayer({
        source: new VectorSource({
          features: new GeoJSON().readFeatures(action.payload)
        }),
        style: new Style({
          fill: new Fill({
            color: 'magenta'
          }),
          stroke: new Stroke({
            width: 1,
            color: 'white'
          })
        })
      })
      map.addLayer(newlayer)
    },
    toggleMap: (state) => {
      state.value.visible = !state.value.visible
    },
    setActiveLayer: (state, action) => {
      state.value.activeLayer = action.payload
    }
  }
})

export const { 
  initMapRef, 
  removeMapRef,
  toggleMap, 
  addTileLayer, 
  addFeatureLayer,
  setActiveLayer
} = basemapSlice.actions

export default basemapSlice.reducer
