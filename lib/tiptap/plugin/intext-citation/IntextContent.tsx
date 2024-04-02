'use client';
import { Book } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import useAIEditor, { useCitation } from '@/zustand/store';
import type { NodeViewProps } from '@tiptap/react';
import useUnmount from 'beautiful-react-hooks/useUnmount';
import { Trash2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const CitationPreview = dynamic(
  () => import('@/components/editor/rightbar/citation/CitationPreview'),
  {
    ssr: false,
  }
);
const IntextContent = (props: NodeViewProps) => {
  const {
    citationStyle,
    updateCurrentInline,
    inTextCitation,
    updateShowEditCitation,
    removeInTextCitationIds,
  } = useCitation((state) => ({ ...state }));

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

  useUnmount(() => {
    if (!current_citation) return;
    let found: boolean = false;
    props.editor.state.doc.descendants((node) => {
      if (node.type.name === 'IntextCitation') {
        if (node.attrs.citation_id === props.node.attrs.citation_id) {
          found = true;
        }
      }
    });
    if (!found) {
      removeInTextCitationIds(
        props.node.attrs.citation_id,
        current_citation.document_id
      );
    }
  });

  const handleEditCitation = () => {
    updateRightbarTab(3);
    updateShowEditCitation(true);
    updateCurrentInline(props);
  };
  const title =
    current_citation?.article_title || current_citation?.book_title || '';
  return (
    <Popover>
      <PopoverTrigger asChild>
        {citationStyle === 'APA' ? (
          <p className='!m-0 text-violet-500'>
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
          <p className='!m-0 text-violet-500'>
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
        className='flex w-[420px] flex-col gap-y-2 rounded border border-gray-200 bg-white p-3'
      >
        <Dialog>
          <DialogTrigger asChild>
            <h1 className='base-semibold line-clamp-2 cursor-pointer hover:text-violet-500'>
              {title}
            </h1>
          </DialogTrigger>
          <CitationPreview item={current_citation as any} />
        </Dialog>
        <p className='subtle-regular text-neutral-400'>
          Year: {current_citation?.publish_date?.year}
        </p>
        {current_citation?.contributors.length ? (
          <p className='subtle-regular text-neutral-400'>
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
              className='h-8 w-full rounded border border-violet-500 py-1 text-violet-500'
              variant={'ghost'}
            >
              <Book /> Edit
            </Button>
          </PopoverClose>
          <Button
            className='aspect-square h-8 rounded bg-zinc-600/20 p-2 text-zinc-600 hover:bg-red-400 hover:text-white'
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
