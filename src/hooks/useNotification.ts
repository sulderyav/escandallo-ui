import { useSnackbar, VariantType } from 'notistack';
import { Zoom } from '@mui/material';

export const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  const notify = (props: {
    status: 200 | 400 | 404;
    message?: string;
    payload?: any;
    executedAt?: string;
  }) => {
    const { status, message, payload, executedAt } = props;
    let variant: VariantType;
    let defaultMessage: string;

    switch (status) {
      case 200:
        variant = 'success';
        defaultMessage = 'La operación se ha ejecutado exitosamente.';
        break;
      case 404:
        variant = 'error';
        defaultMessage = 'No se ha podido encontrar lo que solicitaste.';
        break;
      case 400:
        variant = 'error';
        defaultMessage = 'Ha ocurrido un error.';
        break;
      default:
        console.error(`${executedAt}`, payload);
        defaultMessage = 'Ha ocurrido algo inesperado.';
        variant = 'info';
    }

    enqueueSnackbar(message ? message : defaultMessage, {
      variant,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      },
      autoHideDuration: 3000,
      TransitionComponent: Zoom
    });
  };

  return notify;
};
