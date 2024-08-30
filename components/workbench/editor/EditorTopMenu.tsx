import Icon from '@/components/root/Icon';
import ContentTypePicker from '@/components/workbench/editor/ContentPicker';
import type { Editor } from '@tiptap/react';
import { List } from 'lucide-react';
import { useTranslations } from 'next-intl';
import FontsizePicker from './FontsizePicker';
import { useTextmenuCommands } from './hooks/useTextMenuCommand';
import { useTextmenuContentTypes } from './hooks/useTextmenuContentType';
import { useTextmenuStates } from './hooks/useTextmenuStates';
import { Toolbar } from './Toolbar';

type Props = { editor: Editor };

const EditorTopMenu = ({ editor }: Props) => {
  const commands = useTextmenuCommands(editor);
  const transEditor = useTranslations('Editor');
  const states = useTextmenuStates(editor);
  const blockOptions = useTextmenuContentTypes(editor);
  return (
    <div className='flex-center absolute top-0 h-[41px] w-full gap-x-2 border-b border-gray-300 bg-white'>
      <Toolbar.Button
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
      </Toolbar.Button>
      <Toolbar.Button
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
      </Toolbar.Button>
      <Toolbar.Divider className='mx-2' />
      <ContentTypePicker options={blockOptions} />
      <FontsizePicker
        onChange={commands.onSetFontSize}
        value={states.currentSize}
      />
      <Toolbar.Divider className='mx-2' />
      <Toolbar.Button
        onMouseDown={(e) => e.preventDefault()}
        tooltip={transEditor('BubbleMenu.Bold')}
        tooltipShortcut={['Mod', 'B']}
        onClick={commands.onBold}
        active={states.isBold}
      >
        <Icon
          alt='bold'
          src='/editor/bold.svg'
          width={20}
          height={20}
          priority
          className='size-4'
        />
      </Toolbar.Button>
      <Toolbar.Button
        onMouseDown={(e) => e.preventDefault()}
        tooltip={transEditor('BubbleMenu.Italic')}
        tooltipShortcut={['Mod', 'I']}
        onClick={commands.onItalic}
        active={states.isItalic}
      >
        <Icon
          alt='italic'
          src='/editor/italic.svg'
          width={20}
          height={20}
          priority
          className='size-4'
        />
      </Toolbar.Button>
      <Toolbar.Button
        onMouseDown={(e) => e.preventDefault()}
        tooltip={transEditor('BubbleMenu.Underline')}
        tooltipShortcut={['Mod', 'U']}
        onClick={commands.onUnderline}
        active={states.isUnderline}
      >
        <Icon
          alt='underline'
          src='/editor/underline.svg'
          width={20}
          height={20}
          priority
          className='size-4'
        />
      </Toolbar.Button>
      <Toolbar.Button
        onMouseDown={(e) => e.preventDefault()}
        tooltip={transEditor('BubbleMenu.Strikethrough')}
        tooltipShortcut={['Mod', 'X']}
        onClick={commands.onStrike}
        active={states.isStrike}
      >
        <Icon
          alt='strike'
          src='/editor/strike.svg'
          width={20}
          height={20}
          priority
          className='size-4'
        />
      </Toolbar.Button>
      <Toolbar.Divider className='mx-2' />
      <Toolbar.Button
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive('bulletList')}
      >
        <List size={16} />
      </Toolbar.Button>
      <Toolbar.Divider className='mx-2' />
      <p className='small-regular w-20 text-zinc-500'>
        {editor.storage.characterCount.words()} words
      </p>
    </div>
  );
};

export default EditorTopMenu;
