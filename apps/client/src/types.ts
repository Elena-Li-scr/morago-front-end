export interface Translator {
  name: string;
  theme: string;
  rating: number;
  photo: string;
  online: boolean;
  status: string;
  price: number;
  time?: string;
  reviewsCount?: number;
  date?: string;
}
