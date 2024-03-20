import {
  FormikErrors,
  Formik,
  Form,
  FastField as Field,
  FieldProps,
} from 'formik';
import { object, string } from 'yup';
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useTheme,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import {
  CreateIngredient,
  MeassurementType,
  parseMeassurementTypeToLabel,
} from 'src/utils/types';
import { useApiAuth } from 'src/hooks';

const validationSchema = object().shape({
  slug: string().required('El slug es requerido'),
  name: string().required('El nombre es requerido'),
  meassurementType: string().required('El tipo de medida es requerido'),
  // cost: string().required('El costo es requerido'),
  // Cost is required but it's a number, it has to be positive
  cost: string()
    .required('El costo es requerido')
    .matches(/^[0-9]*[.]?[0-9]*$/, 'El costo debe ser un número positivo'),
});

const defaultValues: CreateIngredient = {
  slug: '',
  name: '',
  meassurementType: '',
  cost: 0,
  description: '',
};

const CreateIngredientForm = () => {
  const theme = useTheme();
  const { post } = useApiAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = async (values: CreateIngredient) => {
    try {
      await post('/ingredients', values);
      enqueueSnackbar('Ingrediente creado correctamente', {
        variant: 'success',
      });
      navigate('/management/ingredients');
    } catch (error) {
      console.error('error', error);
    }
  };

  return (
    <>
      <Formik
        initialValues={defaultValues}
        onSubmit={(values) => handleSubmit(values)}
        validateOnBlur={true}
        validateOnChange={false}
        validationSchema={validationSchema}
      >
        {({ errors, values }) => (
          <Form>
            <Grid container spacing={0}>
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
                  <b>Slug:</b>
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
                <Field name="slug">
                  {({ field }: FieldProps) => (
                    <TextField
                      {...field}
                      label="Slug"
                      placeholder="Ej. pimienta-cayena"
                      error={Boolean(errors.slug)}
                      helperText={errors.slug}
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
                  <b>Nombre:</b>
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
                <Field name="name">
                  {({ field }: FieldProps) => (
                    <TextField
                      {...field}
                      label="Nombre"
                      placeholder="Ej. Pimienta Cayena"
                      error={Boolean(errors.name)}
                      helperText={errors.name}
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
                  <b>Descripción:</b>
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
                <Field name="description">
                  {({ field }: FieldProps) => (
                    <TextField
                      {...field}
                      label="Descripción"
                      placeholder="Ej. Sabor potente y picante"
                      error={Boolean(errors.description)}
                      helperText={errors.description}
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
                  <b>Tipo de Medida:</b>
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
                <Field name="meassurementType">
                  {({ field }: FieldProps) => (
                    <>
                      {/* <InputLabel id="meassurement-type-selectore"> */}
                      {/* Age */}
                      {/* </InputLabel> */}
                      <Select
                        {...field}
                        labelId="meassurement-type-selectore"
                        id="meassurement-type-selectore"
                        autoWidth
                      >
                        <MenuItem value={MeassurementType.GRAM}>
                          {parseMeassurementTypeToLabel(MeassurementType.GRAM)}
                        </MenuItem>
                        <MenuItem value={MeassurementType.KILOGRAM}>
                          {parseMeassurementTypeToLabel(
                            MeassurementType.KILOGRAM
                          )}
                        </MenuItem>
                        <MenuItem value={MeassurementType.LITER}>
                          {parseMeassurementTypeToLabel(MeassurementType.LITER)}
                        </MenuItem>
                        <MenuItem value={MeassurementType.MILLILITER}>
                          {parseMeassurementTypeToLabel(
                            MeassurementType.MILLILITER
                          )}
                        </MenuItem>
                        <MenuItem value={MeassurementType.PIECE}>
                          {parseMeassurementTypeToLabel(MeassurementType.PIECE)}
                        </MenuItem>
                      </Select>
                    </>
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
                  <b>
                    Costo
                    {values.meassurementType &&
                      ` x ${parseMeassurementTypeToLabel(
                        values.meassurementType as MeassurementType
                      )}`}
                    :
                  </b>
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
                <Field name="cost">
                  {({ field }: FieldProps) => (
                    <TextField
                      {...field}
                      label="Costo"
                      placeholder="Ej. 13.23"
                      error={Boolean(errors.cost)}
                      helperText={errors.cost}
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
