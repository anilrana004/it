import {
  FAQ_CATEGORIES,
  FAQ_ITEMS,
  type FaqCategoryId,
} from '@/lib/faqs-content';

export type HomeFaqCategory = FaqCategoryId;

export type HomeFaqCategoryOption = {
  id: HomeFaqCategory;
  label: string;
};

export type HomeFaqItem = {
  id: string;
  category: Exclude<HomeFaqCategory, 'all'>;
  q: string;
  a: string;
};

/** Homepage FAQ — adapted from canonical Help Centre FAQ in `faqs-content.ts`. */
export const HOME_FAQ_CATEGORIES: HomeFaqCategoryOption[] = FAQ_CATEGORIES.map(
  ({ id, label }) => ({ id, label }),
);

export const HOME_FAQ_ITEMS: HomeFaqItem[] = FAQ_ITEMS.map(
  ({ id, category, question, answer }) => ({
    id,
    category,
    q: question,
    a: answer,
  }),
);
