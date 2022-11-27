import React from "react";
import {
  Dialog,
  Slide,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  
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
      <DialogTitle>{t('confirmModalContent.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button size="medium" variant="contained" onClick={onClickConfirm}>
          {t('confirmModalContent.ok')}
        </Button>
        <Button size="medium" variant="outlined" onClick={closeHandler}>
        {t('confirmModalContent.cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
