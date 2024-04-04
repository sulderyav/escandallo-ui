import { useCallback } from 'react';
import AdministrationTable from '../../../components/Administration/Table';
import queryString from 'query-string';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { useApiAuth } from 'src/hooks';
import { Subject, Page, QueryParams } from 'src/utils/types';

const tableColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 50,
  },
  {
    field: 'name',
    headerName: 'Materia',
    flex: 1,
  },
];

function SubjectsTable() {
  const { get } = useApiAuth();

  // Important: Use callback here to avoid re renders each time this function gets created again
  const getSubjects = useCallback(
    async function (query: QueryParams) {
      const params = {
        ...query,
        order: 'DESC',
      };
      const nestQuery = queryString.stringify(params);
      const response = await get<Page<Subject>>(`/subjects?${nestQuery}`);

      return { results: response.data, meta: response.meta };
    },
    [get]
  );

  return (
    <AdministrationTable
      getEntities={getSubjects}
      // extendQuerySchema={extendQuerySchema}
      // renderExtraFilters={(query, updateQuery) => (
      //   <TextField
      //     select
      //     variant="outlined"
      //     label="Tipo"
      //     className={styles.typeSelector}
      //     value={query.tipo}
      //     onChange={(e) => updateQuery('tipo', e.target.value)}
      //   >
      //     <MenuItem value="">Todos</MenuItem>
      //     <MenuItem value="Leads de ventas">Leads de ventas</MenuItem>
      //     <MenuItem value="Leads de postventa">Leads de postventa</MenuItem>
      //     <MenuItem value="Leads de fidelización">
      //       Leads de Fidelización
      //     </MenuItem>
      //   </TextField>
      // )}
      renderTable={(tableProps) => {
        return (
          <DataGrid
            {...tableProps}
            density="compact"
            rows={tableProps.data}
            columns={tableProps.columns}
            rowSelection={false}
          />
        );
      }}
      columns={tableColumns}
    />
  );
}

export default SubjectsTable;
