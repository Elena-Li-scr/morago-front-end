import "../styles/theme.css";

interface ThemeProps {
  theme: string;
}

export default function Theme({ theme }: ThemeProps) {
  const iconMap: Record<string, string> = {
    "Агентство труда": "agency.png",
    Завод: "factory.png",
    "Мин труда": "ministry.png",
    Больница: "hospital.png",
    Поликлиника: "polyclinic.png",
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
  const iconSrc = `/assets/theme-icons/${iconMap[theme]}`;
  return (
    <div className="theme">
      <img src={iconSrc} alt="theme-icon" />
      <h5>{theme}</h5>
    </div>
  );
}
