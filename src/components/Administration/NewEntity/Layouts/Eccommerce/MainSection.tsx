import React from 'react';
import { Card, Grid } from '@mui/material';

const MainSection = ({ children }) => {
  return (
    <Card
      sx={{
        p: 3,
      }}
    >
      <Grid container spacing={3}>
        {children}
      </Grid>
    </Card>
  );
};

export default MainSection;
