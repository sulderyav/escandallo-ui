export interface OptionLabel {
  label: string;
  value: any;
}

export class PaginationMetaDto {
  readonly page: number;
  readonly take: number;
  readonly itemCount: number;
  readonly pageCount: number;
  readonly hasPreviousPage: boolean;
  readonly hasNextPage: boolean;
}

export class Page<T> {
  readonly data: T[];
  readonly meta: PaginationMetaDto;
}

export interface QueryParams {
  page: number;
  take: number;
  [key: string]: any;
}

export type SizeType = {
  width: number;
  height: number;
};

export type HandleChangeType = {
  e: React.ChangeEvent<HTMLInputElement>;
  location: string;
  size?: SizeType;
};

export enum filtersSnaps {
  nowSnaps = 'nowSnaps',
  oldSnaps = 'oldSnaps',
}

export interface UploadTypes {
  uploadOptions: OptionLabel[];
}

export interface UploadResponse {
  fileName: string;
  publicURL: string;
}

export enum ResourceToUpdateType {
  MAIN_IMAGE = 'mainImage',
}

export interface AccountBalanceResponse {
  incomePoints: string;
  expensePoints: string;
}
