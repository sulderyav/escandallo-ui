import { useCallback } from 'react';
import AdministrationTable from '../../../components/Administration/Table';
import queryString from 'query-string';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useApiAuth } from 'src/hooks';
import { Level, Page, QueryParams } from 'src/utils/types';

const tableColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 50,
  },
  {
    field: 'name',
    headerName: 'Nivel',
    flex: 1,
  },
];

function SubjectsTable() {
  const { get } = useApiAuth();

  // Important: Use callback here to avoid re renders each time this function gets created again
  const getLevels = useCallback(
    async function (query: QueryParams) {
      const params = {
        ...query,
        order: 'DESC',
        take: 100,
      };
      const nestQuery = queryString.stringify(params);
      const response = await get<Page<Level>>(`/levels?${nestQuery}`);

      return { results: response.data, meta: response.meta };
    },
    [get]
  );

  return (
    <AdministrationTable
      getEntities={getLevels}
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
