import type { TableType, Translator, User } from "../types/types";

// Мок-данные
export const translatorListMock: Translator[] = [
  {
    id: "1",
    name: "Name 1",
    phone: "010 1234 5678",
    email: "mail1@mail.com",
    topik: "5 level",
    status: "Verified",
    withdrawRequest: "Request",
  },
  {
    id: "2",
    name: "Name 2",
    phone: "010 2222 2222",
    email: "mail2@mail.com",
    topik: "3 level",
    status: "Unverified",
    withdrawRequest: "None",
  },
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

export const dbData: Record<TableType, any[]> = {
  user: UserListMock,
  translator: translatorListMock,
};
