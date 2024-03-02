import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { findNodePos, findParagpraph } from '@/lib/tiptap/utils';
import { createRegex } from '@/lib/utils';
import { IGrammarResult } from '@/query/type';
import { useAIEditor } from '@/zustand/store';
import useUnmount from 'beautiful-react-hooks/useUnmount';
import { m } from 'framer-motion';
import { v4 } from 'uuid';
import { useEditorCommand } from '../../hooks/useEditorCommand';
import SentenceFragment from './SentenceFragment';

type Props = {
  grammarResults: IGrammarResult[];
  updateGrammarResult: (value: IGrammarResult[]) => void;
};
const Result = ({ grammarResults, updateGrammarResult }: Props) => {
  const editor = useAIEditor((state) => state.editor_instance);
  const handleDismiss = (index: number, group_index: number) => {
    const array = [...grammarResults];
    updateGrammarResult(
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

  const hightLightSentence = (
    current_suggestion: IGrammarResult,
    index: number
  ) => {
    if (!editor) return;
    const blocks = editor.getJSON().content?.slice(1) ?? [];
    let found = findParagpraph(current_suggestion.index, blocks)?.text ?? '';
    if (!found) return;
    const { nodePos } = findNodePos(editor, found);
    const original_sentence =
      current_suggestion.diff.at(index)?.data.reduce((acc, current) => {
        if (current.status !== 1) {
          return acc + current.sub_str;
        } else {
          return acc + '';
        }
      }, '') ?? '';
    const sentence_position = found.indexOf(original_sentence.trimEnd());
    if (sentence_position === undefined) return;
    current_suggestion.diff.at(index)?.data.forEach((sentence) => {
      if (sentence.status === 3 || sentence.status === 2) {
        let substring_regex = createRegex(sentence.sub_str.trim());
        const modification_postion = original_sentence.search(substring_regex);
        const from = modification_postion + nodePos + sentence_position;
        const to =
          modification_postion +
          nodePos +
          sentence_position +
          sentence.sub_str.length -
          1;
        command.highLightAtPosition(from, to);
      }
    });
  };

  const handleAccept = (
    item: IGrammarResult,
    index: number,
    group_index: number
  ) => {
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
    handleDismiss(index, group_index);
  };

  const handleAcceptAll = () => {
    grammarResults.map((group, group_index) => {
      group.diff.map((_item, index) => {
        handleAccept(group, index, group_index);
      });
    });
    updateGrammarResult([]);
  };

  const handleDismissAll = () => {
    updateGrammarResult([]);
  };

  const handleActvie = (group_index: number, index: number) => {
    command.clearAllHightLight();
    const current_suggestion = grammarResults.at(group_index);
    hightLightSentence(current_suggestion!, index);
    updateGrammarResult(
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
          <h2 className='base-semibold'>All Suggestions</h2>
        </div>
        <div className='flex items-center'>
          <Button
            onClick={handleAcceptAll}
            variant={'secondary'}
            className='border-none text-doc-primary'
          >
            Accept all
          </Button>
          <Button
            onClick={handleDismissAll}
            variant={'ghost'}
            className='text-doc-shadow'
          >
            Reject all
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
              className='w-full shrink-0 cursor-pointer overflow-hidden rounded-lg border border-shadow-border hover:shadow-xl'
            >
              <div className='flex flex-1 flex-col gap-y-2 p-3'>
                <p
                  className={`${item.expand ? '' : 'line-clamp-2'} small-regular break-words leading-relaxed`}
                >
                  {item.data.map((sentence) => {
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
                        key={v4()}
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
                      Dismiss
                    </Button>
                    <Button
                      role='button'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAccept(group, index, group_index);
                      }}
                      variant={'ghost'}
                      className='subtle-regular h-max w-max rounded border  border-doc-primary py-1 text-doc-primary'
                    >
                      Accept
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
export default Result;
