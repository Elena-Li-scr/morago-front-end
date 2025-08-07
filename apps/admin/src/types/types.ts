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


export type Column<T> = {
  key: keyof T;
  title?: string;
  width?: string;
  marginLeft?: string;
  renderHeader?: () => React.ReactNode;
  render?: (row: T) => React.ReactNode;
};

export type TableType = "user" | "translator"| 'callHistory';


// Call history [username]