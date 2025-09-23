import type { CallFromApi } from "@shared/types/types";
import { compareDesc, parseISO } from "date-fns";
import { v4 as uuidv4 } from "uuid";

export const callListSort = (list: CallFromApi[]) => {
  const transformed = list.map((call) => ({
    id: uuidv4(),
    name: call.name,
    imageUrl: call.imageUrl ?? "",
    theme: call.theme,
    duration: call.duration,
    coins: call.coins,
    date: call.date,
    rating: call.rating,
  }));
  return [...transformed].sort((a, b) => compareDesc(parseISO(a.date), parseISO(b.date)));
};
