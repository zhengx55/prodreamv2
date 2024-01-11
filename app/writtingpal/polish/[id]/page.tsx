'use client';
import DocNavbar from '@/components/editor/navbar';
import EssayPanel from '@/components/polish/EssayPanel';
import { getDocDetail } from '@/query/api';
import { useQuery } from '@tanstack/react-query';

export default function Page({ params }: { params: { id: string } }) {
  const {
    data: document_content,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['document_item', params.id],
    queryFn: () => getDocDetail(params.id),
  });
  return (
    <main className='relative flex h-full w-full flex-col justify-center'>
      <DocNavbar title={document_content ? document_content.title : ''} />
      <EssayPanel
        isFetching={isFetching}
        isError={isError}
        document_content={document_content}
      />
      {/* <Rightbar /> */}
    </main>
  );
}
