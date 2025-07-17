import { type UserProfileExtra } from "../types/types";
import { AiOutlineUser } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

import { TbMessageQuestion } from "react-icons/tb";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";
import { BsShieldLock } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi2";
import { RxShare2 } from "react-icons/rx";

//Registration & newTranslator ---------------

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

// FooterNav -------------

export type NavItem = {
  name: string;
  label: string;
  icon: string;
  route: string;
  iconActive: string;
  onClick?: () => void;
};

export const navItems: NavItem[] = [
  {
    name: "main",
    label: "Главная",
    icon: "/assets/icons/main.png",
    route: "/my-home-translator-page",
    iconActive: "/assets/icons/main-active.png",
  },
  {
    name: "phone",
    label: "Мои звонки",
    icon: "/assets/icons/phone.png",
    route: "/settings/notifications",
    iconActive: "/assets/icons/phone-active.png",
  },
  {
    name: "message",
    label: "Сообщения",
    icon: "/assets/icons/message.png",
    route: "/settings/notifications",
    iconActive: "/assets/icons/message-active.png",
  },
  {
    name: "profile",
    label: "Профиль",
    icon: "/assets/icons/profile.png",
    route: "/my-profile-page",
    iconActive: "/assets/icons/profile-active.png",
  },
];

// WithdrawalForm --------------

export type WithdrawalForm = {
  bankAccount: string;
  bankName: string;
  balance: string;
};

export const withdrawalData: WithdrawalForm = {
  bankAccount: "",
  bankName: "",
  balance: "",
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
        route: "/settings/notifications",
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
