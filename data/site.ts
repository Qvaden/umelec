export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://umelec.example";

export const company = {
  name: "Умелец",
  legalName: "Умелец",
  tagline: "Окна, двери и решения для дома",
  description:
    "Окна, двери, балконы, напольные покрытия и другие товары для дома. Подбор, замер, доставка и профессиональный монтаж.",
  phone: "+7 (900) 000-00-00",
  phoneHref: "tel:+79000000000",
  email: "demo@umelec.example",
  emailHref: "mailto:demo@umelec.example",
  address: "г. Москва, ул. Примерная, 12",
  addressNote: "Демонстрационный адрес",
  hours: "Пн–Сб: 9:00–19:00, Вс: 10:00–17:00",
  hoursNote: "Демонстрационный график работы",
  demoNotice:
    "Демонстрационный сайт. Контакты, цены и характеристики приведены для примера и не являются публичной офертой.",
};

export const catalogNav = [
  { label: "Входные двери", href: "/catalog/vhodnye-dveri" },
  { label: "Межкомнатные двери", href: "/catalog/mezhkomnatnye-dveri" },
  { label: "Подъездные двери", href: "/catalog/podezdnye-dveri" },
  { label: "Окна", href: "/catalog/okna" },
  { label: "Балконы и лоджии", href: "/catalog/balkony-i-lodzhii" },
  { label: "Линолеум", href: "/catalog/linoleum" },
  { label: "Арки", href: "/catalog/arki" },
  { label: "Фурнитура и комплектующие", href: "/catalog/furnitura" },
  { label: "Другие товары", href: "/catalog/drugie-tovary" },
];

export const mainNav = [
  { label: "Каталог", href: "/catalog", menu: "catalog" as const },
  { label: "Окна", href: "/catalog/okna" },
  { label: "Двери", href: "/catalog/vhodnye-dveri", menu: "doors" as const },
  { label: "Балконы", href: "/catalog/balkony-i-lodzhii" },
  { label: "Линолеум", href: "/catalog/linoleum" },
  { label: "Услуги", href: "/services" },
  { label: "О компании", href: "/about" },
  { label: "Контакты", href: "/contacts" },
];

export const doorNav = [
  { label: "Входные двери", href: "/catalog/vhodnye-dveri" },
  { label: "Межкомнатные двери", href: "/catalog/mezhkomnatnye-dveri" },
  { label: "Подъездные двери", href: "/catalog/podezdnye-dveri" },
];

export const footerNav = {
  catalog: [
    { label: "Входные двери", href: "/catalog/vhodnye-dveri" },
    { label: "Межкомнатные двери", href: "/catalog/mezhkomnatnye-dveri" },
    { label: "Подъездные двери", href: "/catalog/podezdnye-dveri" },
    { label: "Окна", href: "/catalog/okna" },
    { label: "Балконы", href: "/catalog/balkony-i-lodzhii" },
    { label: "Линолеум", href: "/catalog/linoleum" },
    { label: "Арки", href: "/catalog/arki" },
  ],
  company: [
    { label: "О компании", href: "/about" },
    { label: "Услуги", href: "/services" },
    { label: "Замер и монтаж", href: "/services#process" },
    { label: "Контакты", href: "/contacts" },
  ],
  help: [
    { label: "Доставка", href: "/delivery" },
    { label: "Оплата", href: "/payment" },
    { label: "Гарантия", href: "/warranty" },
    { label: "Возврат", href: "/returns" },
  ],
};

export const benefits = [
  {
    icon: "ruler",
    title: "Бесплатный замер",
    description: "Выезд специалиста и точный расчёт",
  },
  {
    icon: "wrench",
    title: "Профессиональный монтаж",
    description: "Аккуратно и в согласованные сроки",
  },
  {
    icon: "truck",
    title: "Доставка",
    description: "Привезём заказ по согласованному адресу",
  },
  {
    icon: "shield",
    title: "Гарантия",
    description: "На товары и выполненные работы",
  },
  {
    icon: "monitor",
    title: "Заказ онлайн",
    description: "Оформите заявку в несколько шагов",
  },
];
