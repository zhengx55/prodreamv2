import Icon from '@/components/root/Icon';
import {
  Copilot_Discard,
  Copilot_Insert,
  Copilot_Replace,
  Copilot_Try,
} from '@/components/root/SvgComponents';
import { useMemo } from 'react';

interface Option {
  id: string;
  label?: string;
  name: string;
  icon: JSX.Element;
  submenu?: SubOption[];
}

interface SubOption {
  id: string;
  label: string;
  name: string;
}

interface FormatOption {
  format: string;
  options: Option[];
}

interface Operation {
  id: string;
  name: string;
  icon: JSX.Element;
}

const createIcon = (alt: string, src: string) => (
  <Icon alt={alt} src={src} width={10} height={10} className='h-auto w-3' />
);

export const useAiOptions = () => {
  const options = useMemo<FormatOption[]>(() => {
    const format1Options: Option[] = [
      {
        id: 'edit-tools-01',
        label: 'paraphrase',
        name: 'Paraphrase',
        icon: createIcon('paraphrase', '/editor/copilot/paraphrasae.svg'),
      },
      {
        id: 'edit-tools-02',
        label: 'more_academic',
        name: 'Make_academic',
        icon: createIcon('academic', '/editor/copilot/academic.svg'),
      },
      {
        id: 'edit-tools-03',
        label: 'improve_fluency',
        name: 'Improve_fluency',
        icon: createIcon('fluency', '/editor/copilot/fluency.svg'),
      },
      {
        id: 'edit-tools-04',
        label: 'simplify_language',
        name: 'Simplify_language',
        icon: createIcon('simplify', '/editor/copilot/simplify.svg'),
      },
      {
        id: 'edit-tools-05',
        label: 'translate',
        name: 'Translate_to_english',
        icon: createIcon('translate', '/editor/copilot/translate.svg'),
      },
      {
        id: 'edit-tools-07',
        label: 'humanize',
        name: 'Humanize',
        icon: createIcon('detection', '/editor/copilot/detection.svg'),
      },
      {
        id: 'edit-tools-06',
        name: 'Edit_length',
        icon: createIcon('length', '/editor/copilot/length.svg'),
        submenu: [
          {
            id: 'edit-tools-06-01',
            name: 'Shorten',
            label: 'make_concise',
          },
          {
            id: 'edit-tools-06-02',
            name: 'Extend',
            label: 'make_longer',
          },
        ],
      },
    ];

    const format2Options: Option[] = [
      {
        id: 'edit-tools-08',
        label: 'opposing_arguments',
        name: 'Write_opposing_argument',
        icon: createIcon('opposing', '/editor/copilot/opposing.svg'),
      },
      {
        id: 'edit-tools-09',
        label: 'more_depth',
        name: 'Write_with_more_depth',
        icon: createIcon('depth', '/editor/copilot/depth.svg'),
      },
      {
        id: 'edit-tools-10',
        label: 'summarize',
        name: 'Generate_summary',
        icon: createIcon('summary', '/editor/copilot/summary.svg'),
      },
      {
        id: 'edit-tools-11',
        label: 'continue_write_paragraph',
        name: 'Write_more_content',
        icon: createIcon('morecontent', '/editor/copilot/morecontent.svg'),
      },
    ];

    return [
      { format: 'Format_1', options: format1Options },
      { format: 'Format_2', options: format2Options },
    ];
  }, []);

  const operations = useMemo<Operation[]>(() => {
    return [
      {
        id: 'copilot-operation-01',
        name: 'Replace_selection',
        icon: <Copilot_Replace />,
      },
      {
        id: 'copilot-operation-02',
        name: 'Insert_below',
        icon: <Copilot_Insert />,
      },
      {
        id: 'copilot-operation-03',
        name: 'Try_again',
        icon: <Copilot_Try />,
      },
      {
        id: 'copilot-operation-04',
        name: 'Discard',
        icon: <Copilot_Discard />,
      },
    ];
  }, []);

  return { options, operations };
};
