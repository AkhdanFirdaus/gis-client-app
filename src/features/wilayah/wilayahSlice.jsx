import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null
}

export const wilayahSlice = createSlice({
  name: 'wilayah',
  initialState,
  reducers: {
    changeWilayah: (state, action) => {
      state.value = state.value === action.payload ? null : action.payload
    },
    clearWilayah: (state) => {
      state.value = null
    }
  }
})

export const { changeWilayah, clearWilayah } = wilayahSlice.actions

export default wilayahSlice.reducer
