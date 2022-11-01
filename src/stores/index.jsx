import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import coordinateReducer from "../features/coordinate/coordinateSlice";
import { wilayahApi } from "../services/wilayah";

export const store = configureStore({
  reducer: {
    coordinate: coordinateReducer,
    [wilayahApi.reducerPath]: wilayahApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(wilayahApi.middleware)
})

// setupListeners(store.dispatch)
