import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IBoardData,
  IColumnProps,
  ICreateBoard,
  ICreateColumn,
  ICreateTask,
  IDeleteColumn,
  IDeleteTask,
  IGetUserData,
  ITaskProps,
  IUpdateBoard,
  IUpdateColumn,
  IUpdateTask,
} from "../utils/interfaces";
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
    getBoardsList: builder.query({
      query: () => `/boards`,
      providesTags: ["POST"],
      keepUnusedDataFor: 0,
    }),

    getBoardById: builder.query<IBoardData, string>({
      query: (params) => `/boards/${params}`,
      providesTags: ["POST"],
      keepUnusedDataFor: 0,
    }),

    getAllUsers: builder.query<IGetUserData[], null>({
      query: () => `/users/`,
      providesTags: ["POST"],
      keepUnusedDataFor: 0,
    }),

    getUserById: builder.query<IGetUserData, string>({
      query: (params) => `/users/${params}`,
      providesTags: ["POST"],
      keepUnusedDataFor: 0,
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
        } catch (err) {}
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
        } catch (err) {}
      },
    }),

    editUser: builder.mutation({
      query: (params) => ({
        url: `users/${params.id}`,
        method: "PUT",
        body: params.body,
      }),
      invalidatesTags: ["POST"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
        } catch (err) {}
      },
    }),

    getUser: builder.query({
      query: (id) => ({
        url: `users/${id}`,
      }),
      providesTags: ["POST"],
      keepUnusedDataFor: 10,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (err) {}
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
        } catch (err) {}
      },
    }),

    deleteBoard: builder.mutation({
      query: (params) => ({
        url: `/boards/${params}`,
        method: "DELETE",
      }),
      invalidatesTags: ["POST"],
    }),

    createBoard: builder.mutation<IBoardData, ICreateBoard>({
      query: (params) => ({
        url: `/boards`,
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["POST"],
    }),

    updateBoard: builder.mutation<IBoardData, IUpdateBoard>({
      query: (params) => ({
        url: `/boards/${params.id}`,
        method: "PUT",
        body: params.body,
      }),
      invalidatesTags: ["POST"],
    }),

    updateColumn: builder.mutation<IBoardData, IUpdateColumn>({
      query: (params) => ({
        url: `/boards/${params.boardId}/columns/${params.columnId}`,
        method: "PUT",
        body: params.body,
      }),
      invalidatesTags: ["POST"],
    }),

    updateTask: builder.mutation<IBoardData, IUpdateTask>({
      query: (params) => ({
        url: `/boards/${params.boardId}/columns/${params.columnId}/tasks/${params.taskId}`,
        method: "PUT",
        body: params.body,
      }),
      invalidatesTags: ["POST"],
    }),

    deleteTask: builder.mutation<IBoardData, IDeleteTask>({
      query: (params) => ({
        url: `/boards/${params.boardId}/columns/${params.columnId}/tasks/${params.taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["POST"],
    }),

    deleteColumn: builder.mutation<IBoardData, IDeleteColumn>({
      query: (params) => ({
        url: `/boards/${params.boardId}/columns/${params.columnId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["POST"],
    }),

    getColumnList: builder.query<IColumnProps[], string>({
      query: (params) => `/boards/${params}/columns`,
      providesTags: ["POST"],
      keepUnusedDataFor: 0,
    }),

    getTaskList: builder.query<
      ITaskProps[],
      { boardId: string; columnId: string }
    >({
      query: (params) =>
        `/boards/${params.boardId}/columns/${params.columnId}/tasks`,
      providesTags: ["POST"],
      keepUnusedDataFor: 0,
    }),

    createColumn: builder.mutation<IColumnProps, ICreateColumn>({
      query: (params) => ({
        url: `/boards/${params.id}/columns`,
        method: "POST",
        body: params.body,
      }),
      invalidatesTags: ["POST"],
    }),

    createTask: builder.mutation<IColumnProps, ICreateTask>({
      query: (params) => ({
        url: `/boards/${params.boardId}/columns/${params.columnId}/tasks`,
        method: "POST",
        body: params.body,
      }),
      invalidatesTags: ["POST"],
    }),

    getTasksOnSearch: builder.query<ITaskProps[], string>({
      query: (params) => `/tasksSet?search=${params}`,
      providesTags: ["POST"],
      keepUnusedDataFor: 0,
    }),

    tasksSet: builder.mutation({
      query: (params) => ({
        url: `/tasksSet/`,
        method: "PATCH",
        body: params,
      }),
      invalidatesTags: ["POST"],
    }),

    getAllTasksSetById: builder.query<ITaskProps[], string>({
      query: (params) => `/tasksSet/${params}`,
      providesTags: ["POST"],
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useLazyGetBoardsListQuery,
  useGetBoardsListQuery,
  useSingInMutation,
  useSingUpMutation,
  useEditUserMutation,
  useGetUserQuery,
  useDeleteUserMutation,
  useDeleteBoardMutation,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useGetBoardByIdQuery,
  useGetColumnListQuery,
  useCreateColumnMutation,
  useUpdateColumnMutation,
  useDeleteColumnMutation,
  useGetTaskListQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateTaskMutation,
  useGetTasksOnSearchQuery,
  useTasksSetMutation,
  useGetAllTasksSetByIdQuery,
} = service;
