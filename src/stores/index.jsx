import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import basemapReducer from "../features/basemap/basemapSlice"
import coordinateReducer from "../features/coordinate/coordinateSlice"
import wilayahReducer from "../features/wilayah/wilayahSlice"
import { wilayahApi } from "../services/wilayah"

export const store = configureStore({
  reducer: {
    coordinate: coordinateReducer,
    wilayah: wilayahReducer,
    basemap: basemapReducer,
    [wilayahApi.reducerPath]: wilayahApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(wilayahApi.middleware)
})

// setupListeners(store.dispatch)
