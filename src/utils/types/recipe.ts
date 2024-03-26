export interface Recipe {
  id: number;
  slug: string;
  name: string;
  steps: string;
  portions: number;
  coverImage: string;
}

export interface CreateRecipe extends Omit<Recipe, 'id' | 'coverImage'> {
  coverImage?: string;
}
