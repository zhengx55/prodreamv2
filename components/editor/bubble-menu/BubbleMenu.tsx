import { Toolbar } from '@/components/editor/ui/Toolbar';
import Icon from '@/components/root/Icon';
import useAIEditor from '@/zustand/store';
import * as Popover from '@radix-ui/react-popover';
import { Editor } from '@tiptap/react';
import { m } from 'framer-motion';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  MoreVertical,
  Strikethrough,
  Underline,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { memo } from 'react';
import { ContentTypePicker } from '../picker/content';
import useEventListener from './hooks/useEventListener';
import { useTextmenuCommands } from './hooks/useTextMenuCommand';
import { useTextmenuContentTypes } from './hooks/useTextmenuContentType';
import { useTextmenuStates } from './hooks/useTextmenuStates';

const MemoButton = memo(Toolbar.Button);
const MemoContentTypePicker = memo(ContentTypePicker);

export type TextMenuProps = {
  editor: Editor;
};

const BubbleMenu = ({ editor }: TextMenuProps) => {
  const states = useTextmenuStates(editor);
  const blockOptions = useTextmenuContentTypes(editor);
  const commands = useTextmenuCommands(editor);
  const updateCopilotMenu = useAIEditor((state) => state.updateCopilotMenu);
  const updateFloatingMenuPos = useAIEditor(
    (state) => state.updateFloatingMenuPos
  );
  const updateCitationMenu = useAIEditor((state) => state.updateCitationMenu);
  const updateSynonymMenu = useAIEditor((state) => state.updateSynonymMenu);
  const showBubbleMenu = useAIEditor((state) => state.showBubbleMenu);
  const transEditor = useTranslations('Editor');
  const updateShowBubbleMenu = useAIEditor(
    (state) => state.updateShowBubbleMenu
  );
  const {
    refs,
    x,
    y,
    strategy,
    isWord,
    selectedLength,
    menuXOffside,
    menuYOffside,
  } = useEventListener(editor);
  if (!showBubbleMenu) return null;
  return (
    <m.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      ref={refs.setFloating}
      style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
      className='z-[99]'
    >
      <Toolbar.Wrapper className='border-shadow-borde relative border shadow-lg'>
        <MemoButton
          id='copilot-button'
          onMouseDown={(e) => e.preventDefault()}
          onClick={async (e) => {
            updateCopilotMenu(true);
            updateFloatingMenuPos({
              top: menuYOffside.current ?? 0,
              left: menuXOffside.current ?? 0,
            });
            updateShowBubbleMenu(false);
            editor.chain().setHighlight({ color: '#D4D7FF' }).run();
          }}
          className='text-violet-500'
        >
          <Icon
            alt=''
            src='/editor/stars.svg'
            width={18}
            height={18}
            className='size-[18px]'
          />
          {transEditor('BubbleMenu.Copilot')}
        </MemoButton>
        <Toolbar.Divider />
        {isWord ? (
          <MemoButton
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              updateSynonymMenu(true);
              updateFloatingMenuPos({
                top: menuYOffside.current ?? 0,
                left: menuXOffside.current ?? 0,
              });
              updateShowBubbleMenu(false);
              editor.chain().setHighlight({ color: '#D4D7FF' }).run();
            }}
            className='text-violet-500'
          >
            <Icon
              alt=''
              src='/editor/synonym.svg'
              width={18}
              height={18}
              className='size-[18px]'
            />
            {transEditor('BubbleMenu.Synonym')}
          </MemoButton>
        ) : (
          <MemoButton
            tooltip={transEditor('BubbleMenu.tooltip_citation')}
            onMouseDown={(e) => e.preventDefault()}
            onClick={async () => {
              if (selectedLength >= 160) {
                const toast = (await import('sonner')).toast;
                toast.warning('Citation is limited to 160 words');
                return;
              }
              updateCitationMenu(true);
              updateFloatingMenuPos({
                top: menuYOffside.current ?? 0,
                left: menuXOffside.current ?? 0,
              });
              updateShowBubbleMenu(false);
              editor.chain().setHighlight({ color: '#D4D7FF' }).run();
            }}
            className='text-violet-500'
          >
            <Icon
              alt=''
              src='/editor/book-half.svg'
              width={18}
              height={18}
              className='size-[18px]'
              priority
            />
            {transEditor('BubbleMenu.Reference')}
          </MemoButton>
        )}
        <Toolbar.Divider />
        <MemoContentTypePicker options={blockOptions} />
        <MemoButton
          onMouseDown={(e) => e.preventDefault()}
          tooltip={transEditor('BubbleMenu.Undo')}
          tooltipShortcut={['Mod', 'Z']}
          onClick={commands.onUndo}
        >
          <Icon
            alt=''
            src='/editor/undo.svg'
            width={18}
            height={18}
            className='size-[18px]'
          />
        </MemoButton>
        <MemoButton
          onMouseDown={(e) => e.preventDefault()}
          tooltip={transEditor('BubbleMenu.Redo')}
          tooltipShortcut={['Mod', 'Y']}
          onClick={commands.onRedo}
        >
          <Icon
            alt=''
            src='/editor/redo.svg'
            width={18}
            height={18}
            className='size-[18px]'
          />
        </MemoButton>
        <Toolbar.Divider />
        <MemoButton
          onMouseDown={(e) => e.preventDefault()}
          tooltip={transEditor('BubbleMenu.Bold')}
          tooltipShortcut={['Mod', 'B']}
          onClick={commands.onBold}
          active={states.isBold}
        >
          <Bold size={16} />
        </MemoButton>
        <MemoButton
          onMouseDown={(e) => e.preventDefault()}
          tooltip={transEditor('BubbleMenu.Italic')}
          tooltipShortcut={['Mod', 'I']}
          onClick={commands.onItalic}
          active={states.isItalic}
        >
          <Italic size={16} />
        </MemoButton>
        <MemoButton
          onMouseDown={(e) => e.preventDefault()}
          tooltip={transEditor('BubbleMenu.Underline')}
          tooltipShortcut={['Mod', 'U']}
          onClick={commands.onUnderline}
          active={states.isUnderline}
        >
          <Underline size={16} />
        </MemoButton>
        <MemoButton
          onMouseDown={(e) => e.preventDefault()}
          tooltip={transEditor('BubbleMenu.Strikethrough')}
          tooltipShortcut={['Mod', 'X']}
          onClick={commands.onStrike}
          active={states.isStrike}
        >
          <Strikethrough size={16} />
        </MemoButton>
        <Popover.Root>
          <Popover.Trigger asChild>
            <MemoButton
              onMouseDown={(e) => e.preventDefault()}
              tooltip={transEditor('BubbleMenu.More_options')}
            >
              <MoreVertical size={16} />
            </MemoButton>
          </Popover.Trigger>
          <Popover.Content
            onPointerDown={(e) => e.preventDefault()}
            side='top'
            asChild
          >
            <Toolbar.Wrapper>
              <MemoButton
                tooltip={transEditor('BubbleMenu.Align_Left')}
                tooltipShortcut={['Shift', 'Mod', 'L']}
                onClick={commands.onAlignLeft}
                active={states.isAlignLeft}
              >
                <AlignLeft size={16} />
              </MemoButton>
              <MemoButton
                tooltip={transEditor('BubbleMenu.Align_Center')}
                tooltipShortcut={['Shift', 'Mod', 'E']}
                onClick={commands.onAlignCenter}
                active={states.isAlignCenter}
              >
                <AlignCenter size={16} />
              </MemoButton>
              <MemoButton
                tooltip={transEditor('BubbleMenu.Align_Right')}
                tooltipShortcut={['Shift', 'Mod', 'R']}
                onClick={commands.onAlignRight}
                active={states.isAlignRight}
              >
                <AlignRight size={16} />
              </MemoButton>
              <MemoButton
                tooltip={transEditor('BubbleMenu.Justify')}
                tooltipShortcut={['Shift', 'Mod', 'J']}
                onClick={commands.onAlignJustify}
                active={states.isAlignJustify}
              >
                <AlignJustify size={16} />
              </MemoButton>
            </Toolbar.Wrapper>
          </Popover.Content>
        </Popover.Root>
        <span className='flex h-full items-center px-2'>
          <p className='small-regular text-shadow'>
            {selectedLength}
            &nbsp;{transEditor('BubbleMenu.words')}
          </p>
        </span>
      </Toolbar.Wrapper>
    </m.div>
  );
};

export default memo(BubbleMenu);
