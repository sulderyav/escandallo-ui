import { Recipe } from './recipe';

export interface Ingredient {
  id: string;
  slug: string;
  name: string;
  description: string;
  meassurementType: MeassurementType;
  cost: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateIngredient
  extends Omit<
    Ingredient,
    'id' | 'createdAt' | 'updatedAt' | 'meassurementType'
  > {
  meassurementType: string;
}

export enum MeassurementType {
  GRAM = 'GRAM',
  KILOGRAM = 'KILOGRAM',
  LITER = 'LITER',
  MILLILITER = 'MILLILITER',
  PIECE = 'PIECE',
}

export const parseMeassurementTypeToLabel = (
  meassurementType: MeassurementType
) => {
  switch (meassurementType) {
    case MeassurementType.GRAM:
      return 'Gramos';
    case MeassurementType.KILOGRAM:
      return 'Kilogramo';
    case MeassurementType.LITER:
      return 'Litro';
    case MeassurementType.MILLILITER:
      return 'Mililitro';
    case MeassurementType.PIECE:
      return 'Pieza';
  }
};

export interface RecipeIngredient {
  id: number;
  quantity: number;
  ingredient: Ingredient;
  recipe: Recipe;
}

export interface CreateRecipeIngredient
  extends Omit<RecipeIngredient, 'id' | 'ingredient' | 'recipe'> {
  ingredientId: number;
  recipeId: number;
}
