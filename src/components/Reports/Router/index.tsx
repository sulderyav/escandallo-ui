import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import React, { FC, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    top: {
      padding: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
    },
    pageTitle: {
      ...theme.typography.h4,
      margin: 0,
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

export type TextsType = {
  name: string;
};

type AdministrationRouterProps = {
  renderAvailableReports: ({}: { search: string }) => React.ReactNode;
  renderReport: () => React.ReactNode;
  texts: TextsType;
};

const defaultTexts: AdministrationRouterProps['texts'] = {
  name: 'Nuevo',
};

function ReportsRouter({
  renderAvailableReports,
  renderReport,
  texts = defaultTexts,
}: AdministrationRouterProps) {
  const styles = useStyles();
  const [notificationMessage, setMessage] = useState('');

  return (
    <section className={styles.top}>
      <Routes>
        <Route
          // path=":report-type"
          path=":id"
          element={
            <Entity
              {...{
                renderReport,
                texts,
                renderAvailableReports,
              }}
            />
          }
        />

        <Route
          path=""
          element={
            <HeaderAndAvailableReports
              {...{ renderReport, renderAvailableReports, texts }}
            />
          }
        />
      </Routes>
    </section>
  );
}

const HeaderAndAvailableReports: FC<AdministrationRouterProps> = ({
  renderAvailableReports,
  texts,
}) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  return (
    <div>
      <Helmet>
        <title>Reporte {texts.name}</title>
      </Helmet>
      <Box
        display="flex"
        alignItems={{ xs: 'stretch', md: 'center' }}
        flexDirection={{ xs: 'row', md: 'row' }}
        justifyContent="space-between"
        flexWrap={{ xs: 'wrap', md: 'nowrap' }}
      >
        <Box display="flex" alignItems="center">
          <Box>
            <Typography variant="h3" component="h3" gutterBottom>
              {texts?.name}
            </Typography>
          </Box>
        </Box>
        <Grid item>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchTwoToneIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              m: 0,
            }}
            placeholder="Busca un reporte"
            fullWidth
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>
      </Box>
      {renderAvailableReports({ search })}
    </div>
  );
};

const Entity: FC<AdministrationRouterProps> = ({ renderReport, texts }) => {
  const styles = useStyles();
  const navigate = useNavigate();
  const { pathname: path } = useLocation();

  return (
    <>
      <div className={styles.titleContainer}>
        <h3 className={styles.pageTitle}>Reporte de {texts.name}</h3>
        <div>
          <Button
            onClick={() =>
              navigate(`${path.split('/').slice(0, -1).join('/')}`)
            }
            color="primary"
            variant="contained"
          >
            <i className="fas fa-arrow-left" />
            Regresar
          </Button>
        </div>
      </div>
      {renderReport()}
    </>
  );
};

export default ReportsRouter;
