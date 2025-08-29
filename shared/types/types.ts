export interface NewUserPayload {
  password?: number | string;
  confirmPassword?: number | string;
  phone?: number | string;
  role?: string;
  code?: number | string;
  resetToken?: number | string;
  newPassword?: number | string;
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
