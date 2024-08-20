import Icon from '@/components/root/Icon';
import { useMemo } from 'react';

export const useCopilotOptions = () => {
  const options = useMemo(() => {
    return [
      {
        format: 'Edit language',
        options: [
          {
            id: 'edit-tools-01',
            label: 'paraphrase',
            name: 'Paraphrase',
            icon: (
              <Icon
                alt='paraphrase'
                src='/editor/copilot/paraphrase.svg'
                width={20}
                height={20}
                className='h-auto w-3'
              />
            ),
          },
          {
            id: 'edit-tools-02',
            label: 'more_academic',
            name: 'Make academic',
            icon: (
              <Icon
                alt='academic'
                src='/editor/copilot/academic.svg'
                width={20}
                height={20}
                className='h-auto w-3'
              />
            ),
          },
          {
            id: 'edit-tools-03',
            label: 'improve_fluency',
            name: 'Improve fluency',
            icon: (
              <Icon
                alt='fluency'
                src='/editor/copilot/fluency.svg'
                width={20}
                height={20}
                className='h-auto w-3'
              />
            ),
          },
          {
            id: 'edit-tools-04',
            label: 'simplify_language',
            name: 'Simplify language',
            icon: (
              <Icon
                alt='simplify'
                src='/editor/copilot/simplify.svg'
                width={20}
                height={20}
                className='h-auto w-3'
              />
            ),
          },
          {
            id: 'edit-tools-05',
            label: 'translate',
            name: 'Translate to english',
            icon: (
              <Icon
                alt='transfer'
                src='/editor/copilot/transfer.svg'
                width={20}
                height={20}
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
                alt='humanize'
                src='/editor/copilot/humanize.svg'
                width={20}
                height={20}
                className='h-auto w-3'
              />
            ),
          },
          {
            id: 'edit-tools-06',
            name: 'Edit length',

            icon: (
              <Icon
                alt='length'
                src='/editor/copilot/length.svg'
                width={20}
                height={20}
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
        format: 'Generate from selection',
        options: [
          {
            id: 'edit-tools-08',
            label: 'opposing_arguments',
            name: 'Write opposing argument',
            icon: (
              <Icon
                alt='opposite'
                src='/editor/copilot/opposite.svg'
                width={20}
                height={20}
                className='h-auto w-3'
              />
            ),
          },
          {
            id: 'edit-tools-09',
            label: 'more_depth',
            name: 'Write with more depth',
            icon: (
              <Icon
                alt='depth'
                src='/editor/copilot/depth.svg'
                width={20}
                height={20}
                className='h-auto w-3'
              />
            ),
          },
          {
            id: 'edit-tools-20',
            label: 'summarize',
            name: 'Generate summary',
            icon: (
              <Icon
                alt='summary'
                src='/editor/copilot/summary.svg'
                width={20}
                height={20}
                className='h-auto w-3'
              />
            ),
          },
          {
            id: 'edit-tools-11',
            label: 'continue_write_paragraph',
            name: 'Write more content',
            icon: (
              <Icon
                alt='more'
                src='/editor/copilot/more.svg'
                width={20}
                height={20}
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
        name: 'Replace selection',
        icon: (
          <Icon
            alt='summary'
            src='/editor/copilot/replace.svg'
            width={20}
            height={20}
            className='h-auto w-3'
          />
        ),
      },
      {
        id: 'copilot-operation-02',
        name: 'Insert below',
        icon: (
          <Icon
            alt='summary'
            src='/editor/copilot/insert.svg'
            width={20}
            height={20}
            className='h-auto w-3'
          />
        ),
      },
      {
        id: 'copilot-operation-03',
        name: 'Try again',
        icon: (
          <Icon
            alt='summary'
            src='/editor/copilot/try.svg'
            width={20}
            height={20}
            className='h-auto w-3'
          />
        ),
      },
      {
        id: 'copilot-operation-04',
        name: 'Discard',
        icon: (
          <Icon
            alt='summary'
            src='/editor/copilot/discard.svg'
            width={20}
            height={20}
            className='h-auto w-3'
          />
        ),
      },
    ];
  }, []);

  return { options, operations };
};
