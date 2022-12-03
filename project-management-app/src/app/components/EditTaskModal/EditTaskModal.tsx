import React, { useEffect } from "react";
import {
  Dialog,
  Slide,
  DialogTitle,
  DialogContent,
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
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const { data: usersDropList, isSuccess: isSuccessGetAllUsers } =
    useGetAllUsersQuery(null);
  const { data: userData, isSuccess: isSuccessGetOneUser } =
    useGetUserByIdQuery(userId);
  const [triggerUpdate] = useUpdateTaskMutation();

  const validationSchema = yup.object({
    title: yup.string().required(t("editTaskContent.error") || ""),
    description: yup.string().required(t("editTaskContent.error") || ""),
    userId: yup.object().required(t("editTaskContent.error") || ""),
    users: yup.array().min(1, t("editTaskContent.error") || ""),
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
        {t("editTaskContent.formTitle")}
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
            label={t("editTaskContent.createContentFirst")}
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
            label={t("editTaskContent.createContentSecond")}
            value={formik.values.description}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />

          <Autocomplete
            disablePortal
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
                  "Required field"
                }
                label={t("editTaskContent.owner")}
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
                error={formik.touched.users && Boolean(formik.errors.users)}
                helperText={
                  formik.touched.users &&
                  Boolean(formik.errors.users) &&
                  t("editTaskContent.error")
                }
                name="users"
                id="users"
                label={t("editTaskContent.users")}
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
              {t("editTaskContent.save")}
            </Button>
            <Button
              size="medium"
              variant="outlined"
              onClick={closeHandler}
              sx={{ width: "48%" }}
            >
              {t("editTaskContent.cancel")}
            </Button>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
