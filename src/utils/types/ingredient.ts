export interface Ingredient {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}
