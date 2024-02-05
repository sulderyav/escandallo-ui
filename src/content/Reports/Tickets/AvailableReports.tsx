import React, { FC } from 'react';
import { useTheme } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

import ReportsGrid, {
  AvailableReportsType,
} from 'src/components/Reports/AvailableReports';

type AvailableReportsProps = {
  search: string;
};

const AvailableReports: FC<AvailableReportsProps> = ({ search }) => {
  const theme = useTheme();

  const reports: AvailableReportsType[] = [
    {
      icon: <LanguageIcon fontSize="large" />,
      title: 'Completo',
      redirect: 'complete',
      color: 'warning',
      borderBottomColor: theme.palette.warning.main,
    },
  ];

  return <ReportsGrid search={search} reports={reports} />;
};

export default AvailableReports;
