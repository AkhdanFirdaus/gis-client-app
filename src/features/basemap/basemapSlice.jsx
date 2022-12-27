import { createSlice } from '@reduxjs/toolkit'
import { View, Map, Overlay } from 'ol'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import TileLayer from "ol/layer/Tile"
import {Style, Fill, Stroke, Icon} from 'ol/style'
import Select from "ol/interaction/Select"
import GeoJSON from "ol/format/GeoJSON"

const selected = new Style({
  fill: new Fill({
    color: '#ffeeee'
  }),
  stroke: new Stroke({
    color: 'rgba(255, 255, 255, 0.7)',
    width: 2
  })
})

const selectFeatureClick = new Select({style: (feature) => {
  const color = '#eeeeee'
  selected.getFill().setColor(color)
  return selected
}})

const selectLineClick = new Select({style: (feature) => {
  const color = 'green'
  selected.getStroke().setColor(color)
  return selected
}})

const initialState = {
  value: new Map({
    layers: [],
    view: new View({
      projection: 'EPSG:4326',
      center: [107.7177, -6.9254],
      zoom: 9
    }),
    controls: []
  })
}

export const basemapSlice = createSlice({
  name: 'basemap',
  initialState,
  reducers: {
    initMapRef: (state, action) => {
      const map = state.value
      map.setTarget(action.payload)
    },
    removeMapRef: (state) => {
      const map = state.value
      map.setTarget(undefined)
    },
    addTileLayer: (state, action) => {
      const map = state.value
      const { tile, name } = action.payload
      const mapIsAvailable = map.getAllLayers().find(item => item.get('name') === name)
      if (!mapIsAvailable) {
        const newlayer = new TileLayer({
          source: tile
        })
        newlayer.set('name', name)
        map.addLayer(newlayer)
      }
    },
    addFeatureLayer: (state, action) => {
      const map = state.value
      const { name, color, featureType, strokeColor = null } = action.payload

      const mapIsAvailable = map.getAllLayers().find(item => item.get('name') === name)

      if (!mapIsAvailable) {
        const newlayer = new VectorLayer({
          zIndex: map.getAllLayers().length + 1,
          source: new VectorSource(),
          style: new Style({
            fill: new Fill({
              color: color
            }),
            stroke: new Stroke({
              width: 1,
              color: strokeColor ?? 'white'
            })
          })
        })

        if (featureType === 'geojson') {
          newlayer.getSource().addFeatures(
            new GeoJSON().readFeatures(action.payload)
          )
        }

        if (featureType === 'marker') {
          newlayer.setZIndex(999)
          newlayer.getStyle().setImage(new Icon({
            src: 'https://openlayers.org/en/latest/examples/data/icon.png'
          }))
        }

        newlayer.set('name', name)
        map.addLayer(newlayer)
      }
    },
    toggleLayer: (state, action) => {
      const map = state.value
      const { name } = action.payload
      
      map.getLayers().forEach(layer => {
        layer.setVisible(layer.get('name') == name ? !layer.getVisible() : layer.getVisible())
      })
    },
    selectFeature: (state) => {
      const map = state.value
      map.addInteraction(selectFeatureClick)
    },
    removeFeatureInteraction: (state) => {
      const map = state.value
      map.removeInteraction(selectFeatureClick)
    },
    selectLine: (state) => {
      const map = state.value
      map.addInteraction(selectLineClick)
    },
    removeLineInteraction: (state) => {
      const map = state.value
      map.removeInteraction(selectLineClick)
    },
    addOverlay: (state, action) => {
      const map = state.value
      const { popupId, coordinate } = action.payload
      
      const popupOverlay = new Overlay({
        id: popupId,
        element: document.querySelector('#popup-overlay'),
        autoPan: {
          animation: {
            duration: 250
          }
        },
      })
      
      popupOverlay.setPosition(coordinate)
      map.addOverlay(popupOverlay)
    },
    removeOverlay: (state, action) => {
      const map = state.value
      const { popupId } = action.payload
      const popup = map.getOverlayById(popupId)
      popup.setPosition(undefined)
    }
  }
})

export const { 
  initMapRef, 
  removeMapRef,
  addTileLayer, 
  addFeatureLayer,
  toggleLayer,
  selectFeature,
  removeFeatureInteraction,
  selectLine,
  removeLineInteraction,
  addOverlay,
  removeOverlay
} = basemapSlice.actions

export default basemapSlice.reducer
