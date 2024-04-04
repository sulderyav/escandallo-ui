import React, { ReactElement, Ref, forwardRef, useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  Slide,
  Typography,
  styled,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

import { useEntity } from './reducer';
import { TransitionProps } from '@mui/material/transitions';
import { TextsType } from '../Router';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loadingWrapper: {
      padding: theme.spacing(4),
    },
    gridContainer: {
      display: 'grid',
      gridGap: theme.spacing(3),
      gridTemplateColumns: '1fr',
      [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: '1fr 3fr',
      },
    },
    gridItem: {
      marginBottom: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        marginBottom: 0,
      },
    },
    labelText: {
      textAlign: 'left',
      paddingRight: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      [theme.breakpoints.up('sm')]: {
        textAlign: 'right',
        paddingRight: 0,
        paddingBottom: 0,
      },
    },
    cardContent: {
      padding: theme.spacing(1),
    },
    boldText: {
      fontWeight: 'bold',
    },
    box: {
      paddingRight: theme.spacing(3),
      paddingBottom: theme.spacing(1),
    },
  })
);

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

const DialogWrapper = styled(Dialog)(
  () => `
      .MuiDialog-paper {
        overflow: visible;
      }
`
);

const AvatarError = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.error.lighter};
      color: ${theme.colors.error.main};
      width: ${theme.spacing(12)};
      height: ${theme.spacing(12)};

      .MuiSvgIcon-root {
        font-size: ${theme.typography.pxToRem(45)};
      }
`
);

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

type EntityProps = {
  getEntity: (id: string) => any;
  deleteEntity?: (id: string) => Promise<void>;
  renderEntity: (
    entity: any,
    styles: Record<
      | 'loadingWrapper'
      | 'gridContainer'
      | 'gridItem'
      | 'labelText'
      | 'cardContent'
      | 'boldText'
      | 'box',
      string
    >,
    renderButtons: () => React.ReactNode
  ) => React.ReactNode;
  texts: TextsType;
  successDeleteMessage?: string;
  onDeleteSuccess?: (message: string) => void;
};

function Entity({
  getEntity,
  renderEntity,
  deleteEntity,
  texts,
  successDeleteMessage,
  onDeleteSuccess,
}: EntityProps) {
  const styles = useStyles();
  const { loading, loadingError, error, entity, handleDelete } = useEntity(
    getEntity,
    deleteEntity
  );
  const deleteAvailable = !!deleteEntity;
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const navigate = useNavigate();

  const handleConfirmDelete = () => {
    setOpenConfirmDelete(true);
  };

  const closeConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };

  const handleDeleteCompleted = () => {
    handleDelete(() => {
      navigate(-1);
      let message =
        successDeleteMessage ||
        `${texts.entity} ${
          texts.gender === 'm' ? 'borrado' : 'borrada'
        } correctamente`;
      onDeleteSuccess && onDeleteSuccess(message);
      setOpenConfirmDelete(false);
    });
  };

  const renderButtons = () => (
    <Box>
      {deleteAvailable && (
        <Box display="flex" justifyContent="flex-end">
          <ButtonError
            startIcon={
              loading ? <CircularProgress size="1rem" /> : <DeleteIcon />
            }
            disabled={loading}
            variant="contained"
            size="medium"
            onClick={handleConfirmDelete}
          >
            {loading ? 'Guardando...' : `Borrar`}
          </ButtonError>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      {loadingError && <Alert severity="error">{error}</Alert>}
      {loading && (
        <div className={styles.loadingWrapper}>
          <CircularProgress size={24} />
        </div>
      )}
      {entity && renderEntity(entity, styles, renderButtons)}

      <DialogWrapper
        open={openConfirmDelete}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={closeConfirmDelete}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          p={5}
        >
          <AvatarError>
            <CloseIcon />
          </AvatarError>

          <Typography
            align="center"
            sx={{
              py: 4,
              px: 6,
            }}
            variant="h3"
          >
            ¿Está seguro que desea borrar{' '}
            {texts.gender === 'm' ? 'este' : 'esta'}{' '}
            {texts.entity.toLowerCase()}?
          </Typography>

          <Box>
            <Button
              variant="text"
              size="large"
              sx={{
                mx: 1,
              }}
              onClick={closeConfirmDelete}
            >
              Cancelar
            </Button>
            <ButtonError
              onClick={handleDeleteCompleted}
              size="large"
              sx={{
                mx: 1,
                px: 3,
              }}
              variant="contained"
            >
              Borrar
            </ButtonError>
          </Box>
        </Box>
      </DialogWrapper>
    </>
  );
}

export default Entity;
