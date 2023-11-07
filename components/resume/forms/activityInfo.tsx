import DatePicker from '@/components/root/DatePicker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

type Props = {};

const ActivityInfo = (props: Props) => {
  return (
    <>
      <h1 className='title-semibold mt-8 text-black-100'>Activity</h1>
      <div className='mt-8 flex w-full flex-col rounded-md border-1 border-shadow-border px-4 py-4'>
        <h3 className='base-semibold text-black-300'>
          New activity experience
        </h3>
        <section className='mt-4 grid grid-flow-row grid-cols-2 gap-x-10 gap-y-5 px-2'>
          <div className='form-input-group'>
            <Label aria-label='firstname'>Company/Organization Name</Label>
            <Input type='text' id='last-name' placeholder='Enter first name' />
          </div>
          <div className='form-input-group'>
            <Label aria-label='lastname'>Responsibilities</Label>
            <Input type='text' id='last-name' placeholder='Enter last name' />
          </div>
          <div className='form-input-group'>
            <Label aria-label='date'>Start Date</Label>
            <DatePicker />
          </div>
          <div className='form-input-group'>
            <Label aria-label='end-date'>End Date</Label>
            <DatePicker />
          </div>
          <div className='form-input-group'>
            <Label aria-label='email'>City/Location</Label>
            <Input type='email' id='email' placeholder='Enter last name' />
          </div>
          <div className='form-input-group'>
            <Label aria-label='city'>State/Country</Label>
            <Input type='text' id='city' placeholder='New York, NY' />
          </div>
          <div className='form-input-group col-span-2'>
            <Label aria-label='areas'>Descriptions of This Activity</Label>
            <Textarea
              id='related experience'
              className='h-[150px]'
              placeholder='...'
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default ActivityInfo;
