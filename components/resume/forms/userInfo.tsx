'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

type Props = {};

const UserInfo = (props: Props) => {
  return (
    <>
      <h1 className='title-semibold mt-4'>Personal Info</h1>
      <section className='mt-8 grid grid-flow-row grid-cols-2 gap-x-14 gap-y-5'>
        <div className='form-input-group'>
          <Label aria-label='firstname'>First Name</Label>
          <Input type='text' id='first-name' placeholder='Enter first name' />
        </div>
        <div className='form-input-group'>
          <Label aria-label='lastname'>Last Name</Label>
          <Input type='text' id='last-name' placeholder='Enter last name' />
        </div>
        <div className='form-input-group'>
          <Label aria-label='phone number'>Phone Number</Label>
          <Input type='number' id='phone-number' placeholder='000' />
        </div>
        <div className='form-input-group'>
          <Label aria-label='linkedIn'>LinkedIn</Label>
          <Input
            type='text'
            id='linkedin'
            placeholder='https://www.linkedin.com/'
          />
        </div>
        <div className='form-input-group'>
          <Label aria-label='email'>Email</Label>
          <Input
            type='email'
            autoComplete='email'
            id='email'
            placeholder='Enter last name'
          />
        </div>
        <div className='form-input-group'>
          <Label aria-label='city'>City</Label>
          <Input type='text' id='city' placeholder='NY' />
        </div>
      </section>
    </>
  );
};

export default UserInfo;
