import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { format } from 'date-fns';

import Entity from 'src/components/Administration/Entity';
import { TextsType } from 'src/components/Administration/Router';
import { useApiAuth } from 'src/hooks';
import { Level as LevelType } from 'src/utils/types';

function Level({
  onDeleteSuccess,
  texts,
}: {
  onDeleteSuccess: (message: string) => void;
  texts: TextsType;
}) {
  const { get, delete: del } = useApiAuth();

  async function getLevel(id: string) {
    return await get(`/levels/${id}`);
  }

  async function deleteLevel(id: string) {
    await del(`/levels/${id}`);
  }

  return (
    <Entity
      getEntity={getLevel}
      deleteEntity={deleteLevel}
      renderEntity={(subject: LevelType, styles, renderButtons) => (
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
                        {subject.name || 'N/A'}
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

export default Level;
