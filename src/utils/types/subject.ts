import { Level } from './level';

export interface Subject {
  id: number;
  slug: string;
  name: string;
  createdAt: string;
  levels: Level[];
}

export interface CreateSubject
  extends Omit<Subject, 'id' | 'createdAt' | 'levels'> {
  levelIds?: number[];
}

export interface EditSubject extends Omit<Partial<Subject>, 'createdAt'> {
  id: number;
  levelIds?: number[];
}
