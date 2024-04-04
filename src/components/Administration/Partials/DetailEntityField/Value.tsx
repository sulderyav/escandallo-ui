import { Grid } from '@mui/material';

interface EntityDetailValueProps {
  value: any;
  styles?: any;
}

const EntityDetailValue = ({ value, styles }: EntityDetailValueProps) => {
  return (
    <Grid item xs={8}>
      {value || 'N/A'}
    </Grid>
  );
};

export default EntityDetailValue;
