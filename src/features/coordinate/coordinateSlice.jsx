import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: []
}

export const coordinateSlice = createSlice({
  name: 'coordinate',
  initialState,
  reducers: {
    changeCoordinate: (state, action) => {
      state.value = action.payload
    },
    clearCoordinate: (state) => {
      state.value = []
    }
  }
})

export const { changeCoordinate, clearCoordinate } = coordinateSlice.actions

export default coordinateSlice.reducer
