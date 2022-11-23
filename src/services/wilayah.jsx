import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const wilayahApi = createApi({
  reducerPath: 'wilayahApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://127.0.0.1:5173/'}),
  endpoints: (builder) => ({
    getBatasKecWilayahJabar: builder.query({
      query: (_) => 'bataskecjabar.geojson'
    }),
    getWilayahUPTD3Jabar: builder.query({
      query: (_) => 'wilayah_uptd3.geojson',
    })
  })
})

export const { useGetBatasKecWilayahJabarQuery, useGetWilayahUPTD3JabarQuery } = wilayahApi
