/// client Types

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

export interface CallProps {
  recipientId: string | number;
  themeId: string | number;
}

/// Translator Types

export type RegisterFormValues = {
  phone?: string;
  password?: string;
  currentPassword?: string;
  confirmPassword?: string;
  role?: string;
};

export type UserProfileExtra = {
  phone?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth: string;
  levelOfKorean?: string;
  imageUrl?: File | string | null;
  themeIds: string[];
  languageIds?: string[];
  token?: string;
};

export type ChangePasswordData = {
  password?: string;
  currentPassword?: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type InputFieldConfig = {
  name: keyof UserProfileExtra;
  key?: string;
  label: string;
  placeholder: string;
  icon?: React.ReactNode;
  type: string;
  format?: (val: string) => string;
};

export type WithdrawalForm = {
  accountHolder: string;
  nameOfBank: string;
  won: string;
};

export type CallFromApi = {
  id?: string;
  name: string;
  date: string;
  phone?: string;
  duration: number;
  coins: number;
  theme: string;
  rating: string;
  hasRequest?: string;
  imageUrl: string;
};

export type CallPage<T> = {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
  };
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
};
