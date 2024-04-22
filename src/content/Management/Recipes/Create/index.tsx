import { Helmet } from 'react-helmet-async';
import { Grid } from '@mui/material';

import RecipeForm from './Form';

const CreateIngredient = () => {
  return (
    <>
      <Helmet>
        <title>Crear Receta</title>
      </Helmet>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <RecipeForm />
        </Grid>
      </Grid>
    </>
  );
};

export default CreateIngredient;
