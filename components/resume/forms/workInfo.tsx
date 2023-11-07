import DatePicker from '@/components/root/DatePicker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

type Props = {};

const WorkInfo = (props: Props) => {
  return (
    <>
      <h1 className='title-semibold mt-8 text-black-100'>Work</h1>
      <div className='mt-8 flex w-full flex-col rounded-md border-1 border-shadow-border px-4 py-4'>
        <h3 className='base-semibold my-2 text-black-300'>
          New work experience
        </h3>
        <section className='mt-4 grid grid-flow-row grid-cols-2 gap-x-10 gap-y-5 px-2'>
          <div className='form-input-group'>
            <Label aria-label='position'>Position</Label>
            <Input type='text' id='position' placeholder='Enter position' />
          </div>
          <div className='form-input-group'>
            <Label aria-label='company'>Company/Organization Name</Label>
            <Input
              type='text'
              id='work-company'
              placeholder='Enter last name'
            />
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
            <Label aria-label='city'>City/Location</Label>
            <Input type='email' id='work-city' placeholder='Enter city' />
          </div>
          <div className='form-input-group'>
            <Label aria-label='state'>State/Country</Label>
            <Input type='text' id='work-state' placeholder='New York, NY' />
          </div>
          <div className='form-input-group col-span-2'>
            <Label aria-label='areas'>Description of This Experience</Label>
            <Textarea
              id='related course'
              className='h-[150px]'
              placeholder='...'
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default WorkInfo;
