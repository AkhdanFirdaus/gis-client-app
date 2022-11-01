import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const wilayahApi = createApi({
  reducerPath: 'wilayahApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://127.0.0.1:5173/'}),
  endpoints: (builder) => ({
    getWilayahJabar: builder.query({
      query: (_) => 'bataskecjabar.geojson',
    })
  })
})

export const { useGetWilayahJabarQuery } = wilayahApi
