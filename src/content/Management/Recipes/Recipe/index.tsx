import {
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  styled,
} from '@mui/material';
import React, { FC, useCallback } from 'react';

import { useApiAuth } from 'src/hooks';
import { useRecipes } from './reducer';
import {
  Recipe,
  parseMeassurementTypeToAvrebiation,
  parseMeassurementTypeToLabel,
} from 'src/utils/types';
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
    <Dialog fullWidth maxWidth="lg" open={open} onClose={onClose}>
      {loading && <CircularProgress />}
      {recipe && (
        <>
          <DialogTitle
            sx={{
              p: 3,
            }}
          >
            <Typography variant="h3" gutterBottom>
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
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h5" gutterBottom>
                      Ingredientes
                    </Typography>
                    <Box>
                      <ul>
                        {recipe.recipeIngredients.map((recipeIngredient) => (
                          <li key={recipeIngredient.id}>
                            {recipeIngredient.grossWeight}{' '}
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

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h5" gutterBottom>
                      Procedimiento
                    </Typography>
                    <Box>
                      <span
                        dangerouslySetInnerHTML={{ __html: recipe.steps }}
                      ></span>
                    </Box>
                  </Box>

                  {recipe.subjects && recipe.subjects.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="h5" gutterBottom>
                        Materias relacionadas
                      </Typography>
                      <Box>
                        {recipe.subjects.map((subject) => (
                          <Box key={subject.id}>{subject.name}</Box>
                        ))}
                      </Box>
                    </Box>
                  )}

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h5" gutterBottom>
                      Escandallo
                    </Typography>
                  </Box>

                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Typography variant="h5" gutterBottom>
                            Ingrediente
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h5">Peso Bruto</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h5">Peso Neto</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h5">Merma</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h5">Precio x Unidad</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h5">Costo Total</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h5">Costo Ración</Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recipe.recipeIngredients.map((recipeIngredient) => (
                        <TableRow key={recipeIngredient.id}>
                          {/* Ingrediente */}
                          <TableCell>
                            <Typography variant="h5">
                              {recipeIngredient.ingredient.name}
                            </Typography>
                          </TableCell>

                          {/* Peso Bruto */}
                          <TableCell>
                            <Typography variant="h5">
                              {recipeIngredient.grossWeight}{' '}
                              {parseMeassurementTypeToAvrebiation(
                                recipeIngredient.ingredient.meassurementType
                              )}
                            </Typography>
                          </TableCell>

                          {/* Peso Neto */}
                          <TableCell>
                            <Typography variant="h5">
                              {recipeIngredient.netWeight.toFixed(2)}{' '}
                              {parseMeassurementTypeToAvrebiation(
                                recipeIngredient.ingredient.meassurementType
                              )}{' '}
                              | {recipeIngredient.outputPercentage} %
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="h5">
                              {recipeIngredient.waste}{' '}
                              {parseMeassurementTypeToAvrebiation(
                                recipeIngredient.ingredient.meassurementType
                              )}{' '}
                              | {recipeIngredient.wastePercentage} %
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="h5">
                              ${' '}
                              {recipeIngredient.ingredient.unitPrice.toFixed(2)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="h5">
                              $ {recipeIngredient.totalCost.toFixed(2)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="h5">
                              ${' '}
                              {(
                                recipeIngredient.totalCost / recipe.portions
                              ).toFixed(2)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Scrollbar>

              <DialogActions>
                {/* <Button onClick={onEdit}>Editar</Button>
                <Button onClick={onDelete}>Eliminar</Button> */}
                <Button onClick={onClose}>Cerrar</Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default RecipeModal;
