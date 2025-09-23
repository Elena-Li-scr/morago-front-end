import type { ListsType, TopicsType } from "../../types/types";

export const titleMapLists: Record<ListsType, string> = {
  user: "Users list",
  translator: "Translators list",
  callHistory: "Call history",
  withdrawHistory: "Withdraw history",
  depositHistory: "Deposit history",
};

export const titleMapTopics: Record<TopicsType, string> = {
  themes: "Themes",
  categories: "Categories",
};
