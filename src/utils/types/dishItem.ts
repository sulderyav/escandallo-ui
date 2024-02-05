import { Ingredient } from "./ingredient";
import { Position } from "./positions";

export interface DishItem {
  id: number;
  order: number;
  isDeleted: boolean;
  deletedAt: null;
  ingredient: Ingredient;
}
