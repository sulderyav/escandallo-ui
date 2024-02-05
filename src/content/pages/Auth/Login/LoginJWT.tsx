import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button, TextField, CircularProgress } from '@mui/material';

import useAuth from 'src/hooks/useAuth';
import useRefMounted from 'src/hooks/useRefMounted';

function LoginJWT() {
  const { login } = useAuth() as any;
  const isMountedRef = useRefMounted();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Debe ser un correo válido')
          .max(255)
          .required('El correo es requerido'),
        password: Yup.string().max(255).required('La contraseña es requerida'),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await login(values.email, values.password);

          if (isMountedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
          }
        } catch (err) {
          console.error(err);
          if (isMountedRef.current) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            margin="normal"
            helperText={touched.email && errors.email}
            label="Correo"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
            placeholder="Ej: john.doe@email.com"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            margin="normal"
            helperText={touched.password && errors.password}
            // label={'Password'}
            label="Contraseña"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          {/* <Box
            alignItems="center"
            display="flex"
            justifyContent="space-between"
          >
            <Link component={RouterLink} to="/recover-password">
              <b>{'Olvidaste tu contraseña?'}</b>
            </Link>
          </Box> */}

          <Button
            sx={{ mt: 3 }}
            color="primary"
            startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
            disabled={isSubmitting}
            type="submit"
            fullWidth
            size="large"
            variant="contained"
          >
            Ingresar
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default LoginJWT;
