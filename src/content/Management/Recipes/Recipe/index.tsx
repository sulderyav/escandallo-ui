import {
  Box,
  Card,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  styled,
} from '@mui/material';
import React, { FC, useCallback } from 'react';

import { useApiAuth } from 'src/hooks';
import { useRecipes } from './reducer';
import { Recipe, parseMeassurementTypeToLabel } from 'src/utils/types';
import Scrollbar from 'src/components/Scrollbar';

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);

type RecipeModalProps = {
  recipeId: string;
  onClose: () => void;
  open: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

const RecipeModal: FC<RecipeModalProps> = ({
  recipeId,
  onClose,
  open,
  onEdit,
  onDelete,
}) => {
  const { get } = useApiAuth();
  const getRecipe = useCallback(
    () => get<Recipe>(`/recipes/${recipeId}`),
    [get, recipeId]
  );
  const { recipe, loading } = useRecipes(getRecipe, open);

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      {loading && <CircularProgress />}
      {recipe && (
        <>
          <DialogTitle
            sx={{
              p: 3,
            }}
          >
            <Typography variant="h4" gutterBottom>
              {recipe.name}
            </Typography>
            <Typography variant="subtitle2">
              Porciones: {recipe.portions}
            </Typography>
          </DialogTitle>

          <DialogContent
            dividers
            sx={{
              p: 3,
            }}
          >
            <Box
              sx={{
                height: '70vh',
              }}
            >
              <Scrollbar>
                <CardCover>
                  <CardMedia image={recipe.coverImage} />
                </CardCover>

                <Box>
                  <Typography variant="h6" gutterBottom>
                    Ingredientes
                  </Typography>
                  <Box>
                    <ul>
                      {recipe.recipeIngredients.map((recipeIngredient) => (
                        <li key={recipeIngredient.id}>
                          {recipeIngredient.ingredient.name} -{' '}
                          {recipeIngredient.quantity}{' '}
                          {parseMeassurementTypeToLabel(
                            recipeIngredient.ingredient.meassurementType
                          )}
                        </li>
                      ))}
                    </ul>
                  </Box>
                </Box>

                <span dangerouslySetInnerHTML={{ __html: recipe.steps }}></span>
              </Scrollbar>
            </Box>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default RecipeModal;
