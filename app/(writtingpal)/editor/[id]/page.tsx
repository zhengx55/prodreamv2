import EssayPanel from '@/components/editor/EssayPanel';

export default function Page({ params }: { params: { id: string } }) {
  return <EssayPanel id={params.id} />;
}
