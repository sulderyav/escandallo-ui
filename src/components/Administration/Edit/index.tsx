import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, Button, CircularProgress, Grid } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import SaveIcon from '@mui/icons-material/Save';

import { useEditEntity } from './reducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loadingWrapper: {
      padding: theme.spacing(4),
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    buttonProgress: {
      marginRight: theme.spacing(1),
    },
  })
);

type EditFormProps = {
  defaultValue: any;
  onSubmit: (values: any) => void;
  renderButtons: () => React.ReactNode;
};

type AdministrationEditProps = {
  onUpdateSuccess: (message: string) => void;
  renderForm: (formProps: EditFormProps) => React.ReactNode;
  loadEntity: (id: string) => Promise<any>;
  updateEntity: (entity: any, id: string) => Promise<void>;
  successMessage?: string;
};

function AdministrationEdit({
  onUpdateSuccess,
  renderForm,
  loadEntity,
  updateEntity,
  successMessage,
}: AdministrationEditProps) {
  const styles = useStyles();
  const navigate = useNavigate();
  const { loading, updating, update, error, entity } = useEditEntity(
    onUpdateSuccess,
    loadEntity,
    updateEntity,
    successMessage
  );

  const renderButtons = () => (
    <Box>
      <Box display="flex" justifyContent="flex-end">
        <Button
          sx={{
            mr: 2,
          }}
          type="submit"
          startIcon={updating ? <CircularProgress size="1rem" /> : <SaveIcon />}
          disabled={updating}
          variant="contained"
          size="medium"
        >
          {loading ? 'Guardando...' : `Guardar Cambios`}
        </Button>
        <Button
          color="secondary"
          size="medium"
          variant="outlined"
          onClick={() => navigate(-1)}
        >
          Cancelar
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      {loading && (
        <div className={styles.loadingWrapper}>
          <CircularProgress className={styles.buttonProgress} size={24} />
        </div>
      )}
      {entity &&
        renderForm({
          defaultValue: entity,
          onSubmit: (values: any) => update(values),
          renderButtons,
        })}
    </>
  );
}

export default AdministrationEdit;
