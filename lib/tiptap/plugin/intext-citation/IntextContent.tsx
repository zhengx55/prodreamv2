'use client';
import { Book } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import useAIEditor, { useCitation } from '@/zustand/store';
import { PopoverClose } from '@radix-ui/react-popover';
import type { NodeViewProps } from '@tiptap/react';
import { Trash2 } from 'lucide-react';
import { useMemo } from 'react';

const IntextContent = (props: NodeViewProps) => {
  const citation_style = useCitation((state) => state.citationStyle);
  const updateCurrentInline = useCitation((state) => state.updateCurrentInline);
  const inTextCitation = useCitation((state) => state.inTextCitation);
  const updateShowEditCitation = useCitation(
    (state) => state.updateShowEditCitation
  );
  const updateRightbarTab = useAIEditor((state) => state.updateRightbarTab);
  const current_citation = useMemo(() => {
    const foundCitation = inTextCitation.find(
      (item) => item.data.id === props.node.attrs.citation_id
    );
    return foundCitation ? foundCitation.data : null;
  }, [inTextCitation, props.node.attrs.citation_id]);
  const handleDeleteCitation = () => {
    props.deleteNode();
  };
  const handleEditCitation = () => {
    updateRightbarTab(1);
    updateShowEditCitation(true);
    updateCurrentInline(props);
  };
  const title =
    current_citation?.article_title || current_citation?.book_title || '';
  return (
    <Popover>
      <PopoverTrigger asChild>
        {citation_style === 'APA' ? (
          <p className='!m-0 text-doc-primary'>
            (
            {props.node.attrs.show_author && (
              <APAAuthors contributors={current_citation?.contributors ?? []} />
            )}
            {props.node.attrs.show_year && (
              <span>{current_citation?.publish_date?.year}</span>
            )}
            )
          </p>
        ) : (
          <p className='!m-0 text-doc-primary'>
            (
            {props.node.attrs.show_author && (
              <MLAAuhors contributors={current_citation?.contributors ?? []} />
            )}
            {props.node.attrs.show_page &&
              props.node.attrs.page_number &&
              ` ${props.node.attrs.page_number}`}
            )
          </p>
        )}
      </PopoverTrigger>
      <PopoverContent
        align='start'
        className='flex w-[420px] flex-col gap-y-2 rounded border border-shadow-border bg-white p-3'
      >
        <h1 className='base-medium'>{title}&nbsp;</h1>
        <p className='subtle-regular text-doc-font'>
          Year: {current_citation?.publish_date?.year}
        </p>
        {current_citation?.contributors.length ? (
          <p className='subtle-regular text-doc-font'>
            Authors:&nbsp;
            {current_citation.contributors.map((contributor, index) => (
              <span key={`${props.node.attrs.citation_id}-${index}`}>
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
          <PopoverClose asChild>
            <Button
              role='button'
              onClick={handleEditCitation}
              className='h-8 w-full rounded border border-doc-primary py-1 text-doc-primary'
              variant={'ghost'}
            >
              <Book /> Edit
            </Button>
          </PopoverClose>
          <Button
            className='aspect-square h-8 rounded bg-doc-shadow/20 p-2 text-doc-shadow hover:bg-red-400 hover:text-white'
            variant={'ghost'}
            onClick={handleDeleteCitation}
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const APAAuthors = ({
  contributors,
}: {
  contributors: {
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    role?: string;
    suffix?: string;
  }[];
}) => {
  return contributors.length === 2 ? (
    <span>
      {contributors[0].last_name},&nbsp;{contributors[1].last_name},
    </span>
  ) : contributors.length === 1 ? (
    <span>{contributors[0].last_name},</span>
  ) : contributors.length > 2 ? (
    <span>{contributors[0].last_name} et al.,</span>
  ) : null;
};
const MLAAuhors = ({
  contributors,
}: {
  contributors: {
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    role?: string;
    suffix?: string;
  }[];
}) => {
  return contributors.length === 2 ? (
    <span>
      {contributors[0].last_name}&nbsp;and&nbsp;{contributors[1].last_name}
    </span>
  ) : contributors.length === 1 ? (
    contributors[0].last_name
  ) : contributors.length > 2 ? (
    contributors[0].last_name + ' et al.'
  ) : null;
};
export default IntextContent;
