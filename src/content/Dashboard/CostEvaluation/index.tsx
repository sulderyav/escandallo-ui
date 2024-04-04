import { useCallback, useState } from 'react';
import { Formik, Form, FastField as Field, FieldProps } from 'formik';
import { object, string } from 'yup';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { Recipe } from 'src/utils/types';
import { useApiAuth } from 'src/hooks';
import Cover from './Cover';
import { useRecipe } from './reducer';

const CreateIngredientForm = () => {
  const [recipeId, setRecipeId] = useState<number>(null);
  const { get } = useApiAuth();
  const getRecipe = useCallback(async () => {
    return await get<Recipe>(`/recipes/${recipeId}`);
  }, [recipeId]);
  const { value, error } = useRecipe(getRecipe, !!recipeId);

  return (
    <>
      <Cover selectRecipe={(recipe) => setRecipeId(recipe)} />
    </>
  );
};

export default CreateIngredientForm;
