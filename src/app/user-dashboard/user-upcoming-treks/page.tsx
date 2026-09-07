import { redirect } from 'next/navigation';

/** Compatibility alias for familiar “upcoming treks” member URLs. */
export default function UserUpcomingTreksAliasPage() {
  redirect('/user-dashboard/upcoming-treks');
}
