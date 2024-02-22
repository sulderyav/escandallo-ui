import { Card, Grid, TextField, InputAdornment, Box } from '@mui/material';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import queryString from 'query-string';

import { useApiAuth } from 'src/hooks';
import { Ingredient as IngredientType } from 'src/utils/types';
import Ingredient from './Item';
import { useIngredients } from './reducer';

const IngredientsList = () => {
  const { get } = useApiAuth();
  const getIngredients = async () => {
    const params = {
      ignorePagination: true,
    };
    const query = queryString.stringify(params);
    const response = await get<IngredientType[]>('/ingredients?' + query);
    return response;
  };
  const { loading, entities: ingredients } = useIngredients(getIngredients);

  return (
    <>
      <Card
        sx={{
          p: 2,
          mb: 3,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Grid alignItems="center" container spacing={3}>
          <Grid item xs={12} lg={7} md={6}>
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
              onChange={() => {}}
              placeholder={'Buscar ingredientes...'}
              value={''}
              fullWidth
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Card>
      <Grid container spacing={3}>
        {ingredients.map((ingredient) => (
          <Grid item key={ingredient.id} xs={12} lg={4} md={3} sm={8}>
            <Ingredient {...ingredient} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default IngredientsList;
