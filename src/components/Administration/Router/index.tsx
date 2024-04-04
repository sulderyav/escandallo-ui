import React, { FC, useEffect, useState } from 'react';
import { Alert, Box, Button, Snackbar } from '@mui/material';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  Link as RouterLink,
} from 'react-router-dom';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useSnackbar } from 'notistack';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import TocIcon from '@mui/icons-material/Toc';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';

import Header from './partials/Header';
import { ArrowBack } from '@mui/icons-material';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    top: {
      padding: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
    },

    titleContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing(2),
    },
    marginRight: {
      marginRight: theme.spacing(2),
    },
  })
);

type messageCallback = (message: string) => void;

export type TextsType = {
  gender: 'm' | 'f';
  entity: string;
  entityPlural: string;
  newEntity: string;
  editEntity: string;
  administrationName: string;
};

type AdministrationRouterProps = {
  renderTable: (onSuccess: messageCallback) => React.ReactNode;
  renderNewEntity?: (
    onCreated: messageCallback,
    baseUrl: string,
    texts?: TextsType
  ) => React.ReactNode;
  renderEditEntity?: (
    onUpdated: messageCallback,
    texts: TextsType
  ) => React.ReactNode;
  renderEntity?: (
    onDeleteSuccess: messageCallback,
    texts: TextsType
  ) => React.ReactNode;
  texts: TextsType;
};

const defaultTexts: AdministrationRouterProps['texts'] = {
  gender: 'm',
  entity: 'Entidad',
  entityPlural: 'Entidades',
  newEntity: 'Nuevo',
  editEntity: 'Editar',
  administrationName: 'Administrar Entidades',
};

function AdministrationRouter({
  renderTable,
  renderNewEntity,
  renderEditEntity,
  renderEntity,
  texts = defaultTexts,
}: AdministrationRouterProps) {
  const styles = useStyles();
  const [notificationMessage, setMessage] = useState('');

  return (
    <section className={styles.top}>
      <Routes>
        {renderEntity && (
          <Route
            path=":id"
            element={<Entity {...{ renderEntity, texts, renderTable }} />}
          />
        )}

        <Route
          path="list"
          element={<HeaderAndTable {...{ renderTable, texts }} />}
        />

        {/* Check if renderNewEntity is defined before rendering the nested route */}
        {renderNewEntity && (
          <Route
            path="new"
            element={<NewEntity {...{ renderNewEntity, texts, renderTable }} />}
          />
        )}

        {renderEditEntity && (
          <Route
            path=":id/edit"
            element={
              <EditEntity {...{ renderEditEntity, texts, renderTable }} />
            }
          />
        )}
      </Routes>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={notificationMessage !== ''}
        autoHideDuration={6000}
        onClose={() => setMessage('')}
      >
        <Alert onClose={() => setMessage('')} severity="success">
          {notificationMessage}
        </Alert>
      </Snackbar>
    </section>
  );
}

const HeaderAndTable: FC<AdministrationRouterProps> = ({
  renderTable,
  texts,
}) => {
  const [notificationMessage, setMessage] = useState('');
  const { pathname: path } = useLocation();

  function handleSuccess(message: string) {
    setMessage(message);
  }

  return (
    <div>
      <Header
        title={texts.administrationName}
        subtitle={`Visualiza y administra ${
          texts.gender === 'm' ? 'los' : 'las'
        } ${texts.entityPlural.toLowerCase()}.`}
        actions={() => (
          <Button
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            component={RouterLink}
            to={`${path.split('/').slice(0, -1).join('/')}/new`}
          >
            {texts?.newEntity}
          </Button>
        )}
        icon={(props) => <DisplaySettingsIcon {...props} />}
      />

      <Box marginTop={2}>{renderTable(handleSuccess)}</Box>
    </div>
  );
};

const NewEntity: FC<AdministrationRouterProps> = ({
  renderNewEntity,
  texts,
}) => {
  const [notificationMessage, setMessage] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  function handleSuccess(message: string) {
    setMessage(message);
  }

  useEffect(() => {
    if (notificationMessage !== '')
      enqueueSnackbar(notificationMessage, {
        variant: 'success',
        onClose: () => setMessage(''),
      });
  }, [notificationMessage]);

  return (
    <div>
      <Header
        title={texts.newEntity}
        subtitle={`Llene los campos a continuación para crear
        ${texts.gender === 'm' ? 'un' : 'una'} 
        ${texts.entity.toLowerCase()}.`}
        actions={() => (
          <Box mt={{ xs: 3, md: 0 }}>
            <Button
              variant="contained"
              startIcon={<ArrowBackTwoToneIcon />}
              onClick={() => navigate(-1)}
            >
              Regresar
            </Button>
          </Box>
        )}
        icon={(props) => <AddCircleOutlineIcon {...props} />}
      />

      <Box marginTop={2}>{renderNewEntity(handleSuccess, 'abc', texts)}</Box>
    </div>
  );
};

const Entity: FC<AdministrationRouterProps> = ({ renderEntity, texts }) => {
  const [notificationMessage, setMessage] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { pathname: path } = useLocation();

  function handleDeleteSuccess(message: string) {
    setMessage(message);
  }

  useEffect(() => {
    if (notificationMessage !== '')
      enqueueSnackbar(notificationMessage, {
        variant: 'success',
        onClose: () => setMessage(''),
      });
  }, [notificationMessage]);

  return (
    <>
      <Header
        title={texts.entity}
        subtitle={`Revisa toda la información
        ${texts?.gender === 'm' ? 'del' : 'de la'}
        ${texts?.entity.toLowerCase()}.`}
        actions={() => (
          <>
            <Button
              sx={{
                mt: { xs: 1, sm: 0 },
                mr: 1,
              }}
              onClick={() => navigate(-1)}
              variant="contained"
              startIcon={<ArrowBack fontSize="small" />}
            >
              Regresar
            </Button>
            <Button
              sx={{
                mt: { xs: 1, sm: 0 },
                mr: 1,
              }}
              onClick={() =>
                navigate(`${path.split('/').slice(0, -1).join('/')}/new`)
              }
              variant="outlined"
              startIcon={<AddTwoToneIcon fontSize="small" />}
            >
              {texts?.newEntity}
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate(`${path}/edit`)}
              startIcon={<EditIcon fontSize="small" />}
            >
              {texts?.editEntity}
            </Button>
          </>
        )}
        icon={(props) => <TocIcon {...props} />}
      />

      <Box marginTop={2}>{renderEntity(handleDeleteSuccess, texts)}</Box>
    </>
  );
};

const EditEntity: FC<AdministrationRouterProps> = ({
  renderEditEntity,
  texts,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [notificationMessage, setMessage] = useState('');
  const navigate = useNavigate();

  function handleSuccess(message: string) {
    setMessage(message);
  }

  useEffect(() => {
    if (notificationMessage !== '')
      enqueueSnackbar(notificationMessage, {
        variant: 'success',
        onClose: () => setMessage(''),
      });
  }, [notificationMessage]);

  return (
    <>
      <Header
        title={texts.editEntity}
        subtitle={`Modifica y actualiza la información toda la información
        ${texts.gender === 'm' ? 'del' : 'de la'}
        ${texts.entity.toLowerCase()}.`}
        actions={() => (
          <Button
            variant="contained"
            startIcon={<ArrowBackTwoToneIcon />}
            onClick={() => navigate(-1)}
          >
            Regresar
          </Button>
        )}
        icon={(props) => <ModeEditIcon {...props} />}
      />

      <Box marginTop={2}>{renderEditEntity(handleSuccess, texts)}</Box>
    </>
  );
};

export default AdministrationRouter;
