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
        id: 'copilot-01',
        name: 'Edit tools',
        icon: <Copilot_Edit />,
        submenu: [
          {
            id: 'edit-tools-01',
            name: 'Paraphrase',
          },
          {
            id: 'edit-tools-02',
            name: 'Make academic',
          },
          {
            id: 'edit-tools-03',
            name: 'Improve fluency',
          },
          {
            id: 'edit-tools-04',
            name: 'Simplify language',
          },
          {
            id: 'edit-tools-05',
            name: 'Translate',
          },
          {
            id: 'edit-tools-06',
            name: 'Shorten',
          },
          {
            id: 'edit-tools-07',
            name: 'Make longer',
          },
        ],
      },
      {
        id: 'copilot-02',
        name: 'Generate from selection',
        icon: <Copilot_Generate />,
      },
      {
        id: 'copilot-03',
        name: 'Continue Writing',
        icon: <Copilot_Continue />,
      },
      {
        id: 'copilot-04',
        name: 'Generate from essay',
        icon: <Copilot_Generate_Essay />,
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
