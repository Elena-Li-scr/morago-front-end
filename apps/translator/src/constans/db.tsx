import type { CallHisrtoryTranslator } from "../types/types";

function getRandomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
const now = new Date();
const twoWeeksAgo = new Date();
twoWeeksAgo.setDate(now.getDate() - 7);

export const callData: CallHisrtoryTranslator[] = [
  {
    id: "1",
    avatarUrl: "/assets/images/user2.png",
    name: "Пугачева Алла",
    topic: "Банк",
    time: "1460",
    price: 23000,
    date: getRandomDate(twoWeeksAgo, now).toISOString(),
  },
  {
    id: "2",
    avatarUrl: "/assets/images/user.png",
    name: "Юзер Первый",
    topic: "Почта",
    time: "260",
    price: 4000,
    date: getRandomDate(twoWeeksAgo, now).toISOString(),
  },
  {
    id: "3",
    avatarUrl: "/assets/images/user2.png",
    name: "Юзер Второй",
    topic: "Завод",
    time: "860",
    price: 16000,
    date: getRandomDate(twoWeeksAgo, now).toISOString(),
  },
  {
    id: "4",
    avatarUrl: "/assets/images/user.png",
    name: "Юзер Третий",
    topic: "Аптека",
    time: "80",
    price: 1000,
    date: getRandomDate(twoWeeksAgo, now).toISOString(),
  },

  {
    id: "5",
    avatarUrl: "/assets/images/user.png",
    name: "Юзер Третий",
    topic: "Аптека",
    time: "80",
    price: 1000,
    date: getRandomDate(twoWeeksAgo, now).toISOString(),
  },

  {
    id: "6",
    avatarUrl: "/assets/images/user.png",
    name: "Юзер Третий",
    topic: "Аптека",
    time: "80",
    price: 1000,
    date: getRandomDate(twoWeeksAgo, now).toISOString(),
  },

  {
    id: "7",
    avatarUrl: "/assets/images/user.png",
    name: "Юзер Третий",
    topic: "Аптека",
    time: "80",
    price: 1000,
    date: getRandomDate(twoWeeksAgo, now).toISOString(),
  },
];

export const callMissed: CallHisrtoryTranslator[] = [];
