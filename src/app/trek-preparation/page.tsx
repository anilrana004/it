import { redirect } from 'next/navigation';

/** Legacy hub URL — send to the first More guide page */
export default function TrekPreparationRedirect() {
  redirect('/how-to-prepare');
}
