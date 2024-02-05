export interface Sku {
  id: number;
  name: string;
  code: string;
  level: number;
  isActive: boolean;
  points: number;
  isDeleted: boolean;
  deletedAt: null;
  isEditing: boolean;
  parentId: number;
  parent: Sku;
}
