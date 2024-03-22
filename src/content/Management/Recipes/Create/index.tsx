import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Grid } from '@mui/material';

import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import IngredientForm from './Form';

const CreateIngredient = () => {
  return (
    <>
      <Helmet>
        <title>Crear Ingredientes</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <IngredientForm />
        </Grid>
      </Grid>
    </>
  );
};

export default CreateIngredient;
