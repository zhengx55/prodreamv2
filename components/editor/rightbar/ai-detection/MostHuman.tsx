import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { findNodePos } from '@/lib/tiptap/utils';
import { batchHumanize } from '@/query/api';
import { EditorDictType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { memo, useCallback, useState } from 'react';
import { useUpdateEffect } from 'react-use';
import { useTranslations } from 'next-intl';
import { v4 } from 'uuid';
import { useEditorCommand } from '../../hooks/useEditorCommand';

type MostHumanParagraphProps = {
  text: string;
  loading: boolean;
  id: string;
};

type MostHumanSuggestionsProps = {
  text: string;
  id: string;
  result: string;
  expand: boolean;
};

const MostHuman = ({
  t,
  showRecheck,
}: {
  t: EditorDictType;
  showRecheck: () => void;
}) => {
  const editor = useAIEditor((state) => state.editor_instance);
  const [paragraph, setParagraph] = useState<MostHumanParagraphProps[]>([]);
  const [suggestion, setSuggestion] = useState<MostHumanSuggestionsProps[]>([]);
  const { setSelection, replaceSelection } = useEditorCommand(editor!);
  const trans = useTranslations('Editor');

  const toggleItem = (item: MostHumanSuggestionsProps) => {
    const { nodePos, nodeSize } = findNodePos(editor!, item.text);
    setSelection(nodePos, nodePos + nodeSize);
    setSuggestion((prev) =>
      prev.map((suggestion) =>
        suggestion.id === item.id
          ? { ...suggestion, expand: true }
          : { ...suggestion, expand: false }
      )
    );
  };

  const handleClickParagraph = (item: MostHumanParagraphProps) => {
    const { nodePos, nodeSize } = findNodePos(editor!, item.text);
    setSelection(nodePos, nodePos + nodeSize);
    suggestion.length > 0 &&
      setSuggestion((prev) =>
        prev.map((suggestion) => ({ ...suggestion, expand: false }))
      );
  };

  const { mutateAsync: handleHumanizeAll } = useMutation({
    mutationFn: (params: MostHumanParagraphProps[]) =>
      batchHumanize(params.map((item) => item.text)),
    onMutate: () => {
      setParagraph((prev) => prev.map((item) => ({ ...item, loading: true })));
    },
    onSuccess: (data, variables) => {
      const suggestion_array: MostHumanSuggestionsProps[] = [];
      data.map((item, index) => {
        let suggestion_item: MostHumanSuggestionsProps = {
          id: v4(),
          result: item,
          text: variables[index].text,
          expand: false,
        };
        suggestion_array.push(suggestion_item);
      });
      setSuggestion(suggestion_array);
      setParagraph([]);
    },
    onError: async (error) => {
      setParagraph((prev) => prev.map((item) => ({ ...item, loading: false })));
      const { toast } = await import('sonner');
      toast.error(error.message);
    },
  });

  const { mutateAsync: handleHumanize } = useMutation({
    mutationFn: (params: MostHumanParagraphProps) =>
      batchHumanize([params.text]),
    onMutate: (variables) => {
      setParagraph((prev) =>
        prev.map((item) =>
          item.id === variables.id ? { ...item, loading: true } : item
        )
      );
    },
    onSuccess: (data, variables) => {
      let suggestion_item: MostHumanSuggestionsProps = {
        id: variables.id,
        result: data[0],
        text: variables.text,
        expand: false,
      };
      setSuggestion((prev) => [...prev, suggestion_item]);
      setParagraph((prev) => prev.filter((item) => item.id !== variables.id));
    },
    onError: async (error) => {
      setParagraph((prev) => prev.map((item) => ({ ...item, loading: false })));
      const { toast } = await import('sonner');
      toast.error(error.message);
    },
  });

  const handleAccept = (item: MostHumanSuggestionsProps) => {
    const { nodePos, nodeSize } = findNodePos(editor!, item.text);
    const from = nodePos;
    const to = from + nodeSize;
    replaceSelection(from, to, item.result);
    setSuggestion((prev) =>
      prev.filter((suggestion) => suggestion.id !== item.id)
    );
  };

  const handleDismiss = (item: MostHumanSuggestionsProps) => {
    setSuggestion((prev) =>
      prev.filter((suggestion) => suggestion.id !== item.id)
    );
  };

  useUpdateEffect(() => {
    if (suggestion.length === 0) showRecheck();
  }, [suggestion]);

  const handelAcceptAll = useCallback(() => {
    suggestion.map((item) => {
      const { nodePos, nodeSize } = findNodePos(editor!, item.text);
      const from = nodePos;
      const to = from + nodeSize;
      replaceSelection(from, to, item.result);
    });
    setSuggestion([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, suggestion]);

  const handleDismissAll = useCallback(() => {
    setSuggestion([]);
  }, []);

  const humanizeAll = useCallback(async () => {
    await handleHumanizeAll(paragraph);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paragraph]);

  const handleSingleHumanize = async (item: MostHumanParagraphProps) => {
    await handleHumanize(item);
  };

  const handleParagraph = useCallback(() => {
    let array: MostHumanParagraphProps[] = [];
    editor?.state.doc.descendants((node, pos) => {
      if (node.type.name === 'paragraph') {
        array = [
          ...array,
          {
            id: v4(),
            text: node.textContent,
            loading: false,
          },
        ];
      }
    });
    setParagraph(array);
  }, [editor]);

  return (
    <div className='flex flex-1 flex-col'>
      <div className='flex-between'>
        <p className='base-medium'>{trans('Detection.Humanizer')}</p>
        {suggestion.length === 0 && paragraph.length !== 0 && (
          <Button
            variant={'ghost'}
            onClick={humanizeAll}
            className='size-max p-0'
          >
            {trans('Detection.Humanize_all')}
          </Button>
        )}
      </div>
      <Spacer y='14' />
      {paragraph.length === 0 && suggestion.length === 0 ? (
        <ParagraphStarter t={t} handleParagraph={handleParagraph} />
      ) : (
        <div className='flex flex-col gap-2'>
          {suggestion.length > 0 && (
            <>
              <Header
                t={t}
                suggestion={suggestion}
                handleAcceptAll={handelAcceptAll}
                handleDismissAll={handleDismissAll}
              />
              {suggestion.map((suggestion) => {
                const isExpand = suggestion.expand;
                return (
                  <div
                    key={suggestion.id}
                    className='flex cursor-pointer flex-col rounded border border-gray-200 p-4'
                    onClick={() => toggleItem(suggestion)}
                  >
                    <p
                      className={`small-regular ${isExpand ? 'line-clamp-none' : 'line-clamp-3'}`}
                    >
                      {suggestion.result}
                    </p>
                    {isExpand && (
                      <div className='my-4 flex justify-end gap-x-2'>
                        <Button
                          role='button'
                          className='size-max rounded px-4 py-2'
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAccept(suggestion);
                          }}
                        >
                          {trans('Utility.Accept')}
                        </Button>
                        <Button
                          role='button'
                          variant={'outline'}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDismiss(suggestion);
                          }}
                          className='size-max rounded border px-4 py-2'
                        >
                          {trans('Utility.Dismiss')}
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
              {paragraph.length > 0 && (
                <RemainingHeader t={t} handler={humanizeAll} />
              )}
            </>
          )}
          {paragraph.map((item) => {
            return (
              <div
                className='flex w-full cursor-pointer flex-col gap-y-4 rounded border border-gray-200 p-4 hover:bg-stone-50'
                key={item.id}
                onClick={() => handleClickParagraph(item)}
              >
                <p className='small-regular line-clamp-3 text-zinc-600'>
                  {item.text}
                </p>
                <Button
                  role='button'
                  disabled={item.loading}
                  onClick={async (e) => {
                    e.stopPropagation();
                    await handleSingleHumanize(item);
                  }}
                  className='h-max rounded py-1.5'
                >
                  {item.loading ? (
                    <Loader2 className='animate-spin text-white' />
                  ) : (
                    trans('Detection.humanize_button')
                  )}
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default memo(MostHuman);

const ParagraphStarter = memo(
  ({
    t,
    handleParagraph,
  }: {
    t: EditorDictType;
    handleParagraph: () => void;
  }) => {
    const trans = useTranslations('Editor');

    return (
      <div className='flex h-max w-full flex-col gap-y-4 overflow-hidden rounded border border-gray-200 px-4 py-6'>
        <p className='text-center text-sm font-medium text-violet-500'>
          {trans('Detection.most_human_title')}
        </p>
        <Image
          src='/editor/MostHuman.png'
          alt='Humanizer'
          width={200}
          height={200}
          className='size-44 self-center'
        />
        <Separator orientation='horizontal' className='bg-gray-200' />
        <p className='text-center text-sm font-normal text-zinc-600'>
          {trans('Detection.most_human_instruction')}
        </p>
        <Button
          onClick={handleParagraph}
          className='base-regular size-max self-center rounded-lg px-8'
          role='button'
        >
          {trans('Detection.most_human_button')}
        </Button>
      </div>
    );
  }
);

const Header = memo(
  ({
    t,
    suggestion,
    handleAcceptAll,
    handleDismissAll,
  }: {
    t: EditorDictType;
    suggestion: any;
    handleAcceptAll: () => void;
    handleDismissAll: () => void;
  }) => {
    const trans = useTranslations('Editor');

    return (
      <div className='flex-between'>
        <p className='base-medium'>{suggestion.length} {trans('Utility.Suggestions')}</p>
        <div className='flex gap-x-2'>
          <Button
            variant={'ghost'}
            onClick={handleAcceptAll}
            className='size-max p-0 text-neutral-400'
          >
            {trans('Utility.AcceptAll')}
          </Button>
          <Button
            onClick={handleDismissAll}
            variant={'ghost'}
            className='size-max p-0 text-neutral-400'
          >
            {trans('Utility.DismissAll')}
          </Button>
        </div>
      </div>
    );
  }
);

const RemainingHeader = memo(
  ({ t, handler }: { t: EditorDictType; handler: () => void }) => {
    const trans = useTranslations('Editor');

    return (
      <div className='flex-between mt-4'>
        <p className='base-medium'>{trans('Detection.Remaining_Paragraphs')}</p>
        <Button
          variant={'ghost'}
          onClick={handler}
          className='size-max p-0 text-neutral-400'
        >
          {trans('Detection.Humanize_all')}
        </Button>
      </div>
    );
  }
);

ParagraphStarter.displayName = 'ParagraphStarter';
Header.displayName = 'Header';
RemainingHeader.displayName = 'RemainingHeader';
