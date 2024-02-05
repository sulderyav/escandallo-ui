import { DishItem } from './dishItem';
import { Position } from './positions';

export interface Dish {
  id: number;
  order: number;
  name: string;
  description: null;
  isDeleted: boolean;
  deletedAt: null;
  position: Position;
  dishItems: DishItem[];
}
