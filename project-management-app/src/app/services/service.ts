import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import setFields from "../store/reducers/commonSlice";
import {
  IBoardData,
  ICreateBoard,
  ISigninArg,
  ISigninResult,
} from "../utils/interfaces";
// import { formatDate, redirect } from "../utils/utils";
import getHeaders, { getUserId } from "../utils/tokenUtils";

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
    getBoardsList: builder.query<IBoardData[], undefined>({
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
          const userId = getUserId(token);
          window.localStorage.setItem("app_user_id", userId);
        } catch (err) {
          // redirect(err, dispatch);
        }
      },
    }),

    deleteBoard: builder.mutation({
      query: (params) => ({
        url: `/boards/${params}`,
        method: "DELETE",
      }),
      invalidatesTags: ["POST"],
      //   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //     try {
      //       const {
      //         data: { token },
      //       } = await queryFulfilled;
      //       window.localStorage.setItem("app_access_token", token);
      //     } catch (err) {
      // redirect(err, dispatch);
      //     }
      //   },
    }),

    createBoard: builder.mutation<IBoardData, ICreateBoard>({
      query: (params) => ({
        url: `/boards`,
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["POST"],
      //   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //     try {
      //       const {
      //         data: { token },
      //       } = await queryFulfilled;
      //       window.localStorage.setItem("app_access_token", token);
      //     } catch (err) {
      // redirect(err, dispatch);
      //     }
      //   },
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
  useDeleteBoardMutation,
  useCreateBoardMutation,
  //   useUpdateHostMutation,
  //   useGetHostByIdQuery,
  //   useGetHostStatusesQuery,
  //   useGetHostTypesQuery,
  //   useDeleteHostMutation,
  //   useGetAllUnpQuery,
  //   useLazyGetCompanyByUnpQuery,
} = service;
