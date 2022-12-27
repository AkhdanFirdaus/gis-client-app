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
    }),
    getDirection: builder.query({
      query: (_) => 'https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62482e90325d33734b4193345a80836635aa&start=107.6187558,-6.9021856&end=107.579225,-6.446432'
    })
  })
})

export const {
  useGetRuasJalanGeoJSONQuery,
  useGetRuasJalanQuery,
  useGetRuasJalanDetailQuery,
  useGetCountRuasJalanQuery,
  useGetDirectionQuery
} = ruasJalanApi
