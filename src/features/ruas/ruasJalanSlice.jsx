import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null
}

export const ruasJalanSlice = createSlice({
  name: 'ruasJalan',
  initialState,
  reducers: {
    changeRuasJalan: (state, action) => {
      state.value = state.value === action.payload ? null : action.payload
    },
    clearRuasJalan: (state) => {
      state.value = null
    }
  }
})

export const { changeRuasJalan, clearRuasJalan } = ruasJalanSlice.actions

export default ruasJalanSlice.reducer
