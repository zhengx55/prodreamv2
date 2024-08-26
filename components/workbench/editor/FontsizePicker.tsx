import { DropdownButton } from '@/components/ui/dropdown-button';
import { Surface } from '@/components/ui/surface';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { memo, useCallback } from 'react';
import { Toolbar } from './Toolbar';

const FONT_SIZES = [
  { label: 'Smaller', value: '12px' },
  { label: 'Small', value: '14px' },
  { label: 'Medium', value: '' },
  { label: 'Large', value: '18px' },
  { label: 'Extra Large', value: '24px' },
];

type FontSizePickerProps = {
  onChange: (value: string) => void;
  value: string;
};

const FontSizePicker = ({ onChange, value }: FontSizePickerProps) => {
  const currentValue = FONT_SIZES.find((size) => size.value === value);
  const currentSizeLabel = currentValue?.label.split(' ')[0] || 'Medium';

  const selectSize = useCallback(
    (size: string) => () => onChange(size),
    [onChange]
  );

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <Toolbar.Button
          className='w-[100px] gap-x-4'
          active={!!currentValue?.value}
        >
          {currentSizeLabel}
          <ChevronDown size={16} />
        </Toolbar.Button>
      </Dropdown.Trigger>
      <Dropdown.Content asChild onPointerDown={(e) => e.preventDefault()}>
        <Surface className='flex flex-col gap-1 border border-gray-200 p-2'>
          {FONT_SIZES.map((size) => (
            <DropdownButton
              isActive={value === size.value}
              onClick={selectSize(size.value)}
              key={`${size.label}_${size.value}`}
            >
              <span style={{ fontSize: size.value }}>{size.label}</span>
            </DropdownButton>
          ))}
        </Surface>
      </Dropdown.Content>
    </Dropdown.Root>
  );
};

export default memo(FontSizePicker);
