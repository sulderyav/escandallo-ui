import React, { useState } from 'react';
import { Box, Button, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';

import { TextsType } from '../Router';

type CreateFormProps = {
  onSubmit: (values: any) => void;
  renderButtons: () => React.ReactNode;
};

type AdministrationNewEntityProps = {
  onCreateSuccess: (message: string) => void;
  renderForm: (formProps: CreateFormProps) => React.ReactNode;
  createEntity: (entity: any) => Promise<void>;
  successMessage?: string;
  baseUrl: string;
  texts: TextsType;
};

function AdministrationNewEntity({
  onCreateSuccess,
  createEntity,
  renderForm,
  successMessage = 'Creado correctamente',
  texts,
}: AdministrationNewEntityProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  async function create(values: any) {
    setLoading(true);
    try {
      await createEntity(values);
      setLoading(false);
      // push(baseUrl);
      // Navigate to base url
      navigate(-1);
      onCreateSuccess(successMessage);
    } catch (e) {
      setError(
        `Hubo un error creando ${
          texts.gender === 'm' ? 'el' : 'la'
        } ${texts.entity.toLowerCase()}`
      );
      setLoading(false);
    }
  }

  const renderButtons = () => (
    <Box>
      <Box display="flex" justifyContent="flex-end">
        <Button
          sx={{
            mr: 2,
          }}
          type="submit"
          startIcon={loading ? <CircularProgress size="1rem" /> : <SaveIcon />}
          disabled={loading}
          variant="contained"
          size="medium"
        >
          {loading ? 'Guardando...' : `Guardar ${texts.entity.toLowerCase()}`}
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
      {renderForm({
        onSubmit: (values: any) => create(values),
        renderButtons,
      })}
    </>
  );
}

export default AdministrationNewEntity;
