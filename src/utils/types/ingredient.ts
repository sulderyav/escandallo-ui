import { Recipe } from './recipe';

export interface Ingredient {
  id: string;
  slug: string;
  name: string;
  description: string;
  meassurementType: MeassurementType;
  unitPrice: number;
  image: string;
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
  // GRAM = 'GRAM',
  KILOGRAM = 'KILOGRAM',
  LITER = 'LITER',
  // MILLILITER = 'MILLILITER',
  // PIECE = 'PIECE',
  UNITS = 'UNITS',
}

export const parseMeassurementTypeToLabel = (
  meassurementType: MeassurementType
) => {
  switch (meassurementType) {
    // case MeassurementType.GRAM:
    //   return 'Gramos';
    case MeassurementType.KILOGRAM:
      return 'Kilogramo';
    case MeassurementType.LITER:
      return 'Litro';
    // case MeassurementType.MILLILITER:
    //   return 'Mililitro';
    // case MeassurementType.PIECE:
    //   return 'Pieza';
    case MeassurementType.UNITS:
      return 'Unidades';
  }
};

export const parseMeassurementTypeToAvrebiation = (
  meassurementType: MeassurementType
) => {
  switch (meassurementType) {
    case MeassurementType.KILOGRAM:
      return 'Kg';
    case MeassurementType.LITER:
      return 'l';
    case MeassurementType.UNITS:
      return 'U';
  }
};

export interface RecipeIngredient {
  id: number;
  grossWeight: number;
  netWeight: number;
  waste: number;
  totalCost: number;
  ingredient: Ingredient;
  recipe: Recipe;
  outputPercentage: number;
  wastePercentage: number;
}

export interface CreateRecipeIngredient
  extends Omit<RecipeIngredient, 'id' | 'ingredient' | 'recipe'> {
  ingredientId: number;
  recipeId: number;
}
