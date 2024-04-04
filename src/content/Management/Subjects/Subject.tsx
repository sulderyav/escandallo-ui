import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { format } from 'date-fns';

import Entity from 'src/components/Administration/Entity';
import { TextsType } from 'src/components/Administration/Router';
import { useApiAuth } from 'src/hooks';
import { Subject as SubjectType } from 'src/utils/types';

function Subject({
  onDeleteSuccess,
  texts,
}: {
  onDeleteSuccess: (message: string) => void;
  texts: TextsType;
}) {
  const { get, delete: del } = useApiAuth();

  async function getSubject(id: string) {
    return await get(`/subjects/${id}`);
  }

  async function deleteSubject(id: string) {
    await del(`/subjects/${id}`);
  }

  return (
    <Entity
      getEntity={getSubject}
      deleteEntity={deleteSubject}
      renderEntity={(subject: SubjectType, styles, renderButtons) => (
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
                      <Grid item xs={8} className={styles.boldText}>
                        {subject.id}
                      </Grid>
                      <Grid item xs={4} className={styles.labelText}>
                        <Box className={styles.box}>Nombre:</Box>
                      </Grid>
                      <Grid item xs={8}>
                        {subject.name || 'N/A'}
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

export default Subject;
