import { redirect } from 'next/navigation';

export default async function Home({}) {
  redirect('/writtingpal/polish');
  return <main>Home page</main>;
}
