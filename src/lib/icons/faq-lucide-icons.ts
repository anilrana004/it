import {
  Building2,
  CalendarCheck,
  CircleHelp,
  ClipboardList,
  CreditCard,
  Headset,
  HeartHandshake,
  LayoutGrid,
  Mountain,
  Route,
  ShieldCheck,
  Sprout,
  Tent,
  TicketX,
} from 'lucide-react';
import type { FaqCategoryId } from '@/lib/faqs-content';

/** Lucide icons for Help Centre FAQ category tiles — keyed by category id. */
export const FAQ_CATEGORY_LUCIDE_ICONS: Record<
  FaqCategoryId,
  typeof LayoutGrid
> = {
  all: LayoutGrid,
  registration: ClipboardList,
  payment: CreditCard,
  booking: CalendarCheck,
  basics: CircleHelp,
  beginners: Sprout,
  seniors: HeartHandshake,
  safety: ShieldCheck,
  cancellations: TicketX,
  logistics: Route,
  campsites: Tent,
  gear: Mountain,
  support: Headset,
  corporate: Building2,
};
