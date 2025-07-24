import { differenceInYears, isAfter, isBefore, isValid, parse } from "date-fns";

export const rules = {
  phone: {
    required: "Введите номер телефона",
    pattern: {
      value: /^010-\d{4}-\d{4}$/,
      message: "Неверный формат номера",
    },
  },
  profilePhoto: {
    required: "Загрузите фото",
  },

  password: {
    required: "Введите пароль",
    minLength: {
      value: 9,
      message: "Пароль должен быть не менее 9 цифр ",
    },
  },
  currentPassword: {
    required: "Введите пароль",
    minLength: {
      value: 9,
      message: "Пароль должен быть не менее 9 цифр ",
    },
  },

  confirmPassword: (getValues: () => any, passwordField = "password") => ({
    required: "Повторите пароль",
    validate: (val: string) => {
      const password = getValues()[passwordField];
      return val === password || "Пароли не совпадают";
    },
  }),

  fullName: {
    required: "Введите имя",
    minLength: {
      value: 2,
      message: "Минимум 2 символа",
    },
  },

  birthDate: {
    required: "Введите дату рождения",
    validate: (val: string) => {
      const regex = /^\d{4}\.\d{2}\.\d{2}$/;
      if (!regex.test(val)) return "Формат даты: ГГГГ.ММ.ДД (1980.05.04)";

      const date = parse(val, "yyyy.MM.dd", new Date());

      if (!isValid(date)) return "Некорректная дата";

      const now = new Date();

      if (isAfter(date, now)) return "Дата рождения не может быть в будущем";

      const minDate = new Date(1900, 0, 1);
      if (isBefore(date, minDate))
        return "Дата рождения не может быть раньше 1900 года";

      const age = differenceInYears(now, date);
      if (age < 19) return "Возраст должен быть 19+";

      return true;
    },
  },

  topikLevel: {
    required: "Введите уровень TOPIK",
    pattern: {
      value: /^[1-6]$/,
      message: "Уровень от 1 до 6",
    },
  },

  bankAccount: {
    required: "Введите номер счёта",
    pattern: {
      value: /^\d{3}-\d{6}-\d{5}$/,
      message: "Неверный формат (пример: 123-456-789012)",
    },
  },

  balance: {
    required: "Введите сумму",
    validate: (val: string) => {
      const num = Number(val.replace(/[^\d]/g, ""));
      if (isNaN(num)) return "Некорректная сумма";
      if (num < 50000) return "Минимум ₩50,000";
      return true;
    },
  },

  translationTopics: {
    validate: (val: string[]) => val.length > 0,
  },

  availableLanguages: {
    validate: (val: unknown) => {
      if (Array.isArray(val)) {
        return val.length > 0 || "Выберите хотя бы один язык";
      }
      return "Выберите хотя бы один язык";
    },
  },

  agree: {
    required: "Необходимо согласие",
  },
};
