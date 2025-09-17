import type { RegisterOptions, UseFormGetValues } from "react-hook-form";

import type { UserProfileExtra } from "@shared/types/types";

export type CheckboxOption = {
  id: number;
  name: string;
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
  rules?: RegisterOptions | ((getValues: UseFormGetValues<any>) => RegisterOptions);
};

export type NavItem = {
  name: string;
  label: string;
  icon: React.ReactNode;
  route: string;
  onClick?: () => void;
};

export interface NotificationType {
  id: number;
  title: string;
  text: string;
  date: string;
  isRead: boolean;
}

export interface CategoryTranslator {
  categoryId?: string | number;
  name: string;
  iconId?: string | number;
  id: number;
  isActive?: boolean;
  isPopular?: boolean;
}

export interface languagesTranslator {
  id: number;
  name: string;
}

export interface ChangeDataType {
  firstName?: string;
  imageUrl?: File | string | null;
  lastName?: string;
  phone?: string;
}
