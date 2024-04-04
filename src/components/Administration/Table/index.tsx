import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { debounce } from 'lodash';
import { Theme } from '@mui/material/styles';
import {
  InputAdornment,
  TextField,
  IconButton,
  Pagination,
  Box,
  Stack,
  MenuItem,
  Typography,
  Tooltip,
} from '@mui/material';
import { Edit, Search, ZoomIn } from '@mui/icons-material';
import { GridColDef, GridLocaleText } from '@mui/x-data-grid';
import { useLocation, useNavigate } from 'react-router-dom';

import { PaginationMetaDto, QueryParams } from 'src/utils/types';
import { useEntitiesTable, State } from './reducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableContainer: {
      display: 'flex',
      justifySelf: 'stretch',
      flexDirection: 'column',
      // Avoid paper style on contained tables
      '& > .MuiPaper-root': {
        boxShadow: 'none',
      },
    },
    table: {
      boxShadow: 'none',
    },
    formControl: {
      marginRight: theme.spacing(2),
      minWidth: 120,
    },
    search: {
      minWidth: 160,
    },
    filters: {
      display: 'flex',
      paddingBottom: 0,
      marginBottom: theme.spacing(1),
    },
    spacer: {
      flexGrow: 1,
    },
  })
);

const basicDefaultQuery: QueryParams = {
  page: 1,
  take: 50,
};

type TableProps = {
  isLoading: boolean;
  data: any[];
  options: any;
  localeText?: Partial<GridLocaleText>;
  rowCount: number;
  columns: GridColDef<any>[];
  hideFooter?: boolean;
};

type AdministrationTableProps = {
  defaultQuery?: State['query'];
  getEntities: (
    query: State['query']
  ) => Promise<{ results: any[]; meta: PaginationMetaDto }>;
  // extendQuerySchema?: (querySchema: ObjectSchema) => ObjectSchema;
  extendQuerySchema?: (querySchema: any) => any;
  renderExtraFilters?: (
    query: State['query'],
    updateQuery: (field: keyof State['query'], value: any) => void
  ) => React.ReactNode;
  renderTable: (props: TableProps) => React.ReactNode;
  columns: GridColDef<any>[];
};

function AdministrationTable({
  defaultQuery = basicDefaultQuery,
  getEntities,
  extendQuerySchema = (query) => query,
  renderExtraFilters = () => null,
  renderTable,
  columns,
}: AdministrationTableProps) {
  const styles = useStyles();
  const { loading, entities, updateQuery, query, total, url, meta } =
    useEntitiesTable(defaultQuery, getEntities, extendQuerySchema);
  const debouncedUpdateSearch = React.useCallback(
    debounce((search: string) => updateQuery('toSearch', search), 300),
    []
  );
  const { pathname: path } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= meta.pageCount) updateQuery('page', page);
  };

  const handlePageSizeChange = (pageSize: number) => {
    updateQuery('take', pageSize);
  };

  return (
    <Box>
      <div className={styles.filters}>
        {/* {renderExtraFilters(query, updateQuery)} */}
        {/* <div className={styles.spacer} />
        <TextField
          className={styles.search}
          variant="outlined"
          label="Buscar"
          defaultValue={query.search}
          onChange={(e) => debouncedUpdateSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        /> */}
      </div>
      {renderTable({
        hideFooter: true,
        isLoading: loading,
        data: entities,
        options: {
          toolbar: false,
          actionsColumnIndex: 10,
          paging: false,
        },
        localeText: {
          columnMenuManageColumns: 'Columnas',
        },
        rowCount: meta.itemCount,
        columns: [
          ...columns,
          {
            field: 'actions',
            headerName: 'Acciones',
            sortable: false,
            width: 100,
            align: 'center',
            renderCell: (data: any) => {
              return (
                <>
                  <Tooltip title="Ver detalle" placement="top" arrow>
                    <IconButton
                      onClick={() =>
                        navigate(
                          `${path.split('/').slice(0, -1).join('/')}/${
                            data.row.id
                          }`
                        )
                      }
                    >
                      <ZoomIn />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar" placement="top" arrow>
                    <IconButton
                      onClick={() =>
                        navigate(
                          `${path.split('/').slice(0, -1).join('/')}/${
                            data.row.id
                          }/edit`
                        )
                      }
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                </>
              );
            },
          },
        ],
      })}

      {/* Pagination */}
      <Box p={2} display="flex" justifyContent="center" alignItems="center">
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography
            sx={{
              mr: 1,
            }}
          >
            Registros por página:{' '}
          </Typography>
          <TextField
            select
            variant="standard"
            value={meta.take || 50}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          >
            {[10, 20, 50, 100].map((size) => (
              <MenuItem key={size} value={`${size}`}>
                {size}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Stack spacing={2}>
          <Pagination
            count={meta.pageCount}
            showFirstButton
            showLastButton
            onChange={(e, page) => handlePageChange(page)}
            page={meta.page}
          />
        </Stack>
        <Box>
          <Typography
            sx={{
              ml: 1,
            }}
          >
            {(meta.page - 1) * meta.take + 1} -{' '}
            {Math.min(meta.page * meta.take, meta.itemCount)} de
            {meta.itemCount}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default AdministrationTable;
