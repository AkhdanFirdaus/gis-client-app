import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const laporanApi = createApi({
  reducerPath: 'laporanApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://127.0.0.1:8888/'}),
  endpoints: (builder) => ({
    getLaporanGeoJSON: builder.query({
      query: (_) => 'laporan?type=geojson',
    }),
    getLaporan: builder.query({
      query: (_) => 'laporan',
    }),
    getLaporanDetail: builder.mutation({
      query: ({uid}) => ({
        url: `laporan/${uid}`
      })
    }),
    getCountLaporan: builder.query({
      query: (_) => 'laporan/count'
    }),
    postLaporan: builder.mutation({
      query: (body) => ({
        url: 'laporan',
        method: 'POST',
        body
      }),
      transformResponse: (response) => response.data
    })
  })
})

export const { 
  useGetLaporanGeoJSONQuery,
  useGetLaporanQuery,
  useGetLaporanDetailMutation,
  useGetCountLaporanQuery,
  usePostLaporanMutation
} = laporanApi
