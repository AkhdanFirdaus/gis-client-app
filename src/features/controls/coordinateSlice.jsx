import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    currentCoordinateHasPoint: false,
    selectedCoordinate: [],
    selectedLaporan: null
  }
}

export const coordinateSlice = createSlice({
  name: 'coordinate',
  initialState,
  reducers: {
    changeCoordinate: (state, action) => {
      const { coordinate, hasPoint = false, laporanId = null } = action.payload
      state.value = {
        currentCoordinateHasPoint: hasPoint,
        selectedCoordinate: coordinate,
        selectedLaporan: laporanId,
      }
    },
    clearCoordinate: (state) => {
      state.value = {
        currentCoordinateHasPoint: false,
        selectedCoordinate: [],
        selectedLaporan: null,
      }
    },
  }
})

export const { changeCoordinate, clearCoordinate } = coordinateSlice.actions

export default coordinateSlice.reducer
