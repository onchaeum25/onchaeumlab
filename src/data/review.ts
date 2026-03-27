export interface Review {
  id: number;
  author: string;
  project: string;
  content: string;
  rating: number;
  is_visible: boolean;
  created_at: string;
}

export type ReviewInput = Omit<Review, 'id' | 'created_at'>;
