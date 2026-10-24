import type { Category } from "@/types";

export const categories: Category[] = [
  {
    slug: "vhodnye-dveri",
    name: "Входные двери",
    shortName: "Входные",
    group: "doors",
    description:
      "Надёжные входные двери с утеплением, звукоизоляцией и современной фурнитурой. Подберите модель под интерьер, климат и условия эксплуатации.",
    shortDescription: "Стальные и комбинированные модели для квартиры и дома",
    image: "/images/cat-vhodnye.jpg",
    imageAlt: "Современная тёмная входная дверь в интерьере прихожей",
    order: 1,
  },
  {
    slug: "mezhkomnatnye-dveri",
    name: "Межкомнатные двери",
    shortName: "Межкомнатные",
    group: "doors",
    description:
      "Межкомнатные двери из МДФ и дерева — от лаконичных моделей до классических полотен. Поможем подобрать цвет полотна, покрытие и фурнитуру.",
    shortDescription: "Полотна из МДФ и дерева для любого интерьера",
    image: "/images/cat-mezhkomnatnye.jpg",
    imageAlt: "Серая межкомнатная дверь в современном интерьере",
    order: 2,
  },
  {
    slug: "podezdnye-dveri",
    name: "Подъездные двери",
    shortName: "Подъездные",
    group: "doors",
    description:
      "Подъездные двери с усиленной конструкцией, замками и доводчиками. Подходят для жилых домов, офисов и других помещений с высокой нагрузкой.",
    shortDescription: "Усиленные двери для подъездов и офисов",
    image: "/images/cat-podezdnye.jpg",
    imageAlt: "Входная дверь в подъезд современного дома",
    order: 3,
  },
  {
    slug: "okna",
    name: "Окна",
    shortName: "Окна",
    group: "windows",
    description:
      "Пластиковые и алюминиевые окна для квартир и домов. Энергосберегающие стеклопакеты, точный замер, доставка и профессиональный монтаж.",
    shortDescription: "ПВХ и алюминиевые окна с энергосбережением",
    image: "/images/cat-okna.jpg",
    imageAlt: "Большое окно с видом на город в уютной комнате",
    order: 4,
  },
  {
    slug: "balkony-i-lodzhii",
    name: "Балконы и лоджии",
    shortName: "Балконы",
    group: "balconies",
    description:
      "Остекление, отделка и комплексные решения для балконов и лоджий. Подбор материалов, утепление и профессиональная установка.",
    shortDescription: "Остекление и отделка под ключ",
    image: "/images/cat-balkony.jpg",
    imageAlt: "Светлый балкон с панорамным остеклением",
    order: 5,
  },
  {
    slug: "linoleum",
    name: "Линолеум",
    shortName: "Линолеум",
    group: "flooring",
    description:
      "Износостойкие напольные покрытия для дома и коммерческих помещений. Разные классы износостойкости, толщина и декоры под дерево и камень.",
    shortDescription: "Практичные покрытия для дома и офиса",
    image: "/images/cat-linoleum.jpg",
    imageAlt: "Светлый деревянный пол в минималистичной комнате",
    order: 6,
  },
  {
    slug: "arki",
    name: "Арки",
    shortName: "Арки",
    group: "interior",
    description:
      "Арки и декоративные проёмы для квартиры и дома. Изготовление по индивидуальным размерам, подбор оттенка и аккуратный монтаж.",
    shortDescription: "Декоративные проёмы по вашим размерам",
    image: "/images/cat-arki.jpg",
    imageAlt: "Белый арочный проём в классическом интерьере",
    order: 7,
  },
  {
    slug: "furnitura",
    name: "Фурнитура и комплектующие",
    shortName: "Фурнитура",
    group: "interior",
    description:
      "Ручки, замки, петли, доводчики и другие комплектующие для дверей и окон. Подберём фурнитуру под вашу модель и стиль интерьера.",
    shortDescription: "Ручки, замки, петли и доводчики",
    image: "/images/cat-furnitura.jpg",
    imageAlt: "Латунная дверная ручка с замком крупным планом",
    order: 8,
  },
  {
    slug: "drugie-tovary",
    name: "Другие товары",
    shortName: "Другие товары",
    group: "interior",
    description:
      "Подоконники, откосы, москитные сетки и другие товары для дома. Всё необходимое, чтобы результат выглядел завершённым.",
    shortDescription: "Подоконники, откосы и москитные сетки",
    image: "/images/cat-drugie.jpg",
    imageAlt: "Подоконник с комнатными растениями и окно",
    order: 9,
  },
];

export const homeCategorySlugs = categories
  .filter((category) => category.slug !== "drugie-tovary")
  .map((category) => category.slug);

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
