import { Toolbar } from '@/components/editor/ui/Toolbar';
import { DropdownButton } from '@/components/ui/dropdown-button';

import { Surface } from '@/components/ui/surface';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import { ChevronsUpDown, Type } from 'lucide-react';
import { ReactNode, useMemo } from 'react';

export type ContentTypePickerOption = {
  label: string;
  id: string;
  type: 'option';
  disabled: () => boolean;
  isActive: () => boolean;
  onClick: () => void;
  icon: ReactNode;
};

export type ContentTypePickerCategory = {
  label: string;
  id: string;
  type: 'category';
};

export type ContentPickerOptions = Array<
  ContentTypePickerOption | ContentTypePickerCategory
>;

export type ContentTypePickerProps = {
  options: ContentPickerOptions;
};

const isOption = (
  option: ContentTypePickerOption | ContentTypePickerCategory
): option is ContentTypePickerOption => option.type === 'option';

export const ContentTypePicker = ({ options }: ContentTypePickerProps) => {
  const activeItem = useMemo(
    () =>
      options.find((option) => option.type === 'option' && option.isActive()),
    [options]
  );

  return (
    <Dropdown.Root>
      {activeItem ? (
        <>
          <Dropdown.Trigger asChild>
            <Toolbar.Button
              className='w-40 justify-between'
              active={activeItem?.id !== 'paragraph' && !!activeItem?.type}
            >
              <span className='inline-flex items-center gap-x-1.5'>
                {activeItem?.type === 'option' ? (
                  activeItem.icon
                ) : (
                  <Type size={16} />
                )}
                {activeItem?.label}
              </span>
              <ChevronsUpDown size={16} />
            </Toolbar.Button>
          </Dropdown.Trigger>
          <Toolbar.Divider />
        </>
      ) : null}
      <Dropdown.Content asChild>
        <Surface className='flex flex-col gap-1 border border-shadow-border p-2'>
          {options.map((option) => {
            if (isOption(option)) {
              return (
                <DropdownButton
                  key={option.id}
                  onClick={option.onClick}
                  isActive={option.isActive()}
                >
                  {option.icon}
                  {option.label}
                </DropdownButton>
              );
            }
          })}
        </Surface>
      </Dropdown.Content>
    </Dropdown.Root>
  );
};
