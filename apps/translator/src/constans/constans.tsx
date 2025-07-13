import { type UserProfileExtra } from "../types/types";
import { AiOutlineUser } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

type CheckboxGroupConfig = {
  label: string;
  field: keyof UserProfileExtra;
  options: string[];
  useButtons?: boolean;
};

export const CODE_LENGTH = 4;
export const COUNTDOWN_SECONDS = 180;

export const CHECKBOX_GROUPS: CheckboxGroupConfig[] = [
  {
    label: "Темы перевода",
    field: "translationTopics",
    options: ["Пудонсан", "Маркет", "Банк", "Больница", "Ресторан", "Такси"],
  },
  {
    label: "Темы с сертификатом",
    field: "certifiedTopics",
    options: ["Юриспруденция", "Экономика"],
  },
  {
    label: "Доступные языки перевода",
    field: "availableLanguages",
    options: ["Русский", "Казахский", "Узбекский", "Английский", "Таджикский"],
    useButtons: true,
  },
];

export const INPUT_FIELDS_CONFIG = [
  {
    label: "ФИО",
    name: "fullName",
    type: "text",
    placeholder: "Введите имя и фамилию",
    icon: <AiOutlineUser className="register-icon" />,
  },
  {
    label: "Номер телефона",
    name: "phone",
    type: "text",
    placeholder: "Введите номер телефона",
    icon: <FiPhone className="register-icon" />,
  },
  {
    label: "Дата рождения",
    name: "birthDate",
    type: "date",
    placeholder: "Введите дату рождения",
    icon: <LuCalendarDays className="register-icon" />,
  },
  {
    label: "Уровень TOPIK",
    name: "topikLevel",
    type: "text",
    placeholder: "Введите уровень корейского",
    icon: <HiOutlineExclamationCircle className="register-icon" />,
  },
] as const;
