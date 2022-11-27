import { createSlice } from '@reduxjs/toolkit'
import { View, Map } from 'ol'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import TileLayer from "ol/layer/Tile"
import {Style, Fill, Stroke} from 'ol/style'
import Select from "ol/interaction/Select"
import GeoJSON from "ol/format/GeoJSON"

const initialState = {
  value: {
    visible: true,
    selectedCoordinate: [],
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

const selected = new Style({
  fill: new Fill({
    color: '#ffeeee'
  }),
  stroke: new Stroke({
    color: 'rgba(255, 255, 255, 0.7)',
    width: 2
  })
})

const selectStyle = (feature) => {
  const color = '#eeeeee'
  selected.getFill().setColor(color)
  return selected
}

const selectSingleClick = new Select({style: selectStyle})

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
      const { tile, name } = action.payload
      const newlayer = new TileLayer({
        source: tile
      })
      newlayer.set('name', name)
      map.addLayer(newlayer)
    },
    addFeatureLayer: (state, action) => {
      const { map } = state.value
      const name = action.payload.name

      let mapIsAvailable = false
      map.getLayers().forEach(item => {
        mapIsAvailable = item.get('name') === name
      })

      if (!mapIsAvailable) {
        const newlayer = new VectorLayer({
          zIndex: 3,
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
        newlayer.set('name', name)
        map.addLayer(newlayer)
      }
    },
    toggleMap: (state) => {
      state.value.visible = !state.value.visible
    },
    toggleLayer: (state, action) => {
      const { map } = state.value
      const name = action.payload
      
      map.getLayers().forEach(layer => {
        layer.setVisible(layer.get('name') == name ? !layer.getVisible() : layer.getVisible())
      })
    },
    selectFeature: (state) => {
      const { map } = state.value
      map.addInteraction(selectSingleClick)
    },
    removeInteraction: (state) => {
      const { map } = state.value
      map.removeInteraction(selectSingleClick)
    },
    changeCoordinate: (state, action) => {
      state.value.selectedCoordinate = action.payload
    },
    clearCoordinate: (state) => {
      state.value.selectedCoordinate = []
    }
  }
})

export const { 
  initMapRef, 
  removeMapRef,
  toggleMap, 
  addTileLayer, 
  addFeatureLayer,
  toggleLayer,
  selectFeature,
  removeInteraction,
  changeCoordinate,
  clearCoordinate
} = basemapSlice.actions

export default basemapSlice.reducer
