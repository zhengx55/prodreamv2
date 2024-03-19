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
        format: 'Edit language',
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
            name: 'Make academic',
            icon: <Academic />,
          },
          {
            id: 'edit-tools-03',
            label: 'improve_fluency',
            name: 'Improve fluency',
            icon: <Fluency />,
          },
          {
            id: 'edit-tools-04',
            label: 'simplify_language',
            name: 'Simplify language',
            icon: <Simplify />,
          },
          {
            id: 'edit-tools-05',
            label: 'translate',
            name: 'Translate to english',
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
            name: 'Edit length',
            icon: <Length />,
            submenu: [
              {
                id: 'edit-tools-06-01',
                name: 'Shorten',
                label: 'make_concise',
              },
              {
                id: 'edit-tools-06-02',
                name: 'Make longer',
                label: 'make_longer',
              },
            ],
          },
        ],
      },
      {
        format: 'Generate from selection',
        options: [
          {
            id: 'edit-tools-08',
            label: 'opposing_arguments',
            name: 'Write opposing argument',
            icon: <Opposing />,
          },
          {
            id: 'edit-tools-09',
            label: 'more_depth',
            name: 'Write with more depth',
            icon: <Depth />,
          },
          {
            id: 'edit-tools-10',
            label: 'summarize',
            name: 'Generate summary',
            icon: <Summary />,
          },
          {
            id: 'edit-tools-11',
            label: 'continue_write_paragraph',
            name: 'Write more content',
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
        name: 'Replace selection',
        icon: <Copilot_Replace />,
      },
      {
        id: 'copilot-operation-02',
        name: 'Insert below',
        icon: <Copilot_Insert />,
      },
      {
        id: 'copilot-operation-03',
        name: 'Try again',
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
