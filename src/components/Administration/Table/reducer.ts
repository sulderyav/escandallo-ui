import { useReducer, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { object, string, number } from 'yup';
import qs from 'qs';

import { useApiAuth } from '../../../hooks';
import { PaginationMetaDto, QueryParams } from 'src/utils/types';

const defaultQuerySchema = object().shape({
  page: number().min(0),
  size: number().min(5),
  search: string(),
});

export type State = {
  status: 'loading' | 'idle' | 'error';
  entities: any[];
  total: number;
  meta: PaginationMetaDto;
  query: QueryParams;
  error: null | string;
};

type Actions =
  | { type: 'load'; results: any[]; total: number; meta: PaginationMetaDto }
  | {
      type: 'error';
      error: string;
    }
  | {
      type: 'query-update';
      field: keyof State['query'];
      value: any;
    };

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'load':
      return {
        ...state,
        status: 'idle',
        entities: action.results,
        total: action.total,
        meta: action.meta,
      };
    case 'error':
      return { ...state, status: 'error', error: action.error };
    case 'query-update':
      return {
        ...state,
        status: 'loading',
        query: {
          ...state.query,
          [action.field]: action.value,
        },
      };
    default:
      return state;
  }
};

// Get the search portion of the location, validate it
// and return the values if validation is successful
function parseUrlQuery(
  query: string,
  defaultQuery: State['query'],
  // extendQuerySchema: (schema: ObjectSchema) => ObjectSchema
  extendQuerySchema: (schema: any) => any
): State['query'] {
  try {
    const extendedQuerySchema = extendQuerySchema(defaultQuerySchema);
    const fromUrl = extendedQuerySchema.cast(qs.parse(query));
    extendedQuerySchema.validateSync(fromUrl);
    return { ...defaultQuery, ...(fromUrl as State['query']) };
  } catch (e) {
    return defaultQuery;
  }
}

export function useEntitiesTable(
  defaultQuery: State['query'],
  getEntities: (
    query: State['query']
  ) => Promise<{ results: any[]; meta: PaginationMetaDto }>,
  // extendQuerySchema: (query: ObjectSchema) => ObjectSchema
  extendQuerySchema: (query: any) => any
) {
  const { search } = useLocation();
  // const { pathname: url } = useMatch(
  //   '/management/:section/:subsection/:entity/:entityId'
  // );
  const { get } = useApiAuth();
  // const { replace } = useHistory();
  const initialState: State = useMemo(
    () => ({
      status: 'loading',
      total: 0,
      entities: [],
      error: null,
      query: parseUrlQuery(
        search.replace('?', ''),
        defaultQuery,
        extendQuerySchema
      ),
      meta: {
        itemCount: 0,
        totalItems: 0,
        itemsPerPage: 0,
        totalPages: 0,
        currentPage: 0,
        hasNextPage: false,
        hasPreviousPage: false,
        pageCount: 0,
        page: 0,
        take: 0,
      },
    }),
    [defaultQuery, extendQuerySchema, search]
  );
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    async function queryEntities() {
      try {
        const { results, meta } = await getEntities(state.query);
        dispatch({ type: 'load', results, total: meta.itemCount, meta });
        // replace(
        //   `${url}?${qs.stringify(getModifiedFields(state.query, defaultQuery))}`
        // );
      } catch (e) {
        dispatch({ type: 'error', error: e.message });
      }
    }
    queryEntities();
    // }, [defaultQuery, get, getEntities, replace, state.query, url]);
  }, [defaultQuery, get, getEntities, state.query]);
  return {
    loading: state.status === 'loading',
    hasError: state.status === 'error',
    error: state.error,
    entities: state.entities,
    query: state.query,
    total: state.total,
    url: 'abc',
    updateQuery: (field: keyof State['query'], value: any) =>
      dispatch({ type: 'query-update', field, value }),
    meta: state.meta,
  };
}
