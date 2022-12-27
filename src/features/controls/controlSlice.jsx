import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    mapLayersVisible: [],
    pointVisible: true,
    clickableFeature: true,
    clickableLine: true,
    clickablePoint: true,
  }
}

export const controlsSlice = createSlice({
  name: 'controls',
  initialState,
  reducers: {
    toggleMapLayersVisible: (state, action) => {
      const { layerName } = action.payload
      const available = state.value.mapLayersVisible.find(name => name === layerName)
      if (available) {
        state.value.mapLayersVisible = state.value.mapLayersVisible.filter(name => name !== layerName)
      } else {
        state.value.mapLayersVisible = [
          ...state.value.mapLayersVisible,
          layerName
        ]
      }
    },
    toggleFeatureClick: (state) => {
      state.value.clickableFeature = !state.value.clickableFeature
    },
    toggleLineClick: (state) => {
      state.value.clickableLine = !state.value.clickableLine
    },
    togglePointClick: (state) => {
      state.value.clickablePoint = !state.value.clickablePoint
    },
    disableAllClick: (state) => {
      state.value = {
        ...state.value,
        clickableFeature: false,
        clickableLine: false,
        clickablePoint: false,
      }
    },
    resetVisiblity: (state, action) => {
      state.value = {
        basemapVisible: true,
        featureVisible: true,
        lineVisible: true,
        pointVisible: true,
        clickableFeature: true,
        clickableLine: true,
        clickablePoint: true,
      }
    }
  }
})

export const {
  disableAllClick,
  resetVisiblity,
  toggleFeatureClick,
  toggleLineClick,
  toggleMapLayersVisible,
  togglePointClick
} = controlsSlice.actions

export default controlsSlice.reducer
