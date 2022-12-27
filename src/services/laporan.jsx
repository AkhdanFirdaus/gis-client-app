import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const laporanApi = createApi({
  reducerPath: 'laporanApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://127.0.0.1:8888/'}),
  endpoints: (builder) => ({
    getLaporan: builder.query({
      query: (_) => 'laporan',
    }),
    getLaporanDetail: builder.query({
      query: ({id}) => `laporan/${id}`
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
  useGetLaporanQuery,
  useGetLaporanDetailQuery,
  useGetCountLaporanQuery,
  usePostLaporanMutation
} = laporanApi
