import { OptionLabel } from './common';
import { RecipeIngredient } from './ingredient';
import { Subject } from './subject';

export interface Recipe {
  id: number;
  slug: string;
  name: string;
  steps: string;
  video: string;
  portions: number;
  coverImage: string;
  recipeIngredients: RecipeIngredient[];
  subjects: Subject[];
}

export interface CreateRecipe
  extends Omit<Recipe, 'id' | 'coverImage' | 'recipeIngredients' | 'subjects' | 'video'> {
  coverImage?: string;
  subjectIds?: OptionLabel[];
  video?: string;
}
