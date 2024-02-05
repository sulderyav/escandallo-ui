import { useSnackbar } from 'notistack';
import { IconButton } from '@mui/material';
import { Close as IconClose } from '@mui/icons-material';

export function SnackbarCloseButton({ snackbarKey }) {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton onClick={() => closeSnackbar(snackbarKey)} color="warning">
      <IconClose />
    </IconButton>
  );
}
