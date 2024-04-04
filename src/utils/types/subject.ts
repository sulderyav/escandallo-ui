export interface Subject {
  id: number;
  slug: string;
  name: string;
  createdAt: string;
}

export interface CreateSubject extends Omit<Subject, 'id' | 'createdAt'> {}

export interface EditSubject extends Omit<Partial<Subject>, 'createdAt'> {
  id: number;
}
