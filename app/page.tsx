import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function Home({}) {
  const cookieStore = cookies();
  if (cookieStore.get('token')) {
    redirect('/writtingpal/polish');
  } else {
    redirect('/login');
  }
}
