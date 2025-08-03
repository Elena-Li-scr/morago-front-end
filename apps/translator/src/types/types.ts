import type { RegisterOptions, UseFormGetValues } from "react-hook-form";

export type RegisterFormValues = {
  phone: string;
  password: string;
  confirmPassword?: string;
  role?: string;
};

export type UserProfileExtra = {
  phone?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  levelOfKorean?: string;
  imageUrl?: string | null;
  themeIds?: string[];
  languageIds?: string[];
};

export type ChangePasswordData = {
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

export type CheckboxOption = {
  id: number;
  label: string;
};
export type CheckboxGroupConfig = {
  label: string;
  field: keyof UserProfileExtra;
  options: CheckboxOption[];
  useButtons?: boolean;
};

export type FormField = {
  name: string;
  label?: string;
  placeholder: string;
  type?: string;
  icon?: React.ReactNode;
  format?: (val: string) => string;
  rules?:
    | RegisterOptions
    | ((getValues: UseFormGetValues<any>) => RegisterOptions);
};

export type NavItem = {
  name: string;
  label: string;
  icon: React.ReactNode;
  route: string;
  onClick?: () => void;
};

export type WithdrawalForm = {
  bankAccount: string;
  bankName: string;
  balance: string;
};

export interface Call {
  id: number;
  avatarUrl: string;
  name: string;
  topic: string;
  time: string;
  price: number;
  date: string;
}
