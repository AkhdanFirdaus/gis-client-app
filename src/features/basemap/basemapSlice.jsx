import { createSlice } from '@reduxjs/toolkit'
import { View, Map, Overlay } from 'ol'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import TileLayer from "ol/layer/Tile"
import {Style, Fill, Stroke, Icon} from 'ol/style'
import GeoJSON from "ol/format/GeoJSON"
import { selectFeatureClick, selectLineClick } from '../../views/map/controls/interactions'

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
    addPointLayer: (state, action) => {
      const map = state.value
      const { name, color, data } = action.payload

      const mapIsAvailable = map.getAllLayers().find(item => item.get('name') === name)

      if (!mapIsAvailable) {
        // 'https://openlayers.org/en/latest/examples/data/icon.png',
        const newlayer = new VectorLayer({
          zIndex: map.getAllLayers().length * 4,
          source: new VectorSource(),
          style: new Style({
            image: new Icon({
              src: '/marker.png',
              scale: .04,
            })
          })
        })

        if (data) {
          newlayer.getSource().addFeatures(
            new GeoJSON().readFeatures(data)
          )

        }

        newlayer.set('name', name)
        map.addLayer(newlayer)
      }
    },
    addFeatureLayer: (state, action) => {
      const map = state.value
      const { name, color, featureType, strokeColor = null, width = 1 } = action.payload

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
              width,
              color: strokeColor ?? 'white'
            })
          })
        })

        if (featureType === 'geojson') {
          newlayer.getSource().addFeatures(
            new GeoJSON().readFeatures(action.payload)
          )
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
    toggleFeatureOrLayerInteraction: (state, action) => {
      const map = state.value
      if (action.payload.feature) {
        map.removeInteraction(selectFeatureClick)
        map.addInteraction(selectLineClick)
      } else {
        map.removeInteraction(selectLineClick)
        map.addInteraction(selectFeatureClick)
      }
    },
    addInteraction: (state) => {
      const map = state.value
      map.addInteraction(selectFeatureClick)
      map.addInteraction(selectLineClick)
    },
    removeInteraction: (state) => {
      const map = state.value
      map.removeInteraction(selectFeatureClick)
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
  addPointLayer,
  addFeatureLayer,
  toggleLayer,
  toggleFeatureOrLayerInteraction,
  addInteraction,
  removeInteraction,
  addOverlay,
  removeOverlay
} = basemapSlice.actions

export default basemapSlice.reducer
