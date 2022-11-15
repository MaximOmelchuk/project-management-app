import React, { useState } from "react";
import {
  Dialog,
  Slide,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  SlideProps,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { sizing } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setIsModalConfirmOpen } from "../../store/reducers/commonSlice";

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

export default function ConfirmModal({
  content,
  closeHandler,
  confirmHandler,
}: {
  content: string;
  confirmHandler: () => void;
  closeHandler: () => void;
}) {
  const onClickConfirm = () => {
    confirmHandler();
    closeHandler();
  };

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
      <DialogTitle>Attention</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button size="medium" variant="contained" onClick={onClickConfirm}>
          OK
        </Button>
        <Button size="medium" variant="outlined" onClick={closeHandler}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
