import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: []
}

export const coordinateSlice = createSlice({
  name: 'coordinate',
  initialState,
  reducers: {
    changeCoordinate: (state, action) => {
      const { coordinate } = action.payload
      state.value = coordinate
      // const { map } = state.value
      // const markerlayer = map.getLayers().getArray().find(layer => layer.get('name') === 'marker')
      // if (markerlayer) {
      //   markerlayer.setSource(new VectorSource({
      //     features: [
      //       new Feature({
      //         geometry: new Point(fromLonLat(state.value.selectedCoordinate))
      //       })
      //     ]
      //   }))
      // }
    },
    clearCoordinate: (state) => {
      state.value = []
    },
  }
})

export const { changeCoordinate, clearCoordinate } = coordinateSlice.actions

export default coordinateSlice.reducer
