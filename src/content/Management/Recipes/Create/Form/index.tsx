import { useState } from 'react';
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

import { CreateRecipe, CreateRecipeIngredient, Recipe } from 'src/utils/types';
import { useApiAuth } from 'src/hooks';
import Cover from './Cover';
import RecipeIngredients from './Ingredients';
import SubjectsField from './SubjectsField';

const EditorWrapper = styled(Box)(
  ({ theme }) => `

    .ql-editor {
      min-height: 40vh;
    }

    .ql-snow .ql-picker {
      color: ${theme.colors.alpha.black[100]};
    }

    .ql-snow .ql-stroke {
      stroke: ${theme.colors.alpha.black[100]};
    }

    .ql-toolbar.ql-snow {
      border-top-left-radius: ${theme.general.borderRadius};
      border-top-right-radius: ${theme.general.borderRadius};
    }

    .ql-toolbar.ql-snow,
    .ql-container.ql-snow {
      border-color: ${theme.colors.alpha.black[30]};
    }

    .ql-container.ql-snow {
      border-bottom-left-radius: ${theme.general.borderRadius};
      border-bottom-right-radius: ${theme.general.borderRadius};
    }

    &:hover {
      .ql-toolbar.ql-snow,
      .ql-container.ql-snow {
        border-color: ${theme.colors.alpha.black[50]};
      }
    }
`
);

const validationSchema = object().shape({
  slug: string().required('El slug es requerido'),
  name: string().required('El nombre es requerido'),
  steps: string().required('Los pasos son requeridos'),
  portions: string()
    .required('Las porciones son requeridas')
    .test('isNumber', 'Las porciones deben ser un número', (value) => {
      return !isNaN(Number(value));
    })
    .test(
      'isGreaterThanZero',
      'Las porciones deben ser mayores a 0',
      (value) => {
        return Number(value) > 0;
      }
    ),
});

const defaultValues: CreateRecipe = {
  slug: '',
  name: '',
  steps: '',
  portions: 0,
  coverImage: '',
  subjectIds: [],
};

const CreateIngredientForm = () => {
  const theme = useTheme();
  const { post } = useApiAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [recipeIngredients, setRecipeIngredients] = useState<
    CreateRecipeIngredient[]
  >([
    {
      grossWeight: 0,
      netWeight: 0,
      waste: 0,
      totalCost: 0,
      ingredientId: 0,
      recipeId: 0,
      output: 0,
    },
    {
      grossWeight: 0,
      netWeight: 0,
      waste: 0,
      totalCost: 0,
      ingredientId: 0,
      recipeId: 0,
      output: 0,
    },
    {
      grossWeight: 0,
      netWeight: 0,
      waste: 0,
      totalCost: 0,
      ingredientId: 0,
      recipeId: 0,
      output: 0,
    },
  ]);

  const updateQuantity = (index: number, quantity: number) => {
    const updatedIngredients = [...recipeIngredients];
    updatedIngredients[index].grossWeight = quantity;
    setRecipeIngredients(updatedIngredients);
  };

  const updateIngredient = (index: number, ingredientId: number) => {
    const updatedIngredients = [...recipeIngredients];
    updatedIngredients[index].ingredientId = ingredientId;
    setRecipeIngredients(updatedIngredients);
  };

  const handleSubmit = async (values: CreateRecipe) => {
    try {
      const newRecipe = await post<Recipe>('/recipes', {
        ...values,
        subjectIds: values.subjectIds?.map((subject) => subject.value),
      });
      for (const recipeIngredient of recipeIngredients) {
        await post('/recipe-ingredients', {
          ...recipeIngredient,
          recipeId: newRecipe.id,
        });
      }
      enqueueSnackbar('Receta creada correctamente', {
        variant: 'success',
      });
      navigate('/management/recipes');
    } catch (error) {
      console.error('error', error);
    }
  };

  return (
    <>
      <Formik
        initialValues={defaultValues}
        onSubmit={(values) => handleSubmit(values)}
        // validateOnBlur={true}
        validationSchema={validationSchema}
      >
        {({ errors, values, setFieldValue }) => (
          <Form>
            <Cover
              name={values.name}
              slug={values.slug}
              coverImageURL={values.coverImage || ''}
              setFieldValue={setFieldValue}
              nameError={Boolean(errors.name)}
              nameHelperText={errors.name}
              slugError={Boolean(errors.slug)}
              slugHelperText={errors.slug}
            />
            <Grid container spacing={0}>
              <RecipeIngredients
                recipeIngredients={recipeIngredients}
                setRecipeIngredients={setRecipeIngredients}
                updateQuantity={updateQuantity}
                updateIngredient={updateIngredient}
              />

              <Grid item xs={12}>
                <Box p={3}>
                  <EditorWrapper>
                    <ReactQuill
                      placeholder="Escribe los pasos de la receta"
                      onChange={(value) => setFieldValue('steps', value)}
                    />
                    <Typography
                      variant="subtitle1"
                      color="error"
                      style={{ display: 'block', marginTop: '10px' }}
                    >
                      {errors.steps}
                    </Typography>
                  </EditorWrapper>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                md={3}
                justifyContent="flex-end"
                textAlign={{ sm: 'right' }}
              >
                <Box
                  pr={3}
                  sx={{
                    pt: `${theme.spacing(2)}`,
                    pb: { xs: 1, md: 0 },
                  }}
                  alignSelf="center"
                >
                  <b>Porciones:</b>
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
              >
                <Field name="portions">
                  {({ field }: FieldProps) => (
                    <TextField
                      {...field}
                      label="Porciones"
                      placeholder="Ej. 2"
                      error={Boolean(errors.portions)}
                      helperText={errors.portions}
                    />
                  )}
                </Field>
              </Grid>

              <Grid
                item
                xs={12}
                sm={4}
                md={3}
                justifyContent="flex-end"
                textAlign={{ sm: 'right' }}
              >
                <Box
                  pr={3}
                  sx={{
                    pt: `${theme.spacing(2)}`,
                    pb: { xs: 1, md: 0 },
                  }}
                  alignSelf="center"
                >
                  <b>Materias:</b>
                </Box>
              </Grid>
              <Grid
                sx={{
                  mb: `${theme.spacing(3)}`,
                }}
                item
                xs={12}
                sm={4}
                md={3}
              >
                <Field name="subjectIds">
                  {({ field }: FieldProps) => (
                    <SubjectsField
                      {...field}
                      setFieldValue={setFieldValue}
                      error={Boolean(errors.portions)}
                      helperText={errors.portions}
                      label="Materias"
                    />
                  )}
                </Field>
              </Grid>

              {/* Submit button */}
              <Grid
                item
                xs={12}
                justifyContent="flex-end"
                textAlign={{ sm: 'right' }}
                mr={3}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<SaveIcon />}
                >
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateIngredientForm;
