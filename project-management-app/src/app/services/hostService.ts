import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setFields } from "../store/reducers/commonSlice";
import { formatDate, redirect } from "../utils/utils";
import getHeaders from "../utils/tokenUtils";

export const hostsService = createApi({
  reducerPath: "hostsService",
  baseQuery: fetchBaseQuery({
    baseUrl: "/license-manager/rest/v1/",
    prepareHeaders: async (headers) => {
      await getHeaders(headers);
      return headers;
    },
  }),
  tagTypes: ["POST"],
  endpoints: (builder) => ({
    postNewHost: builder.mutation({
      query: (params) => ({
        url: `host/create/`,
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["POST"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (err) {
          redirect(err, dispatch);
        }
      },
    }),
    updateHost: builder.mutation({
      query: (params) => ({
        url: `host/update/${params.id}`,
        method: "POST",
        body: params.body,
      }),
      invalidatesTags: ["POST"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (err) {
          redirect(err, dispatch);
        }
      },
    }),
    deleteHost: builder.mutation({
      query: (params) => ({
        url: `host/delete/${params.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["POST"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (err) {
          redirect(err, dispatch);
        }
      },
    }),
    getHostList: builder.query({
      query: (params) => `host/list/?${params}`,
      providesTags: ["POST"],
      keepUnusedDataFor: 0,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (err) {
          redirect(err, dispatch);
        }
      },
    }),
    getAllUnp: builder.query({
      query: () => `host/create/unp-list/`,
      providesTags: ["POST"],
      keepUnusedDataFor: 0,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (err) {
          redirect(err, dispatch);
        }
      },
    }),
    getHostStatuses: builder.query({
      query: () => `dictionary/host-status/list/`,
      providesTags: ["POST"],
      keepUnusedDataFor: 0,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (err) {
          redirect(err, dispatch);
        }
      },
    }),
    getHostTypes: builder.query({
      query: (params) => `dictionary/host-type/list/?${params}`,
      providesTags: ["POST"],
      keepUnusedDataFor: 0,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (err) {
          redirect(err, dispatch);
        }
      },
    }),
    getHostById: builder.query({
      query: (params) => `host/uuid/${params}`,
      providesTags: ["POST"],
      keepUnusedDataFor: 0,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (err) {
          redirect(err, dispatch);
        }
      },
    }),
    getCompanyByUnp: builder.query({
      query: (params) => `host/update/company-name/${params}`,
      providesTags: ["POST"],
      keepUnusedDataFor: 0,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (err) {
          redirect(err, dispatch);
        }
      },
    }),
  }),
});
export const {
  useLazyGetHostListQuery,
  usePostNewHostMutation,
  useUpdateHostMutation,
  useGetHostByIdQuery,
  useGetHostStatusesQuery,
  useGetHostTypesQuery,
  useDeleteHostMutation,
  useGetAllUnpQuery,
  useLazyGetCompanyByUnpQuery,
} = hostsService;
