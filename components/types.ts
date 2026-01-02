export enum View {
  HOME = 'home',
  AGBIZ = 'agbiz',
  KNOWLEDGE = 'knowledge',
}

export interface SearchResult {
  id: number;
  title: string;
  summary: string;
  category: string;
  date: string;
  url: string;
  author: string;
  source: string;
}