'use client';
import { Book } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAIEditor } from '@/zustand/store';
import { Trash2 } from 'lucide-react';
import { useMemo } from 'react';
type Props = {
  node: {
    attrs: {
      citation_id: string;
    };
  };
  deleteHandler: () => void;
};
const IntextContent = ({ node, deleteHandler }: Props) => {
  const citation_style = useAIEditor((state) => state.citationStyle);
  const intextCitations = useAIEditor((state) => state.inTextCitation);
  const current_citation = useMemo(() => {
    const foundCitation = intextCitations.find(
      (item) => item.data.id === node.attrs.citation_id
    );
    return foundCitation ? foundCitation.data : null;
  }, [intextCitations, node.attrs.citation_id]);
  const handleDeleteCitation = () => {
    deleteHandler();
  };
  const handleEditCitation = () => {};

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {citation_style === 'APA' ? (
            <p className='!m-0 text-doc-primary'>
              ({current_citation?.publish_date?.year})
            </p>
          ) : (
            <p className='!m-0 text-doc-primary'>
              ({current_citation?.contributors[0].last_name},
              {current_citation?.publish_date?.year})
            </p>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='start'
          className='flex w-[420px] flex-col gap-y-2 rounded border border-shadow-border bg-white p-3'
        >
          <h1 className='base-medium'>
            {current_citation?.article_title}&nbsp;
          </h1>
          <p className='subtle-regular text-doc-font'>
            Year: {current_citation?.publish_date?.year}
          </p>
          {current_citation?.contributors.length ? (
            <p className='subtle-regular text-doc-font'>
              Authors:&nbsp;
              {current_citation.contributors.map((contributor, index) => (
                <span key={`${node.attrs.citation_id}-${index}`}>
                  {contributor.last_name} {contributor.first_name}
                  {index !== current_citation.contributors.length - 1 && ','}
                  &nbsp;
                </span>
              ))}
            </p>
          ) : null}
          <p className='small-regular line-clamp-3'>
            {current_citation?.abstract}
          </p>
          <div className='flex-between gap-x-4'>
            <Button
              className='h-8 w-full rounded border border-doc-primary py-1 text-doc-primary'
              variant={'ghost'}
            >
              <Book /> Edit
            </Button>
            <Button
              className='aspect-square h-8 rounded bg-doc-shadow/20 p-2 text-doc-shadow hover:bg-red-400 hover:text-white'
              variant={'ghost'}
              onClick={handleDeleteCitation}
            >
              <Trash2 size={18} />
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default IntextContent;
