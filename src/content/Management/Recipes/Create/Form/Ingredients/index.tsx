import { FC, useState } from 'react';
import { Box, Grid, TextField, useTheme } from '@mui/material';
import { Field, FieldProps } from 'formik';

import IngredientField from 'src/components/Administration/Partials/IngredientField';
import { CreateRecipeIngredient } from 'src/utils/types';

const RecipesIngredients: FC<{
  recipeIngredients: CreateRecipeIngredient[];
  setRecipeIngredients: (recipeIngredients: CreateRecipeIngredient[]) => void;
  updateQuantity: (index: number, quantity: number) => void;
  updateIngredient: (index: number, ingredientId: number) => void;
}> = ({
  recipeIngredients,
  setRecipeIngredients,
  updateQuantity,
  updateIngredient,
}) => {
  const theme = useTheme();
  // const [ingredients, setIngredients] = React.useState([]);

  return (
    <>
      <Grid
        item
        xs={12}
        sm={4}
        md={3}
        justifyContent="flex-end"
        textAlign={{ sm: 'right' }}
        mt={2}
      >
        <Box
          pr={3}
          sx={{
            pt: `${theme.spacing(2)}`,
            pb: { xs: 1, md: 0 },
          }}
          alignSelf="center"
        >
          <b>Ingrediente 1</b>
        </Box>
      </Grid>
      <Grid
        sx={{
          mb: `${theme.spacing(3)}`,
        }}
        item
        xs={12}
        sm={8}
        md={9}
        mt={2}
        display="flex"
      >
        <TextField
          label="Cantidad"
          placeholder="Ej. 1"
          style={{
            width: '100px',
            marginRight: '10px',
          }}
          onChange={(e) => updateQuantity(0, Number(e.target.value))}
          value={recipeIngredients[0].grossWeight}
        />
        <IngredientField
          label="Ingrediente 1"
          placeholder="Buscar ingrediente..."
          error={false}
          helperText=""
          onChange={updateIngredient}
          ingredientNumber={0}
          value={recipeIngredients[0].ingredientId as any}
        />
      </Grid>

      <Grid
        item
        xs={12}
        sm={4}
        md={3}
        justifyContent="flex-end"
        textAlign={{ sm: 'right' }}
        mt={2}
      >
        <Box
          pr={3}
          sx={{
            pt: `${theme.spacing(2)}`,
            pb: { xs: 1, md: 0 },
          }}
          alignSelf="center"
        >
          <b>Ingrediente 2</b>
        </Box>
      </Grid>
      <Grid
        sx={{
          mb: `${theme.spacing(3)}`,
        }}
        item
        xs={12}
        sm={8}
        md={9}
        mt={2}
        display="flex"
      >
        <TextField
          label="Cantidad"
          placeholder="Ej. 1"
          style={{
            width: '100px',
            marginRight: '10px',
          }}
          onChange={(e) => updateQuantity(1, Number(e.target.value))}
          value={recipeIngredients[1].grossWeight}
        />
        <IngredientField
          label="Ingrediente 2"
          placeholder="Buscar ingrediente..."
          error={false}
          helperText=""
          onChange={updateIngredient}
          ingredientNumber={1}
          value={recipeIngredients[1].ingredientId as any}
        />
      </Grid>

      <Grid
        item
        xs={12}
        sm={4}
        md={3}
        justifyContent="flex-end"
        textAlign={{ sm: 'right' }}
        mt={2}
      >
        <Box
          pr={3}
          sx={{
            pt: `${theme.spacing(2)}`,
            pb: { xs: 1, md: 0 },
          }}
          alignSelf="center"
        >
          <b>Ingrediente 3</b>
        </Box>
      </Grid>
      <Grid
        sx={{
          mb: `${theme.spacing(3)}`,
        }}
        item
        xs={12}
        sm={8}
        md={9}
        mt={2}
        display="flex"
      >
        <TextField
          label="Cantidad"
          placeholder="Ej. 1"
          style={{
            width: '100px',
            marginRight: '10px',
          }}
          onChange={(e) => updateQuantity(2, Number(e.target.value))}
          value={recipeIngredients[2].grossWeight}
        />
        <IngredientField
          label="Ingrediente 3"
          placeholder="Buscar ingrediente..."
          error={false}
          helperText=""
          onChange={updateIngredient}
          ingredientNumber={2}
          value={recipeIngredients[2].ingredientId as any}
        />
      </Grid>
    </>
  );
};

export default RecipesIngredients;
