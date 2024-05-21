import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { format } from 'date-fns';

import Entity from 'src/components/Administration/Entity';
import { TextsType } from 'src/components/Administration/Router';
import { useApiAuth } from 'src/hooks';
import { User as UserType, parseRoleName } from 'src/utils/types';

function User({
  onDeleteSuccess,
  texts,
}: {
  onDeleteSuccess: (message: string) => void;
  texts: TextsType;
}) {
  const { get, delete: del } = useApiAuth();

  async function getUser(id: string) {
    return await get(`/users/${id}`);
  }

  async function deleteUsers(id: string) {
    await del(`/users/${id}`);
  }

  return (
    <Entity
      getEntity={getUser}
      deleteEntity={deleteUsers}
      renderEntity={(subject: UserType, styles, renderButtons) => (
        <>
          <Grid container className={styles.gridContainer} spacing={3}>
            <Grid item xs={12} className={styles.gridItem}>
              <Card>
                <CardContent className={styles.cardContent}>
                  <Typography variant="subtitle2">
                    <Grid container spacing={0}>
                      <Grid item xs={4} className={styles.labelText}>
                        <Box className={styles.box}>ID:</Box>
                      </Grid>
                      <Grid item xs={8}>
                        {subject.id}
                      </Grid>

                      <Grid item xs={4} className={styles.labelText}>
                        <Box className={styles.box}>Nombre:</Box>
                      </Grid>
                      <Grid item xs={8} className={styles.boldText}>
                        {subject.firstName || 'N/A'}
                      </Grid>

                      <Grid item xs={4} className={styles.labelText}>
                        <Box className={styles.box}>Apellido:</Box>
                      </Grid>
                      <Grid item xs={8} className={styles.boldText}>
                        {subject.lastName || 'N/A'}
                      </Grid>

                      <Grid item xs={4} className={styles.labelText}>
                        <Box className={styles.box}>Usuario:</Box>
                      </Grid>
                      <Grid item xs={8} className={styles.boldText}>
                        {subject.username || 'N/A'}
                      </Grid>

                      <Grid item xs={4} className={styles.labelText}>
                        <Box className={styles.box}>Rol:</Box>
                      </Grid>
                      <Grid item xs={8}>
                        {subject.roles.map((role) =>
                          parseRoleName(role.name)
                        ) || 'N/A'}
                      </Grid>

                      <Grid item xs={4} className={styles.labelText}>
                        <Box className={styles.box}>Correo:</Box>
                      </Grid>
                      <Grid item xs={8}>
                        {subject.email || 'N/A'}
                      </Grid>

                      <Grid item xs={4} className={styles.labelText}>
                        <Box className={styles.box}>Celular:</Box>
                      </Grid>
                      <Grid item xs={8}>
                        {subject.mobile || 'N/A'}
                      </Grid>

                      <Grid item xs={4} className={styles.labelText}>
                        <Box className={styles.box}>¿Activo?:</Box>
                      </Grid>
                      <Grid item xs={8}>
                        {subject.isActive ? 'SI' : 'NO' || 'N/A'}
                      </Grid>

                      <Grid item xs={4} className={styles.labelText}>
                        <Box className={styles.box}>Fecha Creación:</Box>
                      </Grid>
                      <Grid item xs={8}>
                        {format(
                          new Date(subject.createdAt),
                          'dd/MM/yyyy HH:mm'
                        ) || 'N/A'}
                      </Grid>
                    </Grid>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Box sx={{ mt: 1 }}>{renderButtons()}</Box>
        </>
      )}
      texts={texts}
      onDeleteSuccess={onDeleteSuccess}
    />
  );
}

export default User;
