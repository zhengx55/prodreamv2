import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import {
  findNodePos,
  findParagpraph,
  highLightGrammar,
} from '@/lib/tiptap/utils';
import { IGrammarResult } from '@/query/type';
import { useEditor } from '@/zustand/store';
import { motion } from 'framer-motion';
import { useUnmount } from 'react-use';
import { useEditorCommand } from '../editor/hooks/useEditorCommand';
import Item from './GrammarResItem';

type Props = {
  result: IGrammarResult[];
  updateResult: (result: IGrammarResult[]) => void;
};

const GrammarResult = ({ result, updateResult }: Props) => {
  const editor = useEditor((state) => state.editor);
  const command = useEditorCommand(editor!);

  useUnmount(() => {
    command.clearAllHightLight();
  });

  const handleDismiss = (index: number, group_index: number) => {
    const array = [...result];
    updateResult(
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
  const processAccept = (item: IGrammarResult, index: number) => {
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
    const found = findParagpraph(item.index, blocks)?.text ?? '';
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
    command.grammarCheckReplace(new_string, from, to);
  };

  const handleAccept = (
    item: IGrammarResult,
    index: number,
    group_index: number
  ) => {
    processAccept(item, index);
    handleDismiss(index, group_index);
  };

  const handleActive = (group_index: number, index: number) => {
    command.clearAllHightLight();
    const current_suggestion = result.at(group_index);
    highLightGrammar(editor!, current_suggestion!, index);
    updateResult(
      result.map((el, pos) => ({
        ...el,
        diff: el.diff.map((item, idx) => ({
          ...item,
          expand: idx === index && pos === group_index,
        })),
      }))
    );
  };

  const handleAcceptAll = () => {
    result.forEach((group) => {
      group.diff.forEach((_item, index) => {
        processAccept(group, index);
      });
    });
    updateResult([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      key={'grammer-result'}
      className='flex flex-1 flex-col gap-y-4 overflow-y-auto'
    >
      <div aria-label='all suggestions' className='flex-between'>
        <div className='flex items-center gap-x-2'>
          <h2 className='small-semibold'>{result.length}&nbsp; Suggestions</h2>
        </div>
        <div className='flex items-center'>
          <Button
            onClick={handleAcceptAll}
            variant={'secondary'}
            className='border-none text-indigo-500'
          >
            Accept All
          </Button>
          <Button
            onClick={() => updateResult([])}
            variant={'ghost'}
            className='text-zinc-600'
          >
            Dismiss All
          </Button>
        </div>
      </div>
      {result.map((group, group_index) => {
        return group.diff.map((item, index) => {
          if (!item.data.length) return null;
          const isActive = item.expand;
          return (
            <motion.div
              onClick={() => handleActive(group_index, index)}
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
                      <Item
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
                        handleAccept(group, index, group_index);
                      }}
                      className='subtle-regular h-max w-max rounded px-6 py-1.5'
                    >
                      Accept
                    </Button>
                    <Button
                      role='button'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDismiss(index, group_index);
                      }}
                      variant={'outline'}
                      className='subtle-regular h-max w-max rounded px-6 py-1.5'
                    >
                      Dismiss
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          );
        });
      })}
      <Spacer y='20' />
    </motion.div>
  );
};

export default GrammarResult;
