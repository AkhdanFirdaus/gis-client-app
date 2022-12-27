import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import basemapReducer from "../features/basemap/basemapSlice"
import menuReducer from "../features/menu/menuSlice"
import wilayahReducer from "../features/wilayah/wilayahSlice"
import ruasJalanReducer from "../features/ruas/ruasJalanSlice"
import controlsReducer from "../features/controls/controlSlice"
import coordinateReducer from "../features/controls/coordinateSlice"
import { ruasJalanApi } from "../services/ruasJalan"
import { wilayahApi } from "../services/wilayah"
import { laporanApi } from "../services/laporan"

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    wilayah: wilayahReducer,
    ruasJalan: ruasJalanReducer,
    basemap: basemapReducer,
    controls: controlsReducer,
    coordinate: coordinateReducer,
    [wilayahApi.reducerPath]: wilayahApi.reducer,
    [ruasJalanApi.reducerPath]: ruasJalanApi.reducer,
    [laporanApi.reducerPath]: laporanApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
    .concat(wilayahApi.middleware)
    .concat(ruasJalanApi.middleware)
    .concat(laporanApi.middleware)
})

// setupListeners(store.dispatch)
