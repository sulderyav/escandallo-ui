import React, { FC, useState } from 'react';
import {
  Box,
  Typography,
  Tooltip,
  IconButton,
  TextField,
  CircularProgress,
  Autocomplete,
  Button,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import { useNavigate } from 'react-router-dom';

import useRecipeSelector from './useRecipeSelector';
import { OptionLabel, Recipe } from 'src/utils/types';

interface RecipeCoverProps {
  selectRecipe: (recipeId: number) => void;
  setPax: (pax: number) => void;
}

const RecipeCover: FC<RecipeCoverProps> = ({
  selectRecipe,
  setPax: setPax1,
}) => {
  const [pax, setPax] = useState<number>(0);
  const navigate = useNavigate();
  const { recipeOptions } = useRecipeSelector();
  const [open, setOpen] = useState(false);
  const loading = open && recipeOptions.length === 0;

  const handleBack = (): void => {
    return navigate(`/management/recipes`);
  };

  return (
    <>
      <Box display="flex" pt={3} mb={3}>
        <Tooltip arrow placement="top" title="Regresar">
          <IconButton
            onClick={handleBack}
            color="primary"
            sx={{
              p: 2,
              mr: 2,
            }}
          >
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Receta:
              <Autocomplete
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                onChange={(_, recipe: OptionLabel) =>
                  selectRecipe(recipe.value)
                }
                sx={{
                  ml: 2,
                }}
                fullWidth
                getOptionLabel={(option: OptionLabel) => `${option.label}`}
                options={recipeOptions}
                loading={loading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Receta"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
              <TextField
                label="Porciones"
                placeholder="Selecciona una receta"
                type="number"
                sx={{ ml: 2 }}
                value={pax || ''}
                onChange={(e) => setPax(parseInt(e.target.value))}
              />
              <Button
                sx={{ ml: 2 }}
                variant="contained"
                onClick={() => {
                  setPax(pax);
                  setPax1(pax);
                }}
                disabled={!pax}
              >
                Calcular
              </Button>
            </Box>
          </Typography>
          <Typography variant="subtitle2">
            Selecciona una receta para poder realizar el cálculo del escandallo
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default RecipeCover;
