import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ruasJalanApi = createApi({
  reducerPath: 'RuasJalanApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://127.0.0.1:8888/'}),
  endpoints: (builder) => ({
    getRuasJalanGeoJSON: builder.query({
      query: (_) => 'ruas-jalan?type=geojson',
    }),
    getRuasJalan: builder.query({
      query: (_) => 'ruas-jalan',
    }),
    getRuasJalanDetail: builder.query({
      query: ({id}) => `ruas-jalan/${id}`
    }),
    getCountRuasJalan: builder.query({
      query: (_) => 'ruas-jalan/count'
    })
  })
})

export const {
  useGetRuasJalanGeoJSONQuery,
  useGetRuasJalanQuery,
  useGetRuasJalanDetailQuery,
  useGetCountRuasJalanQuery
} = ruasJalanApi
