import { Position } from "./positions";

export enum IngredientCodes {
  "IN_EXTRA_01" = "IN_EXTRA_01",
  "IN_SNAPS_01" = "IN_SNAPS_01",
  "IN_SNAPS_02" = "IN_SNAPS_02",
  "IN_BAGXX_01" = "IN_BAGXX_01",
  "IN_SKUUL_01" = "IN_SKUUL_01",
  "IN_REGIS_01" = "IN_REGIS_01",
  "IN_REGIS_02" = "IN_REGIS_02",
  "IN_REGIS_03" = "IN_REGIS_03",
  "IN_RESUL_01" = "IN_RESUL_01",
  "IN_RESUL_02" = "IN_RESUL_02",
  "IN_RESUL_03" = "IN_RESUL_03",
  "IN_RESUL_04" = "IN_RESUL_04",
  "IN_RESUL_05" = "IN_RESUL_05",
}

export interface Ingredient {
  id: number;
  code: IngredientCodes;
  name: string;
  description: string;
  isDeleted: boolean;
  deletedAt: null;
  position: Position;
  ranges: Range[];
}

export interface Range {
  id: number;
  isAValueRange: boolean;
  isADateRange: boolean;
  from: number;
  to: number;
  dateFrom: string;
  dateTo: string;
  points: number;
  isActive: boolean;
  assignPoints: boolean;
  isDeleted: boolean;
  deletedAt: string;
  ingredient: Ingredient;
}

export const IngredientCodeExplanation = {
  [IngredientCodes.IN_EXTRA_01]: "Puntos extra",
  [IngredientCodes.IN_SNAPS_01]: "Cargar factura válida",
  [IngredientCodes.IN_SNAPS_02]:
    "Asignar puntos a supervisor, por la factura que el participante cargó",
  [IngredientCodes.IN_BAGXX_01]:
    "Verificar puntos en la bolsa, SIEMPRE va vinculado a IN_SNAPS_01, y va en segundo lugar",
  [IngredientCodes.IN_REGIS_01]:
    "Verifica quién registró un Job Profile, y asigna puntos PENDIENTES a quien lo creó",
  [IngredientCodes.IN_REGIS_02]:
    "Asigna puntos por haber APROBADO y ACTIVADO al participante que registré con su Job Profile",
  [IngredientCodes.IN_REGIS_03]:
    "Asigna puntos a mi supervisor por haber APROBADO y ACTIVADO al participante que registré con su Job Profile",
  [IngredientCodes.IN_RESUL_01]:
    "Objectivo/Resultado, para obtener el cumplimento se divide el resultado para el objetivo y se multiplica por 100",
  [IngredientCodes.IN_RESUL_02]:
    "Mecánica de SOLO RESULTADO, se tomará este resultado y se lo comparará con la tabla de rangos y se asignarán dichos puntos",
  [IngredientCodes.IN_RESUL_03]:
    "Mecánica de SOLO RESULTADO, a diferencia de IN_RESUL_02, en este caso el resultado es comparado con la tabla de rangos, y se MULTIPLICA el resultado para los puntos a asignar",
  [IngredientCodes.IN_RESUL_04]:
    "Mecánica de SOLO RESULTADO, el resultado de este KPI es dividido para el resultado del PADRE, y ese cumplimiento es comparado con la tabla de rangos para asignar los puntos",
  [IngredientCodes.IN_RESUL_05]:
    "Mecánica Objetivo/Resultado, muy similar a IN_RESUL_01, pero en este caso, aunque logre en objetivo, NO se le asignan puntos.",
};
