import { format } from "date-fns";
import { StatusTypes } from "./request";
import { TransactionType } from "./transaction";

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
  nowSnaps = "nowSnaps",
  oldSnaps = "oldSnaps",
}

export interface UploadTypes {
  uploadOptions: OptionLabel[];
}

export const uploadTypes: UploadTypes = {
  uploadOptions: [
    { label: "Participantes", value: "participants" },
    { label: "Marcas", value: "brands" },
    { label: "Premios", value: "awards" },
    { label: "Categorias", value: "categories" },
    { label: "Subcategorias", value: "subcategories" },
    { label: "Proveedores", value: "suppliers" },
    { label: "Grupos", value: "groups" },
    { label: "Resultados", value: "results" },
  ],
};

export const requestStatusTypes: OptionLabel[] = [
  { label: "Solicitado", value: StatusTypes.REQUESTED },
  { label: "Pedido", value: StatusTypes.ORDERRED },
  { label: "En Bodega", value: StatusTypes.WAREHOUSE },
  { label: "Novedades", value: StatusTypes.NEWS },
  { label: "Aprobado", value: StatusTypes.APPROVED },
  { label: "Entregado", value: StatusTypes.DELIVERED },
  { label: "Cancelado", value: StatusTypes.CANCELED },
  { label: "Siniestros", value: StatusTypes.SPECIALS },
  { label: "Despachados", value: StatusTypes.DISPATCHED },
];
export interface UploadResponse {
  fileName: string;
  publicURL: string;
}

export enum ResourceToUpdateType {
  MAIN_IMAGE = "mainImage",
}

export const filterTypesParticipants = [
  { label: "Todos", value: "Todos" },
  { label: "Activo", value: "true" },
  { label: "Inactivo", value: "false" },
];

export const filterTypesTransactions = [
  { label: "Todas", value: null },
  { label: "Ingresos", value: TransactionType.INCOME },
  { label: "Egresos", value: TransactionType.EXPENSE },
];

export const filterTypesCatalogueItems = [
  { label: "No Agregados", value: "notInMyCatalogue" },
];

export const filterSnaps = [
  { label: "Facturas Actuales", value: filtersSnaps.nowSnaps },
  { label: "Facturas Antiguas", value: filtersSnaps.oldSnaps },
];

export interface AccountBalanceResponse {
  incomePoints: string;
  expensePoints: string;
}

export enum ToClassification {
  POSITION = "position",
  GROUP = "group",
  SUPERVISOR = "supervisor",
  IDENTIFIER = "identifier",
}

export enum UploadAwardsType {
  MASSIVE = "MASSIVE",
  SPECIAL_SECTION = "SPECIAL_SECTION",
  CATALOGUE_ITEMS = "CATALOGUE_ITEMS",
}

export const UploadAwardsOptions = [
  {
    label: "Carga Masiva",
    value: UploadAwardsType.MASSIVE,
  },
  {
    label: "Carga Especial",
    value: UploadAwardsType.SPECIAL_SECTION,
  },
  {
    label: "Carga Costo Aprobado",
    value: UploadAwardsType.CATALOGUE_ITEMS,
  },
];
