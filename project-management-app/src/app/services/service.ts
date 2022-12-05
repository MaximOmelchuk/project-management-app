import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setMessageResponsive } from "../store/reducers/commonSlice";
// import setFields, { changeSearchString } from "../store/reducers/commonSlice";
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
import { getErrorMessage } from "../utils/utils";
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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          getErrorMessage(err, dispatch);
          // redirect(err, dispatch);
        }
      },
    }),

    getBoardById: builder.query<IBoardData, string>({
      query: (params) => `/boards/${params}`,
      providesTags: ["POST"],
      keepUnusedDataFor: 0,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          getErrorMessage(err, dispatch);
          // redirect(err, dispatch);
        }
      },
    }),

    getAllUsers: builder.query<IGetUserData[], null>({
      query: () => `/users/`,
      providesTags: ["POST"],
      keepUnusedDataFor: 0,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          getErrorMessage(err, dispatch);
          // redirect(err, dispatch);
        }
      },
    }),

    getUserById: builder.query<IGetUserData, string>({
      query: (params) => `/users/${params}`,
      providesTags: ["POST"],
      keepUnusedDataFor: 0,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          getErrorMessage(err, dispatch);
          // redirect(err, dispatch);
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
          dispatch(setMessageResponsive({ mainMessage: 'actionMessage.greetings', secondMessage: arg.login, type: 'success' }));
        } catch (err) {
          getErrorMessage(err, dispatch);
          //redirect(err, dispatch);
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
          await queryFulfilled;
        } catch (err) {
          getErrorMessage(err, dispatch);
        }
      },
    }),

    editUser: builder.mutation({
      query: (params) => ({
        url: `users/${params.id}`,
        method: "PUT",
        body: params.body,
      }),
      invalidatesTags: ["POST"],
      async onQueryStarted(arg, { dispatch }) {
        try {
          dispatch(setMessageResponsive({ mainMessage: 'actionMessage.editUser', type: 'success' }));
        } catch (err) {
          getErrorMessage(err, dispatch);
          //redirect(err, dispatch);
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
          await queryFulfilled;
          dispatch(setMessageResponsive({ mainMessage: 'actionMessage.deleteUser', type: 'success' }));
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
      keepUnusedDataFor: 10,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          getErrorMessage(err, dispatch);
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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          getErrorMessage(err, dispatch);
          // redirect(err, dispatch);
        }
      },
    }),

    createBoard: builder.mutation<IBoardData, ICreateBoard>({
      query: (params) => ({
        url: `/boards`,
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["POST"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const title = JSON.parse(arg.title)
          dispatch(setMessageResponsive({ mainMessage: 'actionMessage.createBoard', secondMessage: title[0], type: 'success' }));
          await queryFulfilled;
        } catch (err) {
          getErrorMessage(err, dispatch);
          // redirect(err, dispatch);
        }
      },
    }),

    updateBoard: builder.mutation<IBoardData, IUpdateBoard>({
      query: (params) => ({
        url: `/boards/${params.id}`,
        method: "PUT",
        body: params.body,
      }),
      invalidatesTags: ["POST"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          getErrorMessage(err, dispatch);
          // redirect(err, dispatch);
        }
      },
    }),

    updateColumn: builder.mutation<IBoardData, IUpdateColumn>({
      query: (params) => ({
        url: `/boards/${params.boardId}/columns/${params.columnId}`,
        method: "PUT",
        body: params.body,
      }),
      invalidatesTags: ["POST"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          getErrorMessage(err, dispatch);
          // redirect(err, dispatch);
        }
      },
    }),

    updateTask: builder.mutation<IBoardData, IUpdateTask>({
      query: (params) => ({
        url: `/boards/${params.boardId}/columns/${params.columnId}/tasks/${params.taskId}`,
        method: "PUT",
        body: params.body,
      }),
      invalidatesTags: ["POST"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          getErrorMessage(err, dispatch);
          // redirect(err, dispatch);
        }
      },
    }),

    deleteTask: builder.mutation<IBoardData, IDeleteTask>({
      query: (params) => ({
        url: `/boards/${params.boardId}/columns/${params.columnId}/tasks/${params.taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["POST"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setMessageResponsive({ mainMessage: 'actionMessage.deleteTask', secondMessage: data.title, type: 'success' }));
        } catch (err) {
          getErrorMessage(err, dispatch);
          // redirect(err, dispatch);
        }
      },
    }),

    deleteColumn: builder.mutation<IBoardData, IDeleteColumn>({
      query: (params) => ({
        url: `/boards/${params.boardId}/columns/${params.columnId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["POST"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setMessageResponsive({ mainMessage: 'actionMessage.deleteColumn', secondMessage: data.title, type: 'success' }));
        } catch (err) {
          getErrorMessage(err, dispatch);
          // redirect(err, dispatch);
        }
      },
    }),

    getColumnList: builder.query<IColumnProps[], string>({
      query: (params) => `/boards/${params}/columns`,
      providesTags: ["POST"],
      keepUnusedDataFor: 0,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          getErrorMessage(err, dispatch);
          // redirect(err, dispatch);
        }
      },
    }),

    getTaskList: builder.query<
      ITaskProps[],
      { boardId: string; columnId: string }
    >({
      query: (params) =>
        `/boards/${params.boardId}/columns/${params.columnId}/tasks`,
      providesTags: ["POST"],
      keepUnusedDataFor: 0,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          getErrorMessage(err, dispatch);
          // redirect(err, dispatch);
        }
      },
    }),

    createColumn: builder.mutation<IColumnProps, ICreateColumn>({
      query: (params) => ({
        url: `/boards/${params.id}/columns`,
        method: "POST",
        body: params.body,
      }),
      invalidatesTags: ["POST"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          dispatch(setMessageResponsive({ mainMessage: 'actionMessage.createColumn', secondMessage: arg.body.title, type: 'success' }));
          await queryFulfilled;
        } catch (err) {
          getErrorMessage(err, dispatch);
          // redirect(err, dispatch);
        }
      },
    }),

    createTask: builder.mutation<IColumnProps, ICreateTask>({
      query: (params) => ({
        url: `/boards/${params.boardId}/columns/${params.columnId}/tasks`,
        method: "POST",
        body: params.body,
      }),
      invalidatesTags: ["POST"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          dispatch(setMessageResponsive({ mainMessage: 'actionMessage.createTask', secondMessage: arg.body.title, type: 'success' }));
          await queryFulfilled;
        } catch (err) {
          getErrorMessage(err, dispatch);
          // redirect(err, dispatch);
        }
      },
    }),

    getTasksOnSearch: builder.query<ITaskProps[], string>({
      query: (params) => `/tasksSet?search=${params}`,
      providesTags: ["POST"],
      keepUnusedDataFor: 0,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          getErrorMessage(err, dispatch);
          // redirect(err, dispatch);
        }
      },
    }),

    tasksSet: builder.mutation({
      query: (params) => ({
        url: `/tasksSet/`,
        method: "PATCH",
        body: params,
      }),
      invalidatesTags: ["POST"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          getErrorMessage(err, dispatch);
          // redirect(err, dispatch);
        }
      },
    }),

    getAllTasksSetById: builder.query<ITaskProps[], string>({
      query: (params) => `/tasksSet/${params}`,
      providesTags: ["POST"],
      keepUnusedDataFor: 0,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          getErrorMessage(err, dispatch);
          // redirect(err, dispatch);
        }
      },
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
