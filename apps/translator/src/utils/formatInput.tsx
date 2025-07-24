export const formatPhone = (val: string) =>
  val
    .replace(/\D/g, "")
    .replace(/^(\d{3})(\d{0,4})(\d{0,4}).*/, (_, a, b, c) =>
      [a, b, c].filter(Boolean).join("-")
    );

export const formatDateString = (val: string) =>
  val
    .replace(/\D/g, "")
    .slice(0, 8)
    .replace(/^(\d{4})(\d{0,2})(\d{0,2}).*/, (_, y, m, d) =>
      [y, m, d].filter(Boolean).join(".")
    );

export const formatTopikLevel = (val: string) =>
  val.replace(/[^\d]/g, "").slice(0, 1);

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
