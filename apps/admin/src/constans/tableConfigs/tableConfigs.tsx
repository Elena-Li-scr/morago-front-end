import {
  callHistoryTableConfig,
  withdrawRequestTableConfig,
  depositRequestTableConfig,
  translatorTableConfig,
  userTableConfig,
  themesTableConfig,
  categoriesTableConfig,
} from "./configs";

export const listsTableConfigs = {
  user: userTableConfig,
  translator: translatorTableConfig,
  callHistory: callHistoryTableConfig,
  withdrawHistory: withdrawRequestTableConfig,
  depositHistory: depositRequestTableConfig,
} as const;

export const topicTableConfigs = {
  themes: themesTableConfig,
  categories: categoriesTableConfig,
} as const;
