import { compareDesc, parseISO } from "date-fns";
function getRandomDateWithinDays(days: number) {
  const now = new Date();
  const past = new Date();
  past.setDate(now.getDate() - days);
  const randomTime = past.getTime() + Math.random() * (now.getTime() - past.getTime());
  return new Date(randomTime);
}

function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

function getRandomDuration(minSec: number, maxSec: number) {
  const seconds = Math.floor(Math.random() * (maxSec - minSec + 1)) + minSec;
  return seconds;
}
const price = () => {
  return Math.floor(Math.random() * 5000) + 1000;
};

export const transformedMock = Array.from({ length: 10 }, (_, i) => {
  const callDate = getRandomDateWithinDays(3);
  return {
    id: String(i + 1),
    name: `User ${i + 1}`,
    avatarUrl: "assets/images/user2.png",
    theme: `${Math.ceil(Math.random() * 5)}`,
    time: getRandomDuration(30, 600),
    price: price(),
    date: formatDate(callDate),
  };
});

export const transformedMockData = [...transformedMock].sort((a, b) =>
  compareDesc(parseISO(a.date), parseISO(b.date)),
);
