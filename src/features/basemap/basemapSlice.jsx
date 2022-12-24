import { createSlice } from '@reduxjs/toolkit'
import { View, Map, Feature, Overlay } from 'ol'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import TileLayer from "ol/layer/Tile"
import {Style, Fill, Stroke, Icon} from 'ol/style'
import Select from "ol/interaction/Select"
import GeoJSON from "ol/format/GeoJSON"
import { Point } from 'ol/geom'
import { fromLonLat } from 'ol/proj'

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
      const { name, color, featureType, strokeColor = null } = action.payload

      let mapIsAvailable = false 
      map.getAllLayers().forEach(item => {
        if (item.get('name') === name) {
          mapIsAvailable = true
        } else {
          mapIsAvailable = false
        }
      })

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

          // if (name === 'ruas_jalan_all') {
          //   const getColor = (val) => {
          //     if (String(val).includes('TOL')) return 'yellow'
          //     if (String(val).includes('Nasional')) return 'red'
          //     return 'blue'
          //   }
            
          //   newlayer.getSource().getFeatures().forEach(item => {
          //     item.getStyle().setStroke(new Stroke({
          //       width: 2,
          //       color: getColor(item.get('Name'))
          //     }))
          //   })
          // }
        }

        if (featureType === 'marker') {
          newlayer.getStyle().setImage(new Icon({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: 'https://openlayers.org/en/latest/examples/data/icon.png'
          }))
        }
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
      const { map } = state.value
      state.value.selectedCoordinate = action.payload

      const marker = map.getAllLayers().find(layer => layer.get('name') == 'marker')
      
      marker.getSource().addFeature(
        new Feature({geometry: new Point(fromLonLat(action.payload))})
      )
    },
    clearCoordinate: (state) => {
      state.value.selectedCoordinate = []
    },
    addOverlay: (state, action) => {
      const { map } = state.value
      const overlay = new Overlay({
        element: document.querySelector('#popup-overlay'),
        autoPan: {
          animation: {
            duration: 250
          }
        }
      })
      overlay.setPosition(action.payload)
      map.addOverlay(overlay)
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
  clearCoordinate,
  addOverlay
} = basemapSlice.actions

export default basemapSlice.reducer
