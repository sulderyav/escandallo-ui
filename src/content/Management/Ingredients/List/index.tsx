import {
  Card,
  Grid,
  TextField,
  InputAdornment,
  Box,
  Button,
} from '@mui/material';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import AddIcon from '@mui/icons-material/Add';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
          <Grid item xs={12} display="flex" justifyContent="space-between">
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
              variant="outlined"
            />
            <Button
              startIcon={<AddIcon />}
              onClick={() => navigate('/management/ingredients/create')}
            >
              <Box>Crear</Box>
            </Button>
          </Grid>
        </Grid>
      </Card>
      <Grid container spacing={4}>
        {ingredients.map((ingredient) => (
          <Grid item key={ingredient.id} xs={12} sm={4} lg={3}>
            <Ingredient {...ingredient} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default IngredientsList;
