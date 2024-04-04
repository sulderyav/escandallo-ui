import { Box, Grid } from '@mui/material';

interface EntityDetailLabelProps {
  label: string;
  styles?: any;
}

const EntityDetailLabel = ({ label, styles }: EntityDetailLabelProps) => {
  return (
    <Grid item xs={4} className={styles.labelText}>
      <Box className={styles.box}>{label}:</Box>
    </Grid>
  );
};

export default EntityDetailLabel;
