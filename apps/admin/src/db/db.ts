import type { Column } from "../components/FlexTable";
import type { PopUpInfo } from "../components/PopUp/usePopUp";
import type { listsTableConfigs, topicTableConfigs } from "../constans/tableConfigs/tableConfigs";
import type {
  CallHistory,
  Categories,
  ListsType,
  RequestPage,
  Themes,
  TopicsType,
  Translator,
  User,
} from "../types/types";

// Мок-данные
export const translatorListMock: Translator[] = [
  // {
  //   id: "1",
  //   name: "Name 1",
  //   phone: "010 1234 5678",
  //   email: "mail1@mail.com",
  //   topik: "5 level",
  //   status: "Verified",
  //   withdrawRequest: "Request",
  // },
  // {
  //   id: "2",
  //   name: "Name 2",
  //   phone: "010 2222 2222",
  //   email: "mail2@mail.com",
  //   topik: "3 level",
  //   status: "Unverified",
  //   withdrawRequest: "None",
  // },
];

export const UserListMock: User[] = [
  {
    id: "1",
    name: "Name 1",
    phone: "010 1234 5678",
    balance: "1000",
    depositRequest: "Request",
  },
  {
    id: "2",
    name: "Name 2",
    phone: "010 2222 2222",
    balance: "500",
    depositRequest: "None",
  },
];

export const callHistoryMock: CallHistory[] = [
  {
    id: "1",
    call: "010 1234 5678",
    date: "2023.02.15 18:13",
    duration: "30 min",
    coins: "-3000",
    theme: "Агентство недви...",
    rating: "4",
  },
  {
    id: "2",
    call: "010 9876 5432",
    date: "2022.12.27 16:43",
    duration: "13 min",
    coins: "-1300",
    theme: "Банковские вопр...",
    rating: "3",
  },
];

export const withdrawHistoryMock: RequestPage[] = [
  {
    id: "1",
    request: "Withdraw",
    date: "2022.12.27 17:43",
    coins: "- 300.000",
    status: "Transfer completed",
  },
  {
    id: "2",
    request: "Withdraw",
    date: "2022.12.31 20:43",
    coins: "- 40.000",
    status: "Transfer completed",
  },
];
export const depositHistoryMock: RequestPage[] = [
  {
    id: "1",
    request: "Deposit",
    date: "2022.12.27 17:43",
    coins: "+ 10.000",
    status: "Transfer completed",
  },
  {
    id: "2",
    request: "Deposit",
    date: "2022.03.12 17:41",
    coins: "+ 5.000",
    status: "Request",
  },
];
export const categoriesMock: Categories[] = [
  {
    id: "1",
    name: "Category Name  1",
    status: "Active",
  },
];
export const themesMock: Themes[] = [
  {
    id: "1",
    name: "Theme 1",
    categorie: "Choose...",
    status: "Active",
    icon: "File name 1",
    imgIcon: "assets/Icon_mock_theme.png",
  },
  {
    id: "2",
    name: "Агентство труда",
    categorie: "Работа",
    status: "Active",
    icon: "File name 1",
    imgIcon: "assets/Icon_mock_theme.png",
  },
  {
    id: "3",
    name: "Завод",
    categorie: "Работа",
    status: "Active",
    icon: "File name 1",
    imgIcon: "assets/Icon_mock_theme.png",
  },
  {
    id: "4",
    name: "Поликлиника",
    categorie: "Медицина",
    status: "Active",
    icon: "File name 1",
    imgIcon: "assets/Icon_mock_theme.png",
  },
  {
    id: "5",
    name: "Больница",
    categorie: "Медицина",
    status: "Active",
    icon: "File name 1",
    imgIcon: "assets/Icon_mock_theme.png",
  },
  {
    id: "6",
    name: "СТО",
    categorie: "Авто",
    status: "Active",
    icon: "File name 1",
    imgIcon: "assets/Icon_mock_theme.png",
  },
  {
    id: "7",
    name: "Автосалон",
    categorie: "Авто",
    status: "Active",
    icon: "File name 1",
    imgIcon: "assets/Icon_mock_theme.png",
  },
  {
    id: "8",
    name: "Рестораны",
    categorie: "Услуги",
    status: "Active",
    icon: "File name 1",
    imgIcon: "assets/Icon_mock_theme.png",
  },
  {
    id: "9",
    name: "Прокат",
    categorie: "Услуги",
    status: "Active",
    icon: "File name 1",
    imgIcon: "assets/Icon_mock_theme.png",
  },
  {
    id: "10",
    name: "Банкетный зал",
    categorie: "Услуги",
    status: "Active",
    icon: "File name 1",
    imgIcon: "assets/Icon_mock_theme.png",
  },
  {
    id: "11",
    name: "Магазин/Торговый центр",
    categorie: "Бизнес",
    status: "Active",
    icon: "File name 1",
    imgIcon: "assets/Icon_mock_theme.png",
  },
  {
    id: "12",
    name: "Очень длинное назван...",
    categorie: "Очень длинное н...",
    status: "Active",
    icon: "File name 1",
    imgIcon: "assets/Icon_mock_theme.png",
  },
];

export const dbData: Record<ListsType | TopicsType, any[]> = {
  user: UserListMock,
  translator: translatorListMock,
  callHistory: callHistoryMock,
  withdrawHistory: withdrawHistoryMock,
  depositHistory: depositHistoryMock,
  categories: categoriesMock,
  themes: themesMock,
};

// Пользователи
export const popUpUsersMock: PopUpInfo = {
  id: 1,
  firstName: "Ivan",
  lastName: "Petrov",
  phone: "+82-10-1234-5678",
  balance: 1200,
  hasDepositRequest: false,
};

// Переводчики
export const popUpTranslatorsMock: PopUpInfo = {
  // id: 101,
  // firstName: "Minho",
  // lastName: "Choi",
  // phone: "+82-10-4567-8901",
  // email: "minho.choi@example.com",
  // isOnline: true,
  // levelOfKorean: 6,
  // dateOfBirth: "1995-04-12",
  // hasWithdrawalRequest: false,
};
