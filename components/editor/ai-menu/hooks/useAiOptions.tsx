import {
  Academic,
  Copilot_Discard,
  Copilot_Insert,
  Copilot_Replace,
  Copilot_Try,
  Depth,
  Fluency,
  Length,
  MoreContent,
  Opposing,
  Paraphrase,
  Simplify,
  Summary,
  Translate,
  Undetectable,
} from '@/components/root/SvgComponents';
import { useMemo } from 'react';

export const useAiOptions = () => {
  const options = useMemo(() => {
    return [
      {
        format: 'Format_1',
        options: [
          {
            id: 'edit-tools-01',
            label: 'paraphrase',
            name: 'Paraphrase',
            icon: <Paraphrase />,
          },
          {
            id: 'edit-tools-02',
            label: 'more_academic',
            name: 'Make_academic',
            icon: <Academic />,
          },
          {
            id: 'edit-tools-03',
            label: 'improve_fluency',
            name: 'Improve_fluency',
            icon: <Fluency />,
          },
          {
            id: 'edit-tools-04',
            label: 'simplify_language',
            name: 'Simplify_language',
            icon: <Simplify />,
          },
          {
            id: 'edit-tools-05',
            label: 'translate',
            name: 'Translate_to_english',
            icon: <Translate />,
          },
          {
            id: 'edit-tools-07',
            label: 'humanize',
            name: 'Humanize',
            icon: <Undetectable />,
          },
          {
            id: 'edit-tools-06',
            name: 'Edit_length',
            icon: <Length />,
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
        ],
      },
      {
        format: 'Format_2',
        options: [
          {
            id: 'edit-tools-08',
            label: 'opposing_arguments',
            name: 'Write_opposing_argument',
            icon: <Opposing />,
          },
          {
            id: 'edit-tools-09',
            label: 'more_depth',
            name: 'Write_with_more_depth',
            icon: <Depth />,
          },
          {
            id: 'edit-tools-10',
            label: 'summarize',
            name: 'Generate_summary',
            icon: <Summary />,
          },
          {
            id: 'edit-tools-11',
            label: 'continue_write_paragraph',
            name: 'Write_more_content',
            icon: <MoreContent />,
          },
        ],
      },
    ];
  }, []);

  const operations = useMemo(() => {
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
