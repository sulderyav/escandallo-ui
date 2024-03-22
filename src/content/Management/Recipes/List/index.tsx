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
import { Recipe as RecipeType } from 'src/utils/types';
import Ingredient from './Item';
import { useIngredients } from './reducer';

const RecipesList = () => {
  const { get } = useApiAuth();
  const getRecipes = async () => {
    const params = {
      ignorePagination: true,
    };
    const query = queryString.stringify(params);
    return await get<RecipeType[]>('/recipes?' + query);
  };
  const { loading, entities: ingredients } = useIngredients(getRecipes);
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
              placeholder={'Buscar recetas...'}
              value={''}
              variant="outlined"
            />
            <Button
              startIcon={<AddIcon />}
              onClick={() => navigate('/management/recipes/create')}
            >
              <Box>Crear</Box>
            </Button>
          </Grid>
        </Grid>
      </Card>
      <Grid container spacing={3}>
        {ingredients.map((ingredient) => (
          <Grid item key={ingredient.id} xs={12} sm={4} md={2}>
            <Ingredient {...ingredient} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default RecipesList;
