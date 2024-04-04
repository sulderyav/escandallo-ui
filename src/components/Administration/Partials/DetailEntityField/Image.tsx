import { Grid } from '@mui/material';

interface EntityDetailImageProps {
  image: string;
}

const EntityDetailImage = ({ image }: EntityDetailImageProps) => {
  return (
    <Grid item xs={8}>
      <img src={image} alt="imagen" width="110" height="100" />
    </Grid>
  );
};

export default EntityDetailImage;
