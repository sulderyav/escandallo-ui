import { FC, useState } from 'react';
import { Box, Grid, TextField, useTheme } from '@mui/material';
import { Field, FieldProps } from 'formik';

import IngredientField from 'src/components/Administration/Partials/IngredientField';
import {
  CreateRecipeIngredient,
  parseMeassurementTypeToAvrebiation,
} from 'src/utils/types';
import { useIngredientsSelector } from 'src/hooks';

const RecipesIngredients: FC<{
  recipeIngredients: CreateRecipeIngredient[];
  setRecipeIngredients: (recipeIngredients: CreateRecipeIngredient[]) => void;
  updateQuantity: (index: number, quantity: number) => void;
  updateIngredient: (index: number, ingredientId: number) => void;
  updateWaste: (index: number, waste: number) => void;
}> = ({
  recipeIngredients,
  setRecipeIngredients,
  updateQuantity,
  updateIngredient,
  updateWaste,
}) => {
  const theme = useTheme();
  const { ingredientsOptions } = useIngredientsSelector();

  console.log('recipeIngredients', recipeIngredients);

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
      <Grid item xs={12} sm={8} md={9} mt={2} display="flex">
        <IngredientField
          label="Ingrediente 1"
          placeholder="Buscar ingrediente..."
          error={false}
          helperText=""
          onChange={updateIngredient}
          ingredientNumber={0}
          value={recipeIngredients[0].ingredientId as any}
        />
        <TextField
          label="Cantidad"
          placeholder="Ej. 1"
          style={{
            width: '100px',
            marginRight: '10px',
          }}
          // onChange={(e) => updateQuantity(0, Number(e.target.value))}
          onChange={(e) => updateQuantity(0, e.target.value as any)}
          value={recipeIngredients[0].grossWeight}
          disabled={recipeIngredients[0].ingredientId === 0}
          InputProps={{
            endAdornment: (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 10px',
                }}
              >
                {parseMeassurementTypeToAvrebiation(
                  ingredientsOptions.find(
                    (ingredient) =>
                      ingredient.value === recipeIngredients[0].ingredientId
                    // @ts-ignore
                  )?.meassurementType
                )}
              </Box>
            ),
          }}
        />
        <TextField
          label="Merma"
          placeholder="Ej. 1"
          style={{
            width: '100px',
            marginRight: '10px',
          }}
          onChange={(e) => updateWaste(0, e.target.value as any)}
          value={recipeIngredients[0].waste}
          disabled={recipeIngredients[0].ingredientId === 0}
          InputProps={{
            endAdornment: (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 10px',
                }}
              >
                {parseMeassurementTypeToAvrebiation(
                  ingredientsOptions.find(
                    (ingredient) =>
                      ingredient.value === recipeIngredients[0].ingredientId
                    // @ts-ignore
                  )?.meassurementType
                )}
              </Box>
            ),
          }}
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
      <Grid item xs={12} sm={8} md={9} mt={2} display="flex">
        <IngredientField
          label="Ingrediente 2"
          placeholder="Buscar ingrediente..."
          error={false}
          helperText=""
          onChange={updateIngredient}
          ingredientNumber={1}
          value={recipeIngredients[1].ingredientId as any}
        />
        <TextField
          label="Cantidad"
          placeholder="Ej. 1"
          style={{
            width: '100px',
            marginRight: '10px',
          }}
          onChange={(e) => updateQuantity(1, e.target.value as any)}
          value={recipeIngredients[1].grossWeight}
          disabled={recipeIngredients[1].ingredientId === 0}
          InputProps={{
            endAdornment: (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 10px',
                }}
              >
                {parseMeassurementTypeToAvrebiation(
                  ingredientsOptions.find(
                    (ingredient) =>
                      ingredient.value === recipeIngredients[1].ingredientId
                    // @ts-ignore
                  )?.meassurementType
                )}
              </Box>
            ),
          }}
        />
        <TextField
          label="Merma"
          placeholder="Ej. 1"
          style={{
            width: '100px',
            marginRight: '10px',
          }}
          onChange={(e) => updateWaste(1, e.target.value as any)}
          value={recipeIngredients[1].waste}
          disabled={recipeIngredients[1].ingredientId === 0}
          InputProps={{
            endAdornment: (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 10px',
                }}
              >
                {parseMeassurementTypeToAvrebiation(
                  ingredientsOptions.find(
                    (ingredient) =>
                      ingredient.value === recipeIngredients[1].ingredientId
                    // @ts-ignore
                  )?.meassurementType
                )}
              </Box>
            ),
          }}
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
        <IngredientField
          label="Ingrediente 3"
          placeholder="Buscar ingrediente..."
          error={false}
          helperText=""
          onChange={updateIngredient}
          ingredientNumber={2}
          value={recipeIngredients[2].ingredientId as any}
        />

        <TextField
          label="Cantidad"
          placeholder="Ej. 1"
          style={{
            width: '100px',
            marginRight: '10px',
          }}
          onChange={(e) => updateQuantity(2, e.target.value as any)}
          value={recipeIngredients[2].grossWeight}
          disabled={recipeIngredients[2].ingredientId === 0}
          InputProps={{
            endAdornment: (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 10px',
                }}
              >
                {parseMeassurementTypeToAvrebiation(
                  ingredientsOptions.find(
                    (ingredient) =>
                      ingredient.value === recipeIngredients[2].ingredientId
                    // @ts-ignore
                  )?.meassurementType
                )}
              </Box>
            ),
          }}
        />
        <TextField
          label="Merma"
          placeholder="Ej. 1"
          style={{
            width: '100px',
            marginRight: '10px',
          }}
          onChange={(e) => updateWaste(2, e.target.value as any)}
          value={recipeIngredients[2].waste}
          disabled={recipeIngredients[2].ingredientId === 0}
          InputProps={{
            endAdornment: (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 10px',
                }}
              >
                {parseMeassurementTypeToAvrebiation(
                  ingredientsOptions.find(
                    (ingredient) =>
                      ingredient.value === recipeIngredients[2].ingredientId
                    // @ts-ignore
                  )?.meassurementType
                )}
              </Box>
            ),
          }}
        />
      </Grid>
    </>
  );
};

export default RecipesIngredients;
