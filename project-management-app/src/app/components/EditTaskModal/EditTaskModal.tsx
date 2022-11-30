import React, { useEffect } from "react";
import {
  Dialog,
  Slide,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Grid,
  Box,
  TextFieldProps,
  Autocomplete,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useFormik } from "formik";
import * as yup from "yup";
import { IEditTaskModalProps, IInputModalProps } from "../../utils/interfaces";
import {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateTaskMutation,
} from "../../services/service";
import { nanoid } from "@reduxjs/toolkit";

const Transition = React.forwardRef<
  unknown,
  TransitionProps & {
    children: React.ReactElement;
  }
>(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditTaskModal({
  closeHandler,
  title,
  description,
  userId,
  users,
  columnId,
  order,
  boardId,
  taskId,
}: IEditTaskModalProps) {
  const { data: usersDropList, isSuccess: isSuccessGetAllUsers } =
    useGetAllUsersQuery(null);
  const { data: userData, isSuccess: isSuccessGetOneUser } =
    useGetUserByIdQuery(userId);
  const [triggerUpdate] = useUpdateTaskMutation();

  const TITLE_FORM = "Update task";
  const TASK_TITLE_FORM = "Task title";
  const TASK_DESCRIPTION_FORM = "Task description";
  const TASK_USERID_FORM = "Task owner";
  const TASK_USERS_FORM = "Task users";

  const validationSchema = yup.object({
    title: yup.string().required("Required field"),
    description: yup.string().required("Required field"),
    userId: yup.object().required("Required field"),
    users: yup.array().min(1, "Empty field"),
    // users: yup.array().test("Required field", "Required field", (value) => Boolean(value?.length)),
  });

  const formik = useFormik({
    initialValues: {
      title,
      description,
      userId: userData || null,
      users: usersDropList || [],
    },
    validationSchema,
    onSubmit: async (values) => {
      const body = {
        ...values,
        users: values.users.map((item) => item._id),
        userId: values.userId?._id || "",
        columnId,
        order,
      };
      await triggerUpdate({ boardId, columnId, taskId, body: body });
      closeHandler();
    },
  });

  useEffect(() => {
    if (isSuccessGetOneUser) {
      formik.setFieldValue("userId", { ...userData, key: nanoid() });
    }
  }, [isSuccessGetOneUser]);

  useEffect(() => {
    if (isSuccessGetAllUsers) {
      const usersFullArr = usersDropList.filter((item) =>
        users.includes(item._id)
      );
      formik.setFieldValue("users", usersFullArr);
    }
  }, [isSuccessGetAllUsers]);

  return (
    <Dialog
      open={true}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      maxWidth="sm"
      onClose={closeHandler}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle variant="h5" align="center" sx={{ pb: 0, mt: 1 }}>
        {TITLE_FORM}
      </DialogTitle>
      <DialogContent>
        <Box
          onSubmit={formik.handleSubmit}
          noValidate
          component="form"
          sx={{
            display: "flex",
            gap: "1rem",
            flexDirection: "column",
            alignItems: "center",
            height: "auto",
            padding: " 1rem",
            boxSizing: "content-box",
            mt: 2,
          }}
        >
          <TextField
            fullWidth
            autoComplete="off"
            id="title"
            name="title"
            onChange={formik.handleChange}
            inputProps={{ maxLength: 50 }}
            label={TASK_TITLE_FORM}
            value={formik.values.title}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            fullWidth
            multiline
            autoComplete="off"
            inputProps={{ maxLength: 100 }}
            rows="3"
            id="description"
            name="description"
            onChange={formik.handleChange}
            label={TASK_DESCRIPTION_FORM}
            value={formik.values.description}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />

          <Autocomplete
            disablePortal
            // disableClearable
            fullWidth
            value={formik.values.userId}
            id="userId"
            onChange={(e, value) => formik.setFieldValue("userId", value)}
            options={
              usersDropList?.map((item) => ({ ...item, key: nanoid() })) || []
            }
            isOptionEqualToValue={(option, value) => option._id === value?._id}
            getOptionLabel={(option) => option?.login || ""}
            renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
              <TextField
                {...params}
                error={formik.touched.userId && Boolean(formik.errors.userId)}
                name="userId"
                id="userId"
                helperText={
                    formik.touched.userId &&
                    Boolean(formik.errors.userId) &&
                    "Required field"}
                label={TASK_USERID_FORM}
              />
            )}
          />

          <Autocomplete
            disablePortal
            multiple
            fullWidth
            value={isSuccessGetAllUsers ? formik.values.users : []}
            onChange={(e, value) => {
              formik.setFieldValue("users", value);
            }}
            id="users"
            options={
              usersDropList?.map((item) => ({ ...item, key: nanoid() })) || []
            }
            isOptionEqualToValue={(option, value) => option._id === value._id}
            getOptionLabel={(option) => option.login}
            renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
              <TextField
                {...params}
                // value={formik.values.users}
                error={formik.touched.users && Boolean(formik.errors.users)}
                helperText={
                  formik.touched.users &&
                  Boolean(formik.errors.users) &&
                  "Required field"
                }
                name="users"
                id="users"
                label={TASK_USERS_FORM}
              />
            )}
          />

          <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
            <Button
              type="submit"
              size="medium"
              variant="contained"
              sx={{ width: "48%" }}
            >
              SAVE
            </Button>
            <Button
              size="medium"
              variant="outlined"
              onClick={closeHandler}
              sx={{ width: "48%" }}
            >
              Cancel
            </Button>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
