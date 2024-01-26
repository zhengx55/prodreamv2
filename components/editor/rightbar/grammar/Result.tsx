import SentenceFragment from '@/components/editor/rightbar/grammar/SentenceFragment';
import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { getDiffSentencesPair } from '@/lib/utils';
import { IPolishResultAData } from '@/query/type';
import useAiEditor from '@/zustand/store';
import escapeStringRegExp from 'escape-string-regexp';
import { m } from 'framer-motion';
import { useEditorCommand } from '../../hooks/useEditorCommand';

type Props = {
  grammarResults: IPolishResultAData[];
  updateGrammarResult: (value: IPolishResultAData[]) => void;
};
const Result = ({ grammarResults, updateGrammarResult }: Props) => {
  const editor = useAiEditor((state) => state.editor_instance);
  const handleDismiss = (index: number) => {
    updateGrammarResult(grammarResults.filter((el, pos) => pos !== index));
  };
  const command = useEditorCommand(editor!);

  const hightLightSentence = (
    current_suggestion: IPolishResultAData,
    corrsponding_segement: string
  ) => {
    if (!editor) return;
    let start_position = editor.getText().indexOf(corrsponding_segement.trim());
    if ([1, 2, 3].includes(current_suggestion.data.at(0)!.status)) {
      start_position -= 1;
    }
    current_suggestion.data.forEach((suggestion) => {
      if ([2, 3].includes(suggestion.status)) {
        let substring_regex: RegExp;
        if (/[^\w\s]+/g.test(suggestion.sub_str)) {
          substring_regex = new RegExp(
            escapeStringRegExp(suggestion.sub_str),
            'g'
          );
        } else {
          substring_regex = new RegExp(`\\b${suggestion.sub_str}\\b`, 'g');
        }
        const position = corrsponding_segement!.search(substring_regex);
        if (position === -1) return;
        command.highLightAtPosition(
          position + start_position + 1,
          position + start_position + suggestion.sub_str.length + 1
        );
      }
    });
  };

  const handleAccept = (index: number, item: IPolishResultAData) => {
    if (!editor) return;
    const { original_string, relpace_string } = getDiffSentencesPair(item);
    // 查找文字内容 删除旧内容 并插入新内容
    const original_range = editor.getText().indexOf(original_string.trim());
    if (original_range === -1) {
      handleDismiss(index);
      return;
    }
    const from = original_range + 1;
    const to = original_range + original_string.trim().length + 1;
    command.grammarCheckReplace(relpace_string, from, to);
    handleDismiss(index);
  };
  const handleAcceptAll = () => {
    updateGrammarResult([]);
  };
  const handleDismissAll = () => {
    updateGrammarResult([]);
  };

  const handleActvie = (index: number) => {
    command.clearAllHightLight();
    const current_suggestion = grammarResults.at(index);
    console.log('🚀 ~ handleActvie ~ current_suggestion:', current_suggestion);
    const { original_string } = getDiffSentencesPair(current_suggestion!);
    hightLightSentence(current_suggestion!, original_string);
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
        if (item.data.every((item) => item.status === 0)) {
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
                      key={`sentence-${index}-${idx}`}
                    />
                  );
                })}
              </p>
              {isActive && (
                <div className='flex justify-end gap-x-4'>
                  <Button
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
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAccept(index, item);
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
