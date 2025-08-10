export type Translator = {
  id: string;
  name: string;
  phone: string;
  email: string;
  topik: string;
  status: string;
  withdrawRequest?: string;
  select?: string;
  call?: string;
  withdraw?: string;
  eye?: string;
};

export type User = {
  id: string;
  select?: string;
  name: string;
  phone: string;
  balance: string;
  depositRequest?: string;
  call?: string;
  deposit?: string;
  eye?: string;
};
export type CallHistory = {
  id: string;
  select?: string;
  call: string;
  date: string;
  duration: string;
  coins: string;
  theme: string;
  depositRequest?: string;
  rating: string;
};

export type RequestPage = {
  id: string;
  select?: string;
  request?: string;
  date: string;
  coins: string;
  status?: string;
  eye?: string;
};

export type Categories = {
  id: string;
  select?: string;
  name: string;
  status?: string;
  eye?: string;
};
export type Themes = {
  id: string;
  select?: string;
  name: string;
  categorie: string;
  status: string;
  icon: string;
  imgIcon: string;
  eye?: string;
};

export type Column<T> = {
  key: keyof T;
  title?: string;
  width?: string;
  marginLeft?: string;
  renderHeader?: () => React.ReactNode;
  render?: (row: T) => React.ReactNode;
};

export type ListsType =
  | "user"
  | "translator"
  | "callHistory"
  | "withdrawHistory"
  | "depositHistory";

export type TopicsType = "themes" | "categories";
