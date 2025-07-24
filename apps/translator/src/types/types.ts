import type { RegisterOptions, UseFormGetValues } from "react-hook-form";

export type RegisterFormValues = {
  phone: string;
  password: string;
  confirmPassword: string;
};

export type UserProfileExtra = {
  phone: string;
  fullName: string;
  birthDate: string;
  topikLevel: string;
  profilePhoto?: File | null;
  translationTopics: string[];
  availableLanguages: string[];
};

export type ChangePasswordData = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type InputFieldConfig = {
  name: keyof UserProfileExtra;
  label: string;
  placeholder: string;
  icon?: React.ReactNode;
  type: string;
  format?: (val: string) => string;
};

export type CheckboxGroupConfig = {
  label: string;
  field: keyof UserProfileExtra;
  options: string[];
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
  icon: string;
  route: string;
  iconActive: string;
  onClick?: () => void;
};

export type WithdrawalForm = {
  bankAccount: string;
  bankName: string;
  balance: string;
};
