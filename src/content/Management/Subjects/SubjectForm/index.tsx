import {
  FormikErrors,
  Formik,
  Form,
  FastField as Field,
  FieldProps,
} from 'formik';
import { object, string, number } from 'yup';
import { Box, Grid, TextField, useTheme } from '@mui/material';
import { CreateSubject } from 'src/utils/types';
import { TextsType } from 'src/components/Administration/Router';

const schema = object().shape({
  name: string().required('Este campo es requerido'),
});

const defaultValues: CreateSubject = {
  name: '',
};
export type FormProps = {
  errors: FormikErrors<CreateSubject>;
  setFieldValue: (field: string, value: any) => void;
};

type ParticipantAddressFormProps = {
  renderButtons: () => React.ReactNode;
  onSubmit: (values: any) => void;
  defaultValue?: CreateSubject;
  texts: TextsType;
  sendJustChanged?: boolean;
};

function ParticipantAddressForm({
  renderButtons,
  onSubmit,
  defaultValue = defaultValues,
  sendJustChanged = false,
}: ParticipantAddressFormProps) {
  const theme = useTheme();
  return (
    <>
      <Formik
        initialValues={defaultValue}
        onSubmit={(values) => {
          if (!sendJustChanged) {
            onSubmit(values);
          } else {
            const keys = Object.keys(defaultValue);
            const changedValues = keys.reduce((acc, key) => {
              if (values[key] !== defaultValue[key]) {
                acc[key] = values[key];
              }
              return acc;
            }, {});
            onSubmit(changedValues);
          }
        }}
        validateOnBlur={true}
        validateOnChange={false}
        validationSchema={schema}
      >
        {({ errors, setFieldValue }) => (
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
                      placeholder="Ej. Repostería 1"
                      error={Boolean(errors.name)}
                      helperText={errors.name}
                    />
                  )}
                </Field>
              </Grid>
            </Grid>
            {renderButtons()}
          </Form>
        )}
      </Formik>
    </>
  );
}

export default ParticipantAddressForm;
