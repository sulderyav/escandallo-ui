import { useCallback } from 'react';
import AdministrationTable from '../../../components/Administration/Table';
import queryString from 'query-string';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useApiAuth } from 'src/hooks';
import { User, Page, QueryParams, parseRoleName } from 'src/utils/types';
import { Avatar, Box } from '@mui/material';

const tableColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 50,
  },
  {
    field: 'fullName',
    headerName: 'Nombre',
    flex: 1,
    // Return custom component
    renderCell: (params) => {
      return (
        <Box display="flex">
          <Avatar
            src={params.row.avatar}
            sx={{ width: 24, height: 24, mr: 1 }}
          />
          {params.value}
        </Box>
      );
    },
  },
  {
    field: 'email',
    headerName: 'Correo',
    flex: 1,
  },
  {
    field: 'mobile',
    headerName: 'Celular',
    flex: 1,
  },
  {
    field: 'rol',
    headerName: 'Rol',
    renderCell: (params) => {
      return params.row.roles
        .map((role) => parseRoleName(role.name))
        .join(', ');
    },
    width: 150,
  },
  {
    field: 'isActive',
    headerName: 'Activo',
    renderCell: (params) => {
      return params.value ? 'Si' : 'No';
    },
  },
];

function UsersTable() {
  const { get } = useApiAuth();

  // Important: Use callback here to avoid re renders each time this function gets created again
  const getUsers = useCallback(
    async function (query: QueryParams) {
      const params = {
        ...query,
        order: 'DESC',
        take: 100,
      };
      const nestQuery = queryString.stringify(params);
      const response = await get<User[]>(`/users?${nestQuery}`);

      return {
        results: response,
        meta: {
          page: 1,
          take: 100,
          count: response.length,
          itemCount: response.length,
          pageCount: 1,
          hasPreviousPage: false,
          hasNextPage: false,
        },
      };
    },
    [get]
  );

  return (
    <AdministrationTable
      getEntities={getUsers}
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

export default UsersTable;
