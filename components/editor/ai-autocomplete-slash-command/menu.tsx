import React, { useCallback, useEffect, useRef, useState } from 'react';

import { DropdownButton } from '@/components/ui/dropdown-button';
import { Surface } from '@/components/ui/surface';
import { Command, MenuListProps } from '@/lib/tiptap/type';
import { copilot } from '@/query/api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const AutoCompleteMenuList = React.forwardRef(
  (props: MenuListProps, ref) => {
    const scrollContainer = useRef<HTMLDivElement>(null);
    const activeItem = useRef<HTMLButtonElement>(null);
    const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
    const [selectedCommandIndex, setSelectedCommandIndex] = useState(0);

    const { mutateAsync: handleCopilot } = useMutation({
      mutationFn: (params: { tool: string; text: string }) => copilot(params),
      onSuccess: async (data: ReadableStream) => {
        const reader = data.pipeThrough(new TextDecoderStream()).getReader();
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          handleStreamData(value);
        }
      },

      onError: (error) => {
        toast.error(error.message);
      },
    });

    const handleStreamData = (value: string | undefined) => {
      if (!value) return;
      const lines = value.split('\n');
      const dataLines = lines.filter(
        (line, index) =>
          line.startsWith('data:') &&
          lines.at(index - 1)?.startsWith('event: data')
      );
      const eventData = dataLines.map((line) =>
        JSON.parse(line.slice('data:'.length))
      );
      let result = '';
      eventData.forEach((word) => {
        result += word;
      });
      props.editor.commands.insertContent(result, {
        parseOptions: {
          preserveWhitespace: 'full',
        },
      });
    };

    useEffect(() => {
      setSelectedGroupIndex(0);
      setSelectedCommandIndex(-1);
    }, [props.items]);

    const selectItem = useCallback(
      async (groupIndex: number, commandIndex: number) => {
        const command = props.items[groupIndex].commands[commandIndex];
        const { selection } = props.editor.state;
        let original_paragraph = selection.$head.parent.textContent;
        if (original_paragraph.trim() === '/') {
          original_paragraph = selection.$head.doc.textBetween(
            0,
            selection.$head.before()
          );
        }
        props.command(command);
        await handleCopilot({
          tool: command.apiEndpoint!,
          text: original_paragraph,
        });
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [props]
    );

    React.useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }: { event: React.KeyboardEvent }) => {
        if (event.key === 'ArrowDown') {
          if (!props.items.length) {
            return false;
          }
          const commands = props.items[selectedGroupIndex].commands;
          let newCommandIndex = selectedCommandIndex + 1;
          let newGroupIndex = selectedGroupIndex;
          if (commands.length - 1 < newCommandIndex) {
            newCommandIndex = 0;
            newGroupIndex = selectedGroupIndex + 1;
          }
          if (props.items.length - 1 < newGroupIndex) {
            newGroupIndex = 0;
          }
          setSelectedCommandIndex(newCommandIndex);
          setSelectedGroupIndex(newGroupIndex);

          return true;
        }

        if (event.key === 'ArrowUp') {
          if (!props.items.length) {
            return false;
          }

          let newCommandIndex = selectedCommandIndex - 1;
          let newGroupIndex = selectedGroupIndex;

          if (newCommandIndex < 0) {
            newGroupIndex = selectedGroupIndex - 1;
            newCommandIndex =
              props.items[newGroupIndex]?.commands.length - 1 || 0;
          }
          if (newGroupIndex < 0) {
            newGroupIndex = props.items.length - 1;
            newCommandIndex = props.items[newGroupIndex].commands.length - 1;
          }
          setSelectedCommandIndex(newCommandIndex);
          setSelectedGroupIndex(newGroupIndex);

          return true;
        }

        if (event.key === 'Enter') {
          if (
            !props.items.length ||
            selectedGroupIndex === -1 ||
            selectedCommandIndex === -1
          ) {
            return false;
          }

          selectItem(selectedGroupIndex, selectedCommandIndex);

          return true;
        }

        return false;
      },
    }));

    useEffect(() => {
      if (activeItem.current && scrollContainer.current) {
        const offsetTop = activeItem.current.offsetTop;
        const offsetHeight = activeItem.current.offsetHeight;
        scrollContainer.current.scrollTop = offsetTop - offsetHeight;
      }
    }, [selectedCommandIndex, selectedGroupIndex]);

    const createCommandClickHandler = useCallback(
      (groupIndex: number, commandIndex: number) => {
        return () => {
          selectItem(groupIndex, commandIndex);
        };
      },
      [selectItem]
    );

    if (!props.items.length) {
      return null;
    }

    return (
      <Surface
        ref={scrollContainer}
        withBorder
        withShadow
        className='max-h-[min(80vh,24rem)] w-[200px] flex-wrap overflow-auto p-1 text-black-400'
      >
        <div className='grid grid-cols-1 gap-0.5'>
          {props.items.map((group, groupIndex: number) => (
            <React.Fragment key={`${group.title}-wrapper`}>
              {group.commands.map((command: Command, commandIndex: number) => (
                <DropdownButton
                  key={`${command.label}`}
                  isActive={
                    selectedGroupIndex === groupIndex &&
                    selectedCommandIndex === commandIndex
                  }
                  onClick={createCommandClickHandler(groupIndex, commandIndex)}
                >
                  {command.label}
                </DropdownButton>
              ))}
            </React.Fragment>
          ))}
        </div>
      </Surface>
    );
  }
);

AutoCompleteMenuList.displayName = 'AutoCompleteMenuList';

export default AutoCompleteMenuList;
