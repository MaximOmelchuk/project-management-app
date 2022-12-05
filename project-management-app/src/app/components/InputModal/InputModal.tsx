import React from "react";
import {
  Dialog,
  Slide,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  Grid,
  Box,
  useMediaQuery,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useFormik } from "formik";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { IInputModalProps } from "../../utils/interfaces";

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

export default function InputModal({
  closeHandler,
  confirmHandler,
  title,
  inputsContent,
}: IInputModalProps) {
  const { t } = useTranslation();

  const isSingleInput = inputsContent.length === 1;

  const validationSchema = yup.object(
    isSingleInput
      ? {
          first: yup.string().required(t("inputModalContent.validation") || ""),
        }
      : {
          first: yup.string().required(t("inputModalContent.validation") || ""),
          second: yup
            .string()
            .required(t("inputModalContent.validation") || ""),
        }
  );

  const formik = useFormik({
    initialValues: isSingleInput ? { first: "" } : { first: "", second: "" },
    validationSchema,
    onSubmit: (value) => {
      confirmHandler(value);
    },
  });

  const matches = useMediaQuery("(min-width:500px)");

  return (
    <Dialog
      open={true}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      maxWidth="xs"
      onClose={closeHandler}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle
        variant="h6"
        align="center"
        sx={{ pb: 0, mt: 1, fontSize: matches ? "20px" : "16px" }}
      >
        {title}
      </DialogTitle>
      <DialogContent sx={{ px: matches ? "24px" : "15px" }}>
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
            boxSizing: "content-box",
            mt: 2,
          }}
        >
          <TextField
            fullWidth
            autoComplete="off"
            id="first"
            type="text"
            name="first"
            onChange={formik.handleChange}
            inputProps={{ maxLength: 50 }}
            label={inputsContent[0]}
            value={formik.values.first}
            error={formik.touched.first && Boolean(formik.errors.first)}
            helperText={formik.touched.first && formik.errors.first}
          />
          {!!inputsContent[1] && (
            <TextField
              fullWidth
              multiline
              autoComplete="off"
              inputProps={{ maxLength: 100 }}
              rows="3"
              id="second"
              name="second"
              onChange={formik.handleChange}
              label={inputsContent[1]}
              value={formik.values.second}
              error={formik.touched.second && Boolean(formik.errors.second)}
              helperText={formik.touched.second && formik.errors.second}
              type="text"
            />
          )}
          <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
            <Button
              type="submit"
              size={matches ? "medium" : "small"}
              variant="contained"
              sx={{ width: "48%" }}
            >
              {t("inputModalContent.ok")}
            </Button>
            <Button
              size={matches ? "medium" : "small"}
              variant="outlined"
              onClick={closeHandler}
              sx={{ width: "48%" }}
            >
              {t("inputModalContent.cancel")}
            </Button>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
