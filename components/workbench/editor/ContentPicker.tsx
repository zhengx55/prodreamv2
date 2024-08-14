import { DropdownButton } from '@/components/ui/dropdown-button';

import { Surface } from '@/components/ui/surface';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { memo, ReactNode, useMemo } from 'react';
import { Toolbar } from './Toolbar';

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

const ContentTypePicker = ({ options }: ContentTypePickerProps) => {
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
              className='w-max justify-between'
              active={activeItem?.id !== 'paragraph' && !!activeItem?.type}
            >
              <span className='inline-flex items-center gap-x-1.5'>
                {activeItem?.label}
              </span>
              <ChevronDown size={16} />
            </Toolbar.Button>
          </Dropdown.Trigger>
          <Toolbar.Divider />
        </>
      ) : null}
      <Dropdown.Content onPointerDown={(e) => e.preventDefault()} asChild>
        <Surface className='flex flex-col gap-1 border border-gray-200 p-2'>
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

export default memo(ContentTypePicker);
