import { Helmet } from 'react-helmet-async';
import { Grid } from '@mui/material';

import PageHeader from './PageHeader';
import IngredientsList from './List';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Footer from 'src/components/Footer';

function Ingredients() {
  return (
    <>
      <Helmet>
        <title>Expenses Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>

      <Grid
        sx={{
          px: 4,
        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
      >
        <Grid item xs={12}>
          <IngredientsList />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default Ingredients;
