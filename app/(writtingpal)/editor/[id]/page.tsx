import EssayPanel from '@/components/polish/EssayPanel';

export default function Page({ params }: { params: { id: string } }) {
  return <EssayPanel id={params.id} />;
}
