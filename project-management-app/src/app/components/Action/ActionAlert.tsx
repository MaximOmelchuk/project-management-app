import { Alert, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { selectStateApp } from '../../store/reducers/commonSlice';


export const ActionAlert = () => {
  const { alert } = useAppSelector(selectStateApp);
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(true);
  }, [alert]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={alert?.type} sx={{ width: '100%' }}>
        {alert?.message}
      </Alert>
    </Snackbar>
  );
}
