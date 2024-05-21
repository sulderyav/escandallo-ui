import {
  FormikErrors,
  Formik,
  Form,
  FastField as Field,
  FieldProps,
} from 'formik';
import { object, string, number } from 'yup';
import { Grid, TextField, useTheme } from '@mui/material';

import { CreateUser } from 'src/utils/types';
import { TextsType } from 'src/components/Administration/Router';
import RolesField from './RolesField';
import LevelsField from './LevelsField';

const schema = object().shape({
  username: string().required('El nombre de usuario es requerido'),
  email: string()
    .email('Correo electrónico inválido')
    .required('El correo electrónico es requerido'),
  mobile: string()
    .matches(
      /^(\+?56)?(\s?)(0?9)(\s?)[9876543]\d{7}$/,
      'Número de teléfono inválido'
    )
    .required('El número de teléfono es requerido'),
  firstName: string().required('El nombre es requerido'),
  lastName: string().required('El apellido es requerido'),
  // RoleIds is required in the RolesField component, and its array should not be empty
  roleIds: number()
    .required('El rol es requerido')
    .min(1, 'El rol es requerido'),
  password: string().required('La contraseña es requerida'),
});

const defaultValues: CreateUser = {
  avatar: '',
  email: '',
  firstName: '',
  lastName: '',
  mobile: '',
  isActive: true,
  roleIds: [],
  levelIds: [],
  username: '',
  password: '',
};
export type FormProps = {
  errors: FormikErrors<CreateUser>;
  setFieldValue: (field: string, value: any) => void;
};

type ParticipantAddressFormProps = {
  renderButtons: () => React.ReactNode;
  onSubmit: (values: any) => void;
  defaultValue?: CreateUser;
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
        onSubmit={(values: CreateUser) => {
          if (!sendJustChanged) {
            // onSubmit(values);
            // Send only non-null values and non-empty values
            const nonEmptyValues = Object.keys(values).reduce((acc, key) => {
              if (values[key] !== '' && values[key] !== null) {
                acc[key] = values[key];
              }
              return acc;
            }, {});
            onSubmit(nonEmptyValues);
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
        validateOnChange={true}
        validationSchema={schema}
      >
        {({ errors, setFieldValue, touched, handleBlur, values }) => (
          <Form>
            <Grid container spacing={3}>
              {/* <Grid item xs={12} lg={7}> */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Field name="username">
                      {({ field }: FieldProps) => (
                        <TextField
                          {...field}
                          label="Nombre de usuario"
                          placeholder="john.doe"
                          fullWidth
                          error={Boolean(touched.username && errors.username)}
                          helperText={touched.username && errors.username}
                          autoComplete="username"
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field name="firstName">
                      {({ field }: FieldProps) => (
                        <TextField
                          {...field}
                          error={Boolean(touched.firstName && errors.firstName)}
                          fullWidth
                          helperText={touched.firstName && errors.firstName}
                          label="Nombre"
                          placeholder="John"
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field name="lastName">
                      {({ field }: FieldProps) => (
                        <TextField
                          {...field}
                          error={Boolean(touched.lastName && errors.lastName)}
                          fullWidth
                          helperText={touched.lastName && errors.lastName}
                          label="Apellido"
                          placeholder="Doe"
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="email">
                      {({ field }: FieldProps) => (
                        <TextField
                          {...field}
                          error={Boolean(touched.email && errors.email)}
                          fullWidth
                          helperText={touched.email && errors.email}
                          label="Correo electrónico"
                          placeholder="john.doe@email.com"
                          autoComplete="email"
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="password">
                      {({ field }: FieldProps) => (
                        <TextField
                          {...field}
                          error={Boolean(touched.password && errors.password)}
                          fullWidth
                          helperText={touched.password && errors.password}
                          label="Contraseña"
                          placeholder="********"
                          type="password"
                          autoComplete="current-password"
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="mobile">
                      {({ field }: FieldProps) => (
                        <TextField
                          {...field}
                          error={Boolean(touched.mobile && errors.mobile)}
                          fullWidth
                          helperText={touched.mobile && errors.mobile}
                          label="Celular"
                          placeholder="0998XXXXXX"
                          type="tel"
                          autoComplete="tel-national"
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <RolesField
                      setFieldValue={setFieldValue}
                      value={values.roleIds}
                      errors={errors}
                      touched={touched}
                    />
                  </Grid>
                  {/* {values.roleIds.includes(12) && ( */}
                  <Grid item xs={12} md={6}>
                    <LevelsField
                      setFieldValue={setFieldValue}
                      value={values.levelIds}
                      errors={errors}
                      touched={touched}
                    />
                  </Grid>
                  {/* )} */}
                </Grid>
              </Grid>
              {/* <Grid item xs={12} lg={5} justifyContent="center">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                  mt={3}
                >
                  <AvatarWrapper>
                    <Avatar
                      variant="rounded"
                      alt={user.name}
                      src={user.avatar}
                    />
                    <ButtonUploadWrapper>
                      <Input
                        accept="image/*"
                        id="icon-button-file"
                        name="icon-button-file"
                        type="file"
                      />
                      <label htmlFor="icon-button-file">
                        <IconButton component="span" color="primary">
                          <CloudUploadTwoToneIcon />
                        </IconButton>
                      </label>
                    </ButtonUploadWrapper>
                  </AvatarWrapper>
                  <Divider
                    flexItem
                    sx={{
                      m: 4,
                    }}
                  />
                  <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        pb: 1,
                      }}
                    >
                      {t('Public Profile')}
                    </Typography>
                    <Switch
                      checked={publicProfile.public}
                      onChange={handlePublicProfile}
                      name="public"
                      color="primary"
                    />
                  </Box>
                </Box>
              </Grid> */}
            </Grid>
            {renderButtons()}
          </Form>
        )}
      </Formik>
    </>
  );
}

export default ParticipantAddressForm;
