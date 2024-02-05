import React from 'react';
import { Alert, Box, CircularProgress } from '@mui/material';
import { DataGridPremiumProps, GridToolbar } from '@mui/x-data-grid-premium';

import { useReport } from './reducer';

type EntityProps = {
  getReport: (paramsReport: string) => any;
  renderReport: (
    results: any,
    tableProps: Partial<DataGridPremiumProps<any>>
  ) => React.ReactNode;
  beforeRequest?: () => void;
};

function Report({ getReport, renderReport, beforeRequest }: EntityProps) {
  const { loading, loadingError, error, results } = useReport(
    getReport,
    beforeRequest
  );

  const loadingComponent = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h2>Cargando...</h2>
          <CircularProgress
            sx={{
              marginLeft: '10px',
            }}
            size={24}
          />
        </div>
        <img
          alt="loading"
          height={250}
          src="/static/images/jpg/loogking-for-documents.png"
        />
      </Box>
    );
  };

  return (
    <>
      {loadingError && <Alert severity="error">{error}</Alert>}
      <Box sx={{ width: '100%', height: '80vh' }}>
        {renderReport(results, {
          loading,
          rows: results || [],
          density: 'compact',
          disableDensitySelector: true,
          slots: {
            toolbar: GridToolbar,
            loadingOverlay: loadingComponent,
          },
          disableRowSelectionOnClick: true,
          localeText: {
            toolbarFilters: 'Filtros',
            toolbarColumns: 'Columnas',
            toolbarExport: 'Exportar',
            filterPanelAddFilter: 'Agregar filtro',
            filterPanelRemoveAll: 'Remover todos',
            toolbarExportCSV: 'Exportar a CSV',
            toolbarExportExcel: 'Exportar a Excel',
            toolbarExportPrint: 'Imprimir',
            columnMenuShowColumns: 'Mostrar columnas',
            columnMenuLabel: 'Columnas',
            columnsPanelHideAllButton: 'Ocultar todo',
            columnsPanelShowAllButton: 'Mostrar todo',
            columnMenuManageColumns: 'Administrar columnas',
            footerTotalRows: 'Total de Registros:',
          },
        })}
      </Box>
    </>
  );
}

export default Report;
