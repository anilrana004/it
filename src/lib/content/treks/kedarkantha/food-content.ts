import type { TrekRichSection } from '@/lib/content/treks/types';

export const KEDARKANTHA_FOOD_SECTION: TrekRichSection = {
  id: 'food',
  kicker: 'On Trail Meals',
  title: 'Delicious & Nutritious Food During Trek',
  intro:
    'Fresh, high-altitude meals designed for energy and warmth — breakfast, lunch, evening snacks, and dinner prepared by experienced cooks.',
  blocks: [
    {
      type: 'h3',
      text: 'Breakfast',
    },
    {
      type: 'ul',
      items: [
        'Beverages: ginger/masala tea, coffee, orange juice',
        'Light: veg sandwiches, jam and butter',
        'Indian: cheese/masala omelettes, aloo paratha with curd, poha, porridge, chole bhature, aloo poori, upma, mix veg vermicelli',
      ],
    },
    {
      type: 'h3',
      text: 'Lunch',
    },
    {
      type: 'ul',
      items: [
        'Fresh roti, seasonal vegetable sabzi, paneer bhurji, paneer butter masala',
        'Dal tadka, dal makhani, jeera rice, peas pulao, chole masala, rajma masala',
        'Raita or curd on the side',
      ],
    },
    {
      type: 'h3',
      text: 'Evening Tea & Snacks',
    },
    {
      type: 'ul',
      items: [
        'Tea, coffee, hot chocolate; vegetable/tomato/sweet corn soups',
        'Bread pakoda, veg pakoda, Maggi, french fries, samosa, popcorn',
      ],
    },
    {
      type: 'h3',
      text: 'Dinner',
    },
    {
      type: 'ul',
      items: [
        'Shahi paneer, mattar paneer, rajma with jeera rice, roti/paratha with sabzi',
        'Dal tadka, aloo-gobhi, fried rice/noodles with veg manchurian',
        'Desserts: gulab jamun, sooji halwa, gajar halwa; Bournvita with hot milk',
      ],
    },
  ],
};
