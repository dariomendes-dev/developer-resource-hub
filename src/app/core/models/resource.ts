export type Category = 'Frontend' | 'Backend' | 'DevOps' | 'General' | string;

export interface Resource {
  id: number;
  title: string;
  url: string;
  category: Category;
  rating: number;
}

export const ALL_CATEGORIES: Category[] = ['Frontend','Backend','DevOps','General'];
