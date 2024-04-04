import React, { FC, useState } from 'react';
import {
  Box,
  Typography,
  Tooltip,
  IconButton,
  TextField,
  CircularProgress,
  Autocomplete,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import { useNavigate } from 'react-router-dom';

import useRecipeSelector from './useRecipeSelector';
import { OptionLabel, Recipe } from 'src/utils/types';

interface RecipeCoverProps {
  selectRecipe: (recipeId: number) => void;
}

const RecipeCover: FC<RecipeCoverProps> = ({ selectRecipe }) => {
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
                    // label={label}
                    label="Receta"
                    // placeholder={placeholder}
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
                // error={nameError}
                // helperText={nameHelperText}
                // value={slug}
                // onChange={(e) => setFieldValue('slug', e.target.value)}
              />
            </Box>
          </Typography>
          <Typography variant="subtitle2">
            Crea una nueva receta para tu repositorio
          </Typography>
        </Box>
      </Box>

      {/* <CardCover>
        <CardMedia image={coverImageURL} component="img" />
        <CardCoverAction>
          <Input
            accept="image/*"
            id="change-cover"
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) handleFileUpload(file);
            }}
          />
          <label htmlFor="change-cover">
            <Button
              startIcon={
                uploadingCoverImage ? (
                  <CircularProgress size={20} />
                ) : (
                  <UploadTwoToneIcon />
                )
              }
              variant="contained"
              component="span"
            >
              Actualizar portada
            </Button>
          </label>
        </CardCoverAction>
      </CardCover> */}
    </>
  );
};

export default RecipeCover;
