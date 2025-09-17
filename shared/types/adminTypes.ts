export type Translator = {
  id: string;
  name: string;
  phone: string;
  email: string;
  levelOfKorean: string;
  hasWithdrawalRequest?: string;
  select?: string;
  call?: string;
  withdraw?: string;
  eye?: string;
  firstName?: string;
  lastName?: string;
};

export type User = {
  id: string;
  select?: string;
  name: string;
  phone: string;
  balance: string;
  hasDepositRequest?: string;
  call?: string;
  deposit?: string;
  eye?: string;
  firstName?: string;
  lastName?: string;
};
export type CallHistory = {
  id: string;
  name: string;
  select?: string;
  call: string;
  date: string;
  duration: string;
  coins: string;
  theme: string;
  hasRequest?: string;
  rating: string;
};

export type RequestPage = {
  id: string;
  select?: string;
  request?: string;
  date: string;
  amount: string;
  name: string;
  status?: string;
  userId: string;
};

export type Categories = {
  id: string | number;
  select?: string;
  name: string;
  isActive?: string;
  eye?: string;
};

export interface Category {
  id: number;
  name: string;
  isActive: boolean;
}
export type Themes = {
  id: string;
  select?: string;
  name: string;
  categories: Category;
  isActive?: string;
  icon: string;
  imgIcon: string;
  eye?: string;
  categoryId: number;
};

export type Column<T, Extra extends string = never> = {
  key: keyof T | Extra;
  title?: string;
  width?: string;
  marginLeft?: string;
  renderHeader?: () => React.ReactNode;
  render?: (row: T) => React.ReactNode;
};

export type GenericTypeMap = {
  // id?: string;
  user: User;
  translator: Translator;
  callHistory: CallHistory;
  themes: Themes;
  requestPage: RequestPage;
  categories: Categories;
};
export type ListsType =
  | "user"
  | "translator"
  | "callHistory"
  | "withdrawHistory"
  | "depositHistory";

export type TopicsType = "themes" | "categories";

export type PageResponse<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  last: string;
};
