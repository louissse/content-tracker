export type Status = 'IDEA' | 'DRAFT' | 'REVIEW' | 'PUBLISHED' | 'ARCHIVED';

export type ItemType = 'ARTICLE' | 'VIDEO' | 'PODCAST' | 'OTHER';

export type Role = 'EDITOR' | 'CONTRIBUTOR';

export interface ContentItem {
  id: number;
  title: string;
  status: Status;
  authors: string; // JSON-streng, f.eks. '["andreas","maria"]'
  deadline: string; // ISO 8601 dato-streng fra API
  type: ItemType;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  username: string;
  role: Role;
}

// Hjælpefunktion til at parse authors-feltet fra JSON-streng til array
export function parseAuthors(authors: string): string[] {
  return authors.split(', ');
}
