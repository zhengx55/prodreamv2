import {
  Copilot_Continue,
  Copilot_Edit,
  Copilot_Generate,
  Copilot_Generate_Essay,
} from '@/components/root/SvgComponents';
import { useMemo } from 'react';

export const useAiOptions = () => {
  const options = useMemo(() => {
    return [
      {
        id: 'copilot-00',
        name: 'Continue Writing',
        icon: <Copilot_Continue />,
        lable: 'continue_write_sentence',
      },
      {
        id: 'copilot-01',
        name: 'Edit tools',
        icon: <Copilot_Edit />,
        submenu: [
          {
            id: 'edit-tools-01',
            lable: 'paraphrase',
            name: 'Paraphrase',
          },
          {
            id: 'edit-tools-02',
            lable: 'more_academic',
            name: 'Make academic',
          },
          {
            id: 'edit-tools-03',
            lable: 'improve_fluency',
            name: 'Improve fluency',
          },
          {
            id: 'edit-tools-04',
            lable: 'simplify_language',
            name: 'Simplify language',
          },
          {
            id: 'edit-tools-05',
            lable: 'translate',
            name: 'Translate',
          },
          {
            id: 'edit-tools-06',
            lable: 'make_concise',
            name: 'Shorten',
          },
          {
            id: 'edit-tools-07',
            lable: 'make_longer',
            name: 'Make longer',
          },
        ],
      },
      {
        id: 'copilot-02',
        name: 'Generate from selection',
        icon: <Copilot_Generate />,
        submenu: [
          {
            id: 'edit-tools-08',
            lable: 'opposing_arguments',
            name: 'Write Opposing Argument',
          },
          {
            id: 'edit-tools-09',
            lable: 'more_depth',
            name: 'Write with more depth',
          },
          {
            id: 'edit-tools-10',
            lable: 'summarize',
            name: 'Generate summary',
          },
        ],
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const operations = useMemo(() => {
    return [
      {
        id: 'copilot-operation-01',
        name: 'Replace selection',
        icon: <Copilot_Edit />,
      },
      {
        id: 'copilot-operation-02',
        name: 'Insert below',
        icon: <Copilot_Generate />,
      },
      {
        id: 'copilot-operation-03',
        name: 'Try again',
        icon: <Copilot_Continue />,
      },
      {
        id: 'copilot-operation-04',
        name: 'Discard',
        icon: <Copilot_Generate_Essay />,
      },
    ];
  }, []);

  return { options, operations };
};
