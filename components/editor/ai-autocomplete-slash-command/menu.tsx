import React, { useCallback, useEffect, useRef, useState } from 'react';

import { DropdownButton } from '@/components/ui/dropdown-button';
import { Surface } from '@/components/ui/surface';
import { Command, MenuListProps } from '@/lib/tiptap/type';

export const AutoCompleteMenuList = React.forwardRef(
  (props: MenuListProps, ref) => {
    const scrollContainer = useRef<HTMLDivElement>(null);
    const activeItem = useRef<HTMLButtonElement>(null);
    const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
    const [selectedCommandIndex, setSelectedCommandIndex] = useState(0);

    useEffect(() => {
      setSelectedGroupIndex(0);
      setSelectedCommandIndex(-1);
    }, [props.items]);

    const selectItem = useCallback(
      (groupIndex: number, commandIndex: number) => {
        const command = props.items[groupIndex].commands[commandIndex];
        console.log(command);
        props.command(command);
      },
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
