import { OptionLabel } from './common';
import { RecipeIngredient } from './ingredient';

export interface Recipe {
  id: number;
  slug: string;
  name: string;
  steps: string;
  portions: number;
  coverImage: string;
  recipeIngredients: RecipeIngredient[];
}

export interface CreateRecipe
  extends Omit<Recipe, 'id' | 'coverImage' | 'recipeIngredients'> {
  coverImage?: string;
  subjectIds?: OptionLabel[];
}
