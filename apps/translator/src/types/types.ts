export type FormData = {
  phone: string;
  password: string;
  confirmPassword: string;
};
export type FormErrors = Partial<
  Record<keyof (FormData & UserProfileExtra), string>
>;

export const defaultData: FormData = {
  phone: "",
  password: "",
  confirmPassword: "",
};
export type UserProfileExtra = {
  phone: string;
  fullName: string;
  birthDate: string;
  topikLevel: string;
  topikPhoto: File | null;
  profilePhoto: File | null;
  translationTopics: string[];
  availableLanguages: string[];
  certifiedTopics: string[];
};

export const defaultExtraData: UserProfileExtra = {
  phone: "",
  fullName: "",
  birthDate: "",
  topikLevel: "",
  topikPhoto: null,
  profilePhoto: null,
  translationTopics: [],
  certifiedTopics: [],
  availableLanguages: [],
};
