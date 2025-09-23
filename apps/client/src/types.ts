export interface Translator {
  date: string;
  phone: string;
  name: string;
  imageUrl: null | string;
  duration: null | string;
  coins: null | number;
  theme: string;
  rating: null | number;
  hasRequest: boolean;
  reviewsCount?: null | number;
  nameWithInitials?: string;
  averageRating?: number;
}

export interface TranslatorByTheme {
  id: string | number;
  nameWithInitials: string;
  levelOfKorean: number;
  imageUrl: null | string;
  theme: string;
  averageRating?: number;
}

export interface TranslatorById {
  id: string | number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  isOnline: boolean;
  levelOfKorean: number;
  dateOfBirth: string;
  hasWithdrawalRequest: boolean;
  status?: string;
  price?: number;
  rating?: number;
  imageUrl?: string;
  averageRating?: number;
}
