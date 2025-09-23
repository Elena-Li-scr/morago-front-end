import type { CheckboxGroupConfig, FormField, NavItem } from "../types/types";
import type { InputFieldConfig, WithdrawalForm } from "@shared/types/types";

import { formatDateString, formatPhone, formatTopikLevel } from "../utils/formatInput";
import { rules } from "../utils/rules";
import { AiOutlineUser } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";
import { HiOutlineExclamationCircle, HiOutlineUsers } from "react-icons/hi2";
import { TbMessageQuestion } from "react-icons/tb";
import { RiHome5Fill, RiLockPasswordLine } from "react-icons/ri";
import { FaPhoneAlt, FaRegBell } from "react-icons/fa";
import { BsShieldLock } from "react-icons/bs";
import { RxShare2 } from "react-icons/rx";
import { FaUserLarge } from "react-icons/fa6";

//Registration & newTranslator ---------------

export const CODE_LENGTH = 4;
export const COUNTDOWN_SECONDS = 180;

export const CHECKBOX_GROUPS: CheckboxGroupConfig[] = [
  {
    label: "Темы перевода",
    field: "themeIds",
    options: [
      { id: 15, name: "Агентство труда" },
      { id: 16, name: "Завод" },
      { id: 18, name: "Больница" },
      { id: 19, name: "Поликлинника" },
      { id: 21, name: "Аптека" },
      { id: 22, name: "Стоматология" },
    ],
  },
  {
    label: "Доступные языки перевода",
    field: "languageIds",
    options: [],
    useButtons: true,
  },
];

export const INPUT_FIELDS_CONFIG: InputFieldConfig[] = [
  {
    name: "fullName",
    label: "ФИО",
    type: "text",
    placeholder: "Введите имя и фамилию",
    icon: <AiOutlineUser className="register-icon" />,
  },
  {
    name: "phone",
    label: "Номер телефона",
    type: "text",
    placeholder: "Введите номер телефона",
    format: formatPhone,
    icon: <FiPhone className="register-icon" />,
  },
  {
    name: "dateOfBirth",
    label: "Дата рождения",
    type: "text",
    format: formatDateString,
    placeholder: "Введите дату рождения",
    icon: <LuCalendarDays className="register-icon" />,
  },
  {
    name: "levelOfKorean",
    label: "Уровень TOPIK",
    type: "text",
    format: formatTopikLevel,
    placeholder: "Введите уровень корейского",
    icon: <HiOutlineExclamationCircle className="register-icon" />,
  },
];

// Inputs only for FROM PASSWORD -------------------

const phoneField = {
  name: "phone",
  placeholder: "Введите номер телефона без “-”",
  label: "Номер телефона",
  type: "tel",
  format: formatPhone,
  rules: rules.phone,
  icon: <FiPhone className="register-icon" />,
};

const passwordField = {
  name: "password",
  placeholder: "Введите пароль",
  type: "password",
  label: "Пароль",
  rules: rules.password,
  icon: <RiLockPasswordLine className="register-icon" />,
};

const currentPasswordField = (getValues: () => any) => ({
  name: "currentPassword",
  placeholder: "Введите ваш пароль",
  label: "Пароль",
  type: "password",
  rules: rules.currentPassword(getValues),
  icon: <RiLockPasswordLine className="register-icon" />,
});

const confirmPasswordField = (getValues: () => any) => ({
  name: "confirmPassword",
  placeholder: "Повторите ещё раз",
  type: "password",
  rules: rules.confirmPassword(getValues),
  icon: <RiLockPasswordLine className="register-icon" />,
});

export const FORM_CONFIG: Record<string, (getValues: () => any) => FormField[]> = {
  register: (getValues: () => any) => [
    phoneField,
    currentPasswordField(getValues),
    confirmPasswordField(getValues),
  ],
  login: () => [phoneField, passwordField],
  changePassword: (getValues: () => any) => [
    {
      ...passwordField,
      placeholder: "Введите новый пароль",
      label: "Текущий пароль",
    },
    {
      ...currentPasswordField(getValues),
      placeholder: "Введите текущий пароль",
      label: "Новый пароль",
    },
    {
      ...confirmPasswordField(getValues),
      placeholder: "Повторите новый пароль",
      label: "Повторите новый пароль",
    },
  ],
  resetPassword: () => [phoneField],
  newPassword: (getValues: () => any) => [
    {
      ...currentPasswordField(getValues),
      label: "Новый пароль",
    },
    {
      ...confirmPasswordField(getValues),
      placeholder: "Повторите ещё раз",
    },
  ],
};

// Inputs for change Translator Data -------------------

export const CHANGE_DATA_INPUTS: InputFieldConfig[] = [
  {
    name: "firstName",
    key: "fitsrName",
    label: "Фамилия",
    type: "text",
    placeholder: "Введите Вашу фамилию",
    icon: <AiOutlineUser className="register-icon" />,
  },
  {
    name: "lastName",
    key: "lastName",
    label: "Имя",
    type: "text",
    placeholder: "Введите Ваше имя",
    icon: <AiOutlineUser className="register-icon" />,
  },
];

// FooterNav -------------

export const navItems: NavItem[] = [
  {
    name: "main",
    label: "Главная",
    icon: <RiHome5Fill className="main-footer-nav-icon" />,
    route: "/my-home-translator-page",
  },
  {
    name: "phone",
    label: "Мои звонки",
    icon: <FaPhoneAlt className="main-footer-nav-icon" />,
    route: "/my-call-history",
  },
  {
    name: "profile",
    label: "Профиль",
    icon: <FaUserLarge className="main-footer-nav-icon" />,
    route: "/my-profile-page",
  },
];

// WithdrawalForm --------------

export const withdrawalData: WithdrawalForm = {
  accountHolder: "",
  nameOfBank: "",
  won: "0",
};

export const koreanBanks = [
  "국민은행 (KB Kookmin Bank)",
  "신한은행 (Shinhan Bank)",
  "우리은행 (Woori Bank)",
  "하나은행 (Hana Bank)",
  "농협은행 (Nonghyup)",
  "카카오뱅크 (KakaoBank)",
  "케이뱅크 (K-Bank)",
  "토스뱅크 (Toss Bank)",
];
export const koreanBankOptions = koreanBanks.map((bank) => ({
  value: bank,
  label: bank,
}));

// Profile ---------------------

export const settingsSections = [
  {
    title: "Настройки",
    items: [
      {
        label: "Изменить пароль",
        icon: <RiLockPasswordLine className="register-icon " />,
        route: "change-password",
      },
      {
        label: "Уведомления",
        icon: <FaRegBell className="register-icon " />,
        route: "/my-notification-page",
      },
    ],
  },
  {
    title: "О приложении",
    items: [
      {
        label: "FAQ",
        icon: <TbMessageQuestion className="register-icon " />,
        route: "/settings/faq",
      },
      {
        label: "Privacy Policy",
        icon: <BsShieldLock className="register-icon " />,
        route: "/settings/privacy-policy",
      },
      {
        label: "Связаться с нами",
        icon: <HiOutlineUsers className="register-icon " />,
        route: "/settings/contact",
      },
    ],
  },
  {
    title: "Другое",
    items: [
      {
        label: "Поделиться",
        icon: <RxShare2 className="register-icon " />,
        action: "share",
      },
    ],
  },
];
