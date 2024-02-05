import React, { FC, useEffect } from 'react';
import queryString from 'query-string';

import { useApiAuth } from 'src/hooks';
import Report from 'src/components/Reports/Report';
import CompleteReport from './reports/Complete';
import { generalConfig } from 'src/config';

type ReportNames = 'complete';

function ParticipantsReport() {
  const { get } = useApiAuth();

  async function getReport(paramsReport: ReportNames) {
    const params = {
      ...queryString.parse(window.location.search),
      tenantId: generalConfig.tenant.id,
    };
    const query = queryString.stringify(params);
    const reponse = await get(
      `/reports/tickets${parseReportName(paramsReport)}?${query}`
    );
    return reponse;
  }

  // Get last value of path
  const reportName = window.location.pathname.split('/').pop();

  return (
    <Report
      getReport={getReport}
      renderReport={(results, tableProps) =>
        selectReport(reportName as ReportNames, tableProps)
      }
    />
  );
}

const parseReportName = (name: ReportNames) => {
  switch (name) {
    case 'complete':
      return '';
    default:
      return '';
  }
};

const selectReport = (
  reportName: ReportNames,
  tableProps: any
): React.ReactNode => {
  switch (reportName) {
    case 'complete':
      return <CompleteReport tableProps={tableProps} />;
    default:
      return (
        <div>
          <h1>Lo sentimos, no se encontró el reporte.</h1>
        </div>
      );
  }
};

export default ParticipantsReport;
