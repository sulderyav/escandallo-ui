import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { Card, styled } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import Text from 'src/components/Text';

const CardBorderBottom = styled(Card)(
  () => `
    border-bottom: transparent 5px solid;
  `
);

export type AvailableReportsType = {
  icon: React.ReactNode;
  title: string;
  redirect: string;
  color:
    | 'black'
    | 'warning'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'success'
    | 'info';
  borderBottomColor: string;
};

type AdministrationTableProps = {
  reports: AvailableReportsType[];
  search?: string;
};

function AvailableReports({
  reports: wholeReports,
  search,
}: AdministrationTableProps) {
  const reports: AvailableReportsType[] = wholeReports.filter((report) => {
    if (!search || search === '') return true;
    return report.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <Box>
      <Grid container spacing={1}>
        {reports.map((report, index) => (
          <Grid item xs={12} sm={6} md={2} key={index}>
            <Button fullWidth component={RouterLink} to={report.redirect}>
              <CardBorderBottom
                sx={{
                  borderBottomColor: `${report.borderBottomColor}`,
                  py: 3,
                  textAlign: 'center',
                  width: '100%',
                }}
              >
                <Text color={report.color}>{report.icon}</Text>
                <Box mt={0.5}>
                  <Typography component="span" variant="h4">
                    {report.title}
                  </Typography>{' '}
                </Box>
              </CardBorderBottom>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default AvailableReports;
