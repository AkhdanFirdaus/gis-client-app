import { configureStore } from "@reduxjs/toolkit";
import coordinateReducer from "../features/coordinate/coordinateSlice";

export const store = configureStore({
  reducer: {
    coordinate: coordinateReducer
  }
})
