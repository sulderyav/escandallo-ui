import { useCallback, useState } from 'react';
import { Box, Card, CardMedia, Typography, styled } from '@mui/material';
import 'react-quill/dist/quill.snow.css';

import { Recipe, parseMeassurementTypeToLabel } from 'src/utils/types';
import { useApiAuth } from 'src/hooks';
import Cover from './Cover';
import { useRecipe } from './reducer';

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);

const CreateIngredientForm = () => {
  const [recipeId, setRecipeId] = useState<number>(null);
  const [pax, setPax] = useState<number>(0);
  const { get } = useApiAuth();
  const getRecipe = useCallback(async () => {
    return await get<Recipe>(`/recipes/${recipeId}`);
  }, [recipeId]);
  const { value: recipe, error } = useRecipe(getRecipe, !!recipeId);

  return (
    <>
      <Cover
        selectRecipe={(recipe) => setRecipeId(recipe)}
        setPax={(pax) => setPax(pax)}
      />
      {recipe && (
        <>
          <CardCover>
            <CardMedia image={recipe.coverImage} />
          </CardCover>

          <Card sx={{ mx: 3, p: 3, mt: 3 }}>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Porciones Originales de la Receta: {recipe.portions}
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h5" gutterBottom>
                Ingredientes
              </Typography>
              <Box>
                <ul>
                  {recipe.recipeIngredients.map((recipeIngredient) => (
                    <li key={recipeIngredient.id}>
                      {recipeIngredient.quantity * (pax || recipe.portions)}{' '}
                      {parseMeassurementTypeToLabel(
                        recipeIngredient.ingredient.meassurementType
                      )}
                      {' de '}
                      {recipeIngredient.ingredient.name}
                    </li>
                  ))}
                </ul>
              </Box>
            </Box>
          </Card>
        </>
      )}
    </>
  );
};

export default CreateIngredientForm;
