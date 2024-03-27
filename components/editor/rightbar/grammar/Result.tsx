import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import {
  findNodePos,
  findParagpraph,
  highLightGrammar,
} from '@/lib/tiptap/utils';
import { IGrammarResult } from '@/query/type';
import { EdtitorDictType } from '@/types';
import { useAIEditor } from '@/zustand/store';
import useUnmount from 'beautiful-react-hooks/useUnmount';
import { m } from 'framer-motion';
import { memo, useCallback } from 'react';
import { useEditorCommand } from '../../hooks/useEditorCommand';
import SentenceFragment from './SentenceFragment';

type Props = {
  grammarResults: IGrammarResult[];
  update: (value: IGrammarResult[]) => void;
  t: EdtitorDictType;
};
const Result = ({ grammarResults, update, t }: Props) => {
  const editor = useAIEditor((state) => state.editor_instance);

  const handleDismiss = (index: number, group_index: number) => {
    const array = [...grammarResults];
    update(
      array
        .map((el, pos) => {
          if (pos === group_index) {
            const filteredDiff = el.diff.filter((_el, _pos) => _pos !== index);
            return filteredDiff.length > 0
              ? { ...el, diff: filteredDiff }
              : null;
          }
          return el;
        })
        .filter((el) => el !== null) as IGrammarResult[]
    );
  };

  const command = useEditorCommand(editor!);
  useUnmount(() => {
    command.clearAllHightLight();
  });

  const processAccept = useCallback(
    (item: IGrammarResult, index: number, group_index: number) => {
      if (!editor) return;
      command.clearAllHightLight();
      const blocks = editor.getJSON().content?.slice(1) ?? [];
      const new_string =
        item.diff.at(index)?.data.reduce((acc, current) => {
          if (current.status === 0) {
            return acc + current.sub_str;
          } else if (current.status === 3 || current.status === 1) {
            return acc + current.new_str;
          } else {
            return acc;
          }
        }, '') ?? '';
      let found = findParagpraph(item.index, blocks)?.text ?? '';
      if (!found) return;
      const original_sentence =
        item.diff.at(index)?.data.reduce((acc, current) => {
          if (current.status !== 1) {
            return acc + current.sub_str;
          } else {
            return acc + '';
          }
        }, '') ?? '';
      const sentence_position = found.indexOf(original_sentence.trimEnd());
      const { nodePos } = findNodePos(editor, found);
      const from = sentence_position + nodePos;
      const to = from + original_sentence.length;
      editor
        .chain()
        .focus()
        .deleteRange({ from, to })
        .insertContentAt(from, new_string)
        .run();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [editor]
  );

  const handleAccept = (
    item: IGrammarResult,
    index: number,
    group_index: number
  ) => {
    if (!editor) return;
    processAccept(item, index, group_index);
    handleDismiss(index, group_index);
  };

  const handleAcceptAll = () => {
    grammarResults.forEach((group, group_index) => {
      group.diff.forEach((_item, index) => {
        processAccept(group, index, group_index);
      });
    });
    update([]);
  };

  const handleActvie = (group_index: number, index: number) => {
    command.clearAllHightLight();
    const current_suggestion = grammarResults.at(group_index);
    highLightGrammar(editor!, current_suggestion!, index);
    update(
      grammarResults.map((el, pos) => ({
        ...el,
        diff: el.diff.map((item, idx) => ({
          ...item,
          expand: idx === index && pos === group_index,
        })),
      }))
    );
  };

  return (
    <m.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      key={'grammer-result'}
      className='flex flex-1 flex-col gap-y-4 overflow-y-auto'
    >
      <div aria-label='all suggestions' className='flex-between'>
        <div className='flex items-center gap-x-2'>
          <h2 className='base-semibold'>
            {grammarResults.length}&nbsp;
            {t.Grammar.suggestions}
          </h2>
        </div>
        <div className='flex items-center'>
          <Button
            onClick={handleAcceptAll}
            variant={'secondary'}
            className='border-none text-violet-500'
          >
            {t.Utility.AcceptAll}
          </Button>
          <Button
            onClick={() => update([])}
            variant={'ghost'}
            className='text-zinc-600'
          >
            {t.Utility.DismissAll}
          </Button>
        </div>
      </div>
      {grammarResults.map((group, group_index) => {
        return group.diff.map((item, index) => {
          if (!item.data.length) return null;
          const isActive = item.expand;
          return (
            <m.div
              onClick={() => handleActvie(group_index, index)}
              initial={false}
              animate={isActive ? 'expand' : 'collapse'}
              variants={{
                expand: { height: 'auto' },
                collapse: { height: '72px' },
              }}
              transition={{ duration: 0.3 }}
              key={`grammar-suggestion${index}`}
              className='w-full shrink-0 cursor-pointer overflow-hidden rounded-lg border border-gray-200 hover:shadow-xl'
            >
              <div className='flex flex-1 flex-col gap-y-2 p-3'>
                <p
                  className={`${item.expand ? '' : 'line-clamp-2'} small-regular break-words leading-relaxed`}
                >
                  {item.data.map((sentence, idx) => {
                    const isAdd = sentence.status === 1;
                    const isDelete = sentence.status === 2;
                    const isModify = sentence.status === 3;
                    const isNoChange = sentence.status === 0;
                    return (
                      <SentenceFragment
                        isNoChange={isNoChange}
                        isDelete={isDelete}
                        isModify={isModify}
                        isAdd={isAdd}
                        sentence={sentence}
                        key={`${idx}-sentence`}
                      />
                    );
                  })}
                </p>
                {isActive && (
                  <div className='flex justify-end gap-x-4'>
                    <Button
                      role='button'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDismiss(index, group_index);
                      }}
                      variant={'ghost'}
                      className='subtle-regular h-max w-max rounded border border-[#AFB5FF] py-1 text-[#AFB5FF]'
                    >
                      {t.Utility.Dismiss}
                    </Button>
                    <Button
                      role='button'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAccept(group, index, group_index);
                      }}
                      variant={'ghost'}
                      className='subtle-regular h-max w-max rounded border  border-violet-500 py-1 text-violet-500'
                    >
                      {t.Utility.Accept}
                    </Button>
                  </div>
                )}
              </div>
            </m.div>
          );
        });
      })}
      <Spacer y='20' />
    </m.div>
  );
};
export default memo(Result);
