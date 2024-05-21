export interface Level {
  id: number;
  slug: string;
  name: string;
  createdAt: string;
}

export interface CreateLevel extends Omit<Level, 'id' | 'createdAt'> {}

export interface UpdateLevel extends Omit<Level, 'id' | 'slug' | 'createdAt'> {}
