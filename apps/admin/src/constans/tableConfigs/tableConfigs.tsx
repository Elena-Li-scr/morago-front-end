import type { TableType } from "../../types/types";
import { callHistoryTableConfig, translatorTableConfig, UserTableConfig } from "./configs";

export const tableConfigs: Record<TableType, any[]> = {
  user: UserTableConfig,
  translator: translatorTableConfig,
  callHistory: callHistoryTableConfig,
};
