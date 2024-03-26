import { Helmet } from 'react-helmet-async';
import { Grid } from '@mui/material';

import IngredientForm from './Form';

const CreateIngredient = () => {
  return (
    <>
      <Helmet>
        <title>Crear Receta</title>
      </Helmet>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <IngredientForm />
        </Grid>
      </Grid>
    </>
  );
};

export default CreateIngredient;
