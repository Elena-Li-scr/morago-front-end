import { format, isToday, isYesterday, differenceInHours, differenceInMinutes } from "date-fns";

export const formatPhone = (val: string) =>
  val
    .replace(/\D/g, "")
    .replace(/^(\d{3})(\d{0,4})(\d{0,4}).*/, (_, a, b, c) => [a, b, c].filter(Boolean).join("-"));

export const formatDateString = (val: string) =>
  val
    .replace(/\D/g, "")
    .slice(0, 8)
    .replace(/^(\d{4})(\d{0,2})(\d{0,2}).*/, (_, y, m, d) => [y, m, d].filter(Boolean).join("."));

export const formatTopikLevel = (val: string) => val.replace(/[^\d]/g, "").slice(0, 1);

export const formatBankAccount = (value: string): string => {
  const raw = value.replace(/\D/g, "");
  const parts = [];
  if (raw.length > 0) parts.push(raw.slice(0, 3));
  if (raw.length > 3) parts.push(raw.slice(3, 9));
  if (raw.length > 9) parts.push(raw.slice(9, 14));

  return parts.join("-");
};

export const formatBalance = (val: string): string => {
  const raw = val.replace(/\D/g, "");
  return raw.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export function formatNotificationDate(rawDate: string): string {
  const date = new Date(rawDate);
  const now = new Date();

  if (isToday(date)) {
    const diffHours = differenceInHours(now, date);
    const diffMinutes = differenceInMinutes(now, date) % 60;

    if (diffHours === 0 && diffMinutes < 1) {
      return "Только что";
    }

    if (diffHours < 1) {
      return `${diffMinutes} минут назад`;
    }

    return ` ${diffHours} ч ${diffMinutes} мин назад`;
  }

  if (isYesterday(date)) {
    return "Вчера";
  }

  return format(date, "dd.MM.yyyy"); // пример: 07 сентября 2025
}
