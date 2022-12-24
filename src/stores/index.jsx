import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import basemapReducer from "../features/basemap/basemapSlice"
import menuReducer from "../features/menu/menuSlice"
import wilayahReducer from "../features/wilayah/wilayahSlice"
import ruasJalanReducer from "../features/ruas/ruasJalanSlice"
import { ruasJalanApi } from "../services/ruasJalan"
import { wilayahApi } from "../services/wilayah"

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    wilayah: wilayahReducer,
    ruasJalan: ruasJalanReducer,
    basemap: basemapReducer,
    [wilayahApi.reducerPath]: wilayahApi.reducer,
    [ruasJalanApi.reducerPath]: ruasJalanApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
    .concat(wilayahApi.middleware)
    .concat(ruasJalanApi.middleware)
})

// setupListeners(store.dispatch)
