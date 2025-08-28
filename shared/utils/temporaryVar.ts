export const iconMap: Record<string, string> = {
  "Агентство труда": "agency.png",
  Завод: "factory.png",
  "Мин труда": "ministry.png",
  Больница: "hospital.png",
  Поликлинника: "polyclinic.png",
  "Вет клиника": "vet.png",
  Аптека: "drugstore.png",
  СТО: "mechanic.png",
  "Авто салон": "car-service.png",
  Прокат: "rent-car.png",
  Рестораны: "restaurant.png",
  "Свадебный салон": "wedding-salon.png",
  "Банкетный зал": "banquet-hole.png",
  "Магазин/Торговый центр": "mall.png",
  "Салон красоты": "beauty-salon.png",
  Почта: "post.png",
  Банк: "bank.png",
  Бизнес: "business.png",
  "Гос страховка": "insurance.png",
  "Миграционный центр": "migration-center.png",
  "Районный центр": "district-center.png",
  Налоговая: "tax.png",
  Другое: "other.png",
  "Агентство недвижимости": "real-estate-agency.png",
  Полиция: "police.png",
  Прокуратура: "prosecutor.png",
  Адвокатура: "advocate.png",
  Суд: "court.png",
  Нотариус: "notary.png",
  "Экстренный вызов": "emergency.png",
  "Детский сад": "daycare.png",
  Школа: "school.png",
  Институт: "institute.png",
  "Учебные курсы": "educational-classes.png",
  Стоматология: "stomatology.png",
};

export const servicesGroup = {
  Работа: ["Агентство труда", "Завод", "Мин труда"],
  Медицина: ["Больница", "Поликлинника", "Вет клиника", "Аптека", "Стоматология"],
  Авто: ["СТО", "Авто салон", "Прокат"],
  Услуги: [
    "Рестораны",
    "Свадебный салон",
    "Банкетный зал",
    "Магазин/Торговый центр",
    "Салон красоты",
    "Почта",
    "Банк",
  ],
  Бизнес: ["Бизнес"],
  "Государственные учреждения": [
    "Гос страховка",
    "Миграционный центр",
    "Районный центр",
    "Налоговая",
    "Другое",
    "Агентство недвижимости",
  ],
  Закон: ["Полиция", "Адвокатура", "Прокуратура", "Суд", "Нотариус"],
  "Образовательные учреждения": ["Детский сад", "Школа", "Институт", "Учебные курсы"],
  "Экстренный вызов": ["Экстренный вызов"],
} as const;

interface Translator {
  name: string;
  theme: string;
  rating: number;
  reviewsCount: number;
  photo: string;
  time: string;
  online: boolean;
  status: string;
  price: number;
  date?: string;
}

interface Notification {
  title: string;
  body: string;
  time: string;
}

export const translators: Translator[] = [
  {
    name: "К. Дмитрий",
    theme: "Банк",
    rating: 4,
    reviewsCount: 7,
    photo: "/assets/home/photo1.png",
    time: "04.25",
    online: true,
    status: "Верифицирован ",
    price: 1000,
    date: "05.05.2022",
  },
  {
    name: "П. Наталья",
    theme: "Почта",
    rating: 3,
    reviewsCount: 34,
    photo: "/assets/home/photo2.png",
    time: "3.14",
    online: false,
    status: "Верифицирован ",
    price: 1000,
    date: "05.05.2022",
  },
  {
    name: "Л. Мин Хо",
    theme: "Завод",
    rating: 4,
    reviewsCount: 67,
    photo: "/assets/home/photo3.png",
    time: "03.10",
    online: true,
    status: "Верифицирован ",
    price: 1000,
    date: "05.05.2022",
  },
];

export const missed: Translator[] = [
  {
    name: "К. Дмитрий",
    theme: "Банк",
    rating: 4,
    reviewsCount: 7,
    photo: "/assets/home/photo1.png",
    time: "00.00",
    online: true,
    status: "Верифицирован ",
    price: 1000,
    date: "05.05.2022",
  },
];

export const notifications: Notification[] = [
  {
    title: "Новые тарифы",
    body: "Some notifications",
    time: "2025-07-16 10:30",
  },
  {
    title: "Приложение обновилось — стало еще круче",
    body: "Some notifications",
    time: "2025-07-15 18:20",
  },
  {
    title: "Бонусы от реферальной ссылки — пяу!",
    body: "Some notifications",
    time: "2025-07-15 18:20",
  },
];
