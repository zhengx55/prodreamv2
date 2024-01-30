'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAIEditor } from '@/zustand/store';
type Props = {
  node: {
    attrs: {
      citation_id: string;
      author: string;
      publish_year: string;
      article_title: string;
      abstract: string;
    };
  };
};
const IntextContent = ({ node }: Props) => {
  const citation_style = useAIEditor((state) => state.citationStyle);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {citation_style === 'MLA' ? (
            <p className='!m-0 text-doc-primary'>({node.attrs.publish_year})</p>
          ) : (
            <p className='!m-0 text-doc-primary'>
              ({node.attrs.author},{node.attrs.publish_year})
            </p>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='start'
          className='flex w-[420px] flex-col gap-y-2 rounded border border-shadow-border bg-white p-4'
        >
          <h1 className='base-semibold'>
            {node.attrs.article_title}&nbsp;
            <span className='subtle-regular text-doc-font'>
              {node.attrs.author} ({node.attrs.publish_year})
            </span>
          </h1>

          <p className=' small-regular line-clamp-3'>{node.attrs.abstract}</p>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default IntextContent;
