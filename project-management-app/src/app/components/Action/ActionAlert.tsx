import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert, Snackbar } from '@mui/material';

import { useAppSelector } from '../../hooks';
import { selectStateApp } from '../../store/reducers/commonSlice';

export const ActionAlert = () => {
  const { t } = useTranslation();

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
        {t(alert?.mainMessage || '')}
        {t(alert?.secondMessage || '')}
      </Alert>
    </Snackbar>
  );
}
