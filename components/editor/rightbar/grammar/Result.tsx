import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { findNodePos, findParagpraph } from '@/lib/tiptap/utils';
import { createRegex } from '@/lib/utils';
import { IPolishResultAData } from '@/query/type';
import useAiEditor from '@/zustand/store';
import useUnmount from 'beautiful-react-hooks/useUnmount';
import { m } from 'framer-motion';
import { useEditorCommand } from '../../hooks/useEditorCommand';
import SentenceFragment from './SentenceFragment';

type Props = {
  grammarResults: IPolishResultAData[];
  updateGrammarResult: (value: IPolishResultAData[]) => void;
};
const Result = ({ grammarResults, updateGrammarResult }: Props) => {
  const editor = useAiEditor((state) => state.editor_instance);
  const handleDismiss = (index: number) => {
    updateGrammarResult(grammarResults.filter((_el, pos) => pos !== index));
  };
  const command = useEditorCommand(editor!);
  useUnmount(() => {
    command.clearAllHightLight();
  });

  const hightLightSentence = (current_suggestion: IPolishResultAData) => {
    if (!editor) return;
    const blocks = editor.getJSON().content?.slice(1) ?? [];
    let found = findParagpraph(current_suggestion.index, blocks)?.text ?? '';
    if (!found) return;
    const { nodePos } = findNodePos(editor, found);
    let substring = found;
    let removed_length = 0;
    current_suggestion.diff.forEach((sentence) => {
      if (sentence.status === 3 || sentence.status === 2) {
        let substring_regex = createRegex(sentence.sub_str.trim());
        const modification_postion = substring.search(substring_regex);
        const from = modification_postion + nodePos + removed_length;
        const to =
          modification_postion +
          nodePos +
          removed_length +
          sentence.sub_str.length -
          1;
        command.highLightAtPosition(from, to);
      }
      if (sentence.sub_str.trim()) {
        substring = substring.replace(sentence.sub_str, '');
        removed_length += sentence.sub_str.length;
      }
    });
  };

  const handleAccept = (item: IPolishResultAData, index: number) => {
    if (!editor) return;
    const blocks = editor.getJSON().content?.slice(1) ?? [];
    const new_string = item.diff.reduce((acc, current) => {
      if (current.status === 0) {
        return acc + current.sub_str;
      } else {
        return acc + current.new_str;
      }
    }, '');
    let found = findParagpraph(item.index, blocks)?.text ?? '';
    if (!found) return;
    const { nodePos } = findNodePos(editor, found);
    editor
      .chain()
      .focus()
      .setNodeSelection(nodePos)
      .selectParentNode()
      .insertContent(new_string)
      .run();
  };

  const handleAcceptAll = () => {
    grammarResults.map((item, index) => {
      handleAccept(item, index);
    });
    updateGrammarResult([]);
  };

  const handleDismissAll = () => {
    updateGrammarResult([]);
  };

  const handleActvie = (index: number) => {
    command.clearAllHightLight();
    const current_suggestion = grammarResults.at(index);
    hightLightSentence(current_suggestion!);
    updateGrammarResult(
      grammarResults.map((el, postion) => {
        if (postion === index) {
          if (el.expand) return el;
          return { ...el, expand: true };
        } else {
          if (el.expand) return { ...el, expand: false };
          return el;
        }
      })
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
      {grammarResults.map((item, index) => {
        if (item.diff.every((item) => item.status === 0)) {
          return null;
        }
        const isActive = item.expand;
        return (
          <m.div
            onClick={() => handleActvie(index)}
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
                className={`${item.expand ? '' : ' line-clamp-2'} small-regular break-words leading-relaxed`}
              >
                {item.diff.map((sentence, idx) => {
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
                      key={`sentence-${index}-${idx}`}
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
                      handleDismiss(index);
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
                      handleAccept(item, index);
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
      })}
      <Spacer y='20' />
    </m.div>
  );
};
export default Result;
