export interface Task {
  id: number;
  type: TaskType;
  status: TaskStatus;
  filePath: string;
  errorsFilePath: null | string;
  createdAt: string;
  updatedAt: string;
  data: {
    code: string;
    entityId: number;
    participantId: number;
    positionId: number;
  };
}

export enum TaskType {
  UPLOAD_PARTICIPANTS = "UPLOAD_PARTICIPANTS",
  UPLOAD_CATEGORIES = "UPLOAD_CATEGORIES",
  UPLOAD_SUBCATEGORIES = "UPLOAD_SUBCATEGORIES",
  UPLOAD_BRANDS = "UPLOAD_BRANDS",
  UPLOAD_AWARDS = "UPLOAD_AWARDS",
  UPLOAD_SUPPLIERS = "UPLOAD_SUPPLIERS",
  UPLOAD_GROUPS = "UPLOAD_GROUPS",
  UPLOAD_RESULTS = "UPLOAD_RESULTS",
  EXECUTE_DISH_ITEMS = "EXECUTE_DISH_ITEMS",
  EXECUTE_DISH_ITEMS_2 = "EXECUTE_DISH_ITEMS_2",
  ADD_AWARD_TO_ALL_CATALOGUES = "ADD_AWARD_TO_ALL_CATALOGUES",
  ADD_AWARD_TO_SPECIAL_CATALOGUE = "ADD_AWARD_TO_SPECIAL_CATALOGUE",
  CREATE_SPECIAL_CATALOGUE = "CREATE_SPECIAL_CATALOGUE",
}

export enum TaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

// Parse TaskType to string translation
export const taskTypeToString = (taskType: TaskType): string => {
  switch (taskType) {
    case TaskType.UPLOAD_PARTICIPANTS:
      return "Carga de participantes";
    case TaskType.UPLOAD_CATEGORIES:
      return "Carga de categorías";
    case TaskType.UPLOAD_SUBCATEGORIES:
      return "Carga de subcategorías";
    case TaskType.UPLOAD_BRANDS:
      return "Carga de marcas";
    case TaskType.UPLOAD_AWARDS:
      return "Carga de premios";
    case TaskType.UPLOAD_SUPPLIERS:
      return "Carga de proveedores";
    case TaskType.EXECUTE_DISH_ITEMS:
      return "Ejecutando mecánica";
    case TaskType.UPLOAD_RESULTS:
      return "Carga de resultados";
    case TaskType.ADD_AWARD_TO_ALL_CATALOGUES:
      return "Carga de premios a todos los catalogos";
    case TaskType.ADD_AWARD_TO_SPECIAL_CATALOGUE:
      return "Carga de premios a catalogo especial";
    case TaskType.CREATE_SPECIAL_CATALOGUE:
      return "Creación de catalogo especial";
    case TaskType.EXECUTE_DISH_ITEMS_2:
      return "Ejecutando mecanicas segunda versión";
    case TaskType.UPLOAD_GROUPS:
      return "Carga de grupos";

    default:
      return "";
  }
};

// Parse TaskStatus to string translation
export const taskStatusToString = (taskStatus: TaskStatus): string => {
  switch (taskStatus) {
    case TaskStatus.PENDING:
      return "Pendiente";
    case TaskStatus.IN_PROGRESS:
      return "En progreso";
    case TaskStatus.COMPLETED:
      return "Completado";
    case TaskStatus.FAILED:
      return "Fallido";
    default:
      return "";
  }
};
