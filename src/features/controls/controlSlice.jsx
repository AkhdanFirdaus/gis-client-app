import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    mapLayersVisible: [],
    clickFeatureOrLine: true,
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
    toggleClickFeatureOrLine: (state) => {
      state.value.clickFeatureOrLine = !state.value.clickFeatureOrLine
    },
    togglePointClick: (state) => {
      state.value.clickablePoint = !state.value.clickablePoint
    },
    disableAllClick: (state) => {
      state.value = {
        ...state.value,
        clickFeatureOrLine: false,
        clickableLine: false,
        clickablePoint: false,
      }
    },
    resetVisiblity: (state, action) => {
      state.value = {
        mapLayersVisible: [],
        clickFeatureOrLine: true,
        clickablePoint: true,
      }
    }
  }
})

export const {
  disableAllClick,
  resetVisiblity,
  toggleClickFeatureOrLine,
  toggleMapLayersVisible,
  togglePointClick
} = controlsSlice.actions

export default controlsSlice.reducer
