import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const wilayahApi = createApi({
  reducerPath: 'wilayahApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://127.0.0.1:8888/'}),
  endpoints: (builder) => ({
    getBatasKecWilayahJabar: builder.query({
      query: (_) => 'bataskecjabar.geojson'
    }),
    getWilayahUPTD3Jabar: builder.query({
      query: (_) => 'wilayah?type=geojson',
    }),
    getWilayah: builder.query({
      query: (_) => 'wilayah',
    }),
    getWilayahDetail: builder.query({
      query: ({id}) => `wilayah/${id}`
    }),
    getCountWilayah: builder.query({
      query: (_) => 'wilayah/count'
    })
  })
})

export const { 
  useGetBatasKecWilayahJabarQuery, 
  useGetWilayahUPTD3JabarQuery, 
  useGetWilayahQuery,
  useGetWilayahDetailQuery,
  useGetCountWilayahQuery
} = wilayahApi
