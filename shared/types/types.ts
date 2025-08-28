export interface NewUserPayload {
  password?: string;
  confirmPassword?: string;
  phone?: string;
  role?: string;
}

export interface ProfilePayload {
  lastName?: string;
  firstName?: string;
  imageUrl?: FileList;
}

export interface BalancePayload {
  accountHolder: string;
  nameOfBank: string;
  won: number;
}

export interface GetById {
  id: number | string;
}
