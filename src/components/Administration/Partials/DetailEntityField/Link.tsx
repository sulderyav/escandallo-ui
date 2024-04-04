import { Grid } from '@mui/material';

interface EntityDetailLinkProps {
  link: string;
}

const EntityDetailLink = ({ link }: EntityDetailLinkProps) => {
  return (
    <Grid>
      <a href={link} target="_blank" rel="noopener noreferrer">
        {link}
      </a>
    </Grid>
  );
};

export default EntityDetailLink;
