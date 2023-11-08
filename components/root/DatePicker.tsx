'use client';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
type Props = {
  index: number;
  field: any;
  value: Date;
  setDate: (index: number, value: string, field: any) => void;
};

const DatePicker = ({ index, field, value, setDate }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {value ? (
            <span>{format(value, 'PPP')}</span>
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto bg-white p-0'>
        <Calendar
          showWeekNumber={false}
          mode='single'
          fromYear={2000}
          toYear={new Date().getFullYear()}
          selected={value}
          onSelect={async (e) => {
            if (e) {
              const formatDateMM = (await import('@/lib/utils')).formatDateMM;
              const date = formatDateMM(e);
              setDate(index, date, field);
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
