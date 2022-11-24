import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import setFields from "../store/reducers/commonSlice";
import { ISigninArg, ISigninResult } from "../utils/interfaces";
// import { formatDate, redirect } from "../utils/utils";
import getHeaders from "../utils/tokenUtils";

export const service = createApi({
  reducerPath: "service",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://final-task-backend-production-34ff.up.railway.app",
    prepareHeaders: async (headers) => {
      await getHeaders(headers);
      return headers;
    },
  }),

  tagTypes: ["POST"],
  endpoints: (builder) => ({

    getBoardsList: builder.query({
      query: () => `/boards`,
      providesTags: ["POST"],
      keepUnusedDataFor: 0,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (err) {
          //   redirect(err, dispatch);
        }
      },
    }),

    singIn: builder.mutation({
      query: (params) => ({
        url: `/auth/signin`,
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["POST"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { token },
          } = await queryFulfilled;

          window.localStorage.setItem("app_access_token", token);
        } catch (err) {
          // redirect(err, dispatch);
        }
      },
    }),

    singUp: builder.mutation({
      query: (params) => ({
        url: `auth/signup`,
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["POST"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
        } catch (err) {
          // redirect(err, dispatch);
        }
      },
    }),

    editUser: builder.mutation({
      query: (params) => ({
        url: `users/${params.id}`,
        method: "PUT",
        body: params,
      }),
      invalidatesTags: ["POST"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          
        } catch (err) {
          // redirect(err, dispatch);
        }
      },
    }),


    getUser: builder.query({
      query: (id) => ({
        url: `users/${id}`,
      }),
      providesTags: ["POST"],
      keepUnusedDataFor: 0,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (err) {
          //   redirect(err, dispatch);
        }
      },
    }),

    deleteUser: builder.mutation({
      query: (params) => ({
        url: `users/${params.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["POST"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
        } catch (err) {
          // redirect(err, dispatch);
        }
      },
    }),

    // updateHost: builder.mutation({
    //   query: (params) => ({
    //     url: `host/update/${params.id}`,
    //     method: "POST",
    //     body: params.body,
    //   }),
    //   invalidatesTags: ["POST"],
    //   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
    //     try {
    //       const { data } = await queryFulfilled;
    //     } catch (err) {
    //       //   redirect(err, dispatch);
    //     }
    //   },
    // }),
    //     deleteHost: builder.mutation({
    //       query: (params) => ({
    //         url: `host/delete/${params.id}`,
    //         method: "DELETE",
    //       }),
    //       invalidatesTags: ["POST"],
    //       async onQueryStarted(arg, { dispatch, queryFulfilled }) {
    //         try {
    //           const { data } = await queryFulfilled;
    //         } catch (err) {
    //           redirect(err, dispatch);
    //         }
    //       },
    //     }),

    //
    //     getAllUnp: builder.query({
    //       query: () => `host/create/unp-list/`,
    //       providesTags: ["POST"],
    //       keepUnusedDataFor: 0,
    //       async onQueryStarted(arg, { dispatch, queryFulfilled }) {
    //         try {
    //           const { data } = await queryFulfilled;
    //         } catch (err) {
    //           redirect(err, dispatch);
    //         }
    //       },
    //     }),
    //     getHostStatuses: builder.query({
    //       query: () => `dictionary/host-status/list/`,
    //       providesTags: ["POST"],
    //       keepUnusedDataFor: 0,
    //       async onQueryStarted(arg, { dispatch, queryFulfilled }) {
    //         try {
    //           const { data } = await queryFulfilled;
    //         } catch (err) {
    //           redirect(err, dispatch);
    //         }
    //       },
    //     }),
    // getHostTypes: builder.query({
    //   query: (params) => `dictionary/host-type/list/?${params}`,
    //   providesTags: ["POST"],
    //   keepUnusedDataFor: 0,
    //   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
    //     try {
    //       const { data } = await queryFulfilled;
    //     } catch (err) {
    //       redirect(err, dispatch);
    //     }
    //   },
    // }),
    //     getHostById: builder.query({
    //       query: (params) => `host/uuid/${params}`,
    //       providesTags: ["POST"],
    //       keepUnusedDataFor: 0,
    //       async onQueryStarted(arg, { dispatch, queryFulfilled }) {
    //         try {
    //           const { data } = await queryFulfilled;
    //         } catch (err) {
    //           redirect(err, dispatch);
    //         }
    //       },
    //     }),
    //     getCompanyByUnp: builder.query({
    //       query: (params) => `host/update/company-name/${params}`,
    //       providesTags: ["POST"],
    //       keepUnusedDataFor: 0,
    //       async onQueryStarted(arg, { dispatch, queryFulfilled }) {
    //         try {
    //           const { data } = await queryFulfilled;
    //         } catch (err) {
    //           redirect(err, dispatch);
    //         }
    //       },
    //     }),
    //   }),
  }),
});

export const {
  useLazyGetBoardsListQuery,
  useGetBoardsListQuery,
  useSingInMutation,
  useSingUpMutation,
  useEditUserMutation,
  useGetUserQuery,
  useDeleteUserMutation
  //   useUpdateHostMutation,
  //   useGetHostByIdQuery,
  //   useGetHostStatusesQuery,
  //   useGetHostTypesQuery,
  //   useDeleteHostMutation,
  //   useGetAllUnpQuery,
  //   useLazyGetCompanyByUnpQuery,
} = service;
