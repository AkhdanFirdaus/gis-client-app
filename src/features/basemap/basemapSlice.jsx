import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    visible: true,
    map: null
  }
}

export const basemapSlice = createSlice({
  name: 'basemap',
  initialState,
  reducers: {
    toggleMap: (state) => {
      state.value.visible = !state.value.visible
    },
    changeMap: (state, action) => {
      state.value.map = action.payload
    }
  }
})

export const { toggleMap, changeMap } = basemapSlice.actions

export default basemapSlice.reducer
