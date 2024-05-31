import Icon from '@/components/root/Icon';
import {
  Copilot_Discard,
  Copilot_Insert,
  Copilot_Replace,
  Copilot_Try,
} from '@/components/root/SvgComponents';
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';

export const useAiOptions = () => {
  const trans = useTranslations('Editor');

  const options = useMemo(() => {
    return [
      {
        format: 'Format_1',
        options: [
          {
            id: 'edit-tools-01',
            label: 'paraphrase',
            name: 'Paraphrase',
            icon: (
              <Icon
                alt='paraphrase'
                src='/editor/copilot/paraphrasae.svg'
                width={10}
                height={10}
                className='h-auto w-3'
              />
            ),
          },
          {
            id: 'edit-tools-02',
            label: 'more_academic',
            name: 'Make_academic',
            icon: (
              <Icon
                alt='academic'
                src='/editor/copilot/academic.svg'
                width={10}
                height={10}
                className='h-auto w-3'
              />
            ),
          },
          {
            id: 'edit-tools-03',
            label: 'improve_fluency',
            name: 'Improve_fluency',
            icon: (
              <Icon
                alt='fluency'
                src='/editor/copilot/fluency.svg'
                width={10}
                height={10}
                className='h-auto w-3'
              />
            ),
          },
          {
            id: 'edit-tools-04',
            label: 'simplify_language',
            name: 'Simplify_language',
            icon: (
              <Icon
                alt='simplify'
                src='/editor/copilot/simplify.svg'
                width={10}
                height={10}
                className='h-auto w-3'
              />
            ),
          },
          {
            id: 'edit-tools-05',
            label: 'translate',
            name: 'Translate_to_english',
            icon: (
              <Icon
                alt='translate'
                src='/editor/copilot/translate.svg'
                width={10}
                height={10}
                className='h-auto w-3'
              />
            ),
          },
          {
            id: 'edit-tools-07',
            label: 'humanize',
            name: 'Humanize',
            icon: (
              <Icon
                alt='detection'
                src='/editor/copilot/detection.svg'
                width={10}
                height={10}
                className='h-auto w-3'
              />
            ),
          },
          {
            id: 'edit-tools-06',
            name: 'Edit_length',
            icon: (
              <Icon
                alt='length'
                src='/editor/copilot/length.svg'
                width={10}
                height={10}
                className='h-auto w-3'
              />
            ),
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
            icon: (
              <Icon
                alt='opposing'
                src='/editor/copilot/opposing.svg'
                width={10}
                height={10}
                className='h-auto w-3'
              />
            ),
          },
          {
            id: 'edit-tools-09',
            label: 'more_depth',
            name: 'Write_with_more_depth',
            icon: (
              <Icon
                alt='depth'
                src='/editor/copilot/depth.svg'
                width={10}
                height={10}
                className='h-auto w-3'
              />
            ),
          },
          {
            id: 'edit-tools-10',
            label: 'summarize',
            name: 'Generate_summary',
            icon: (
              <Icon
                alt='summary'
                src='/editor/copilot/summary.svg'
                width={10}
                height={10}
                className='h-auto w-3'
              />
            ),
          },
          {
            id: 'edit-tools-11',
            label: 'continue_write_paragraph',
            name: 'Write_more_content',
            icon: (
              <Icon
                alt='morecontent'
                src='/editor/copilot/morecontent.svg'
                width={10}
                height={10}
                className='h-auto w-3'
              />
            ),
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
