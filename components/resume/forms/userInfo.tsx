'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/storehooks';
import { changeProfile, selectProfile } from '@/store/reducers/resumeSlice';
import { IResumeProfile } from '@/types';

type Props = {};

const UserInfo = (props: Props) => {
  const profile = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();
  const handleValueChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const field = e.target.name as keyof IResumeProfile;
    const value = e.target.value;
    dispatch(changeProfile({ field, value }));
  };
  return (
    <>
      <h1 className='title-semibold mt-4'>Personal Info</h1>
      <section className='mt-8 grid grid-flow-row grid-cols-2 gap-x-14 gap-y-5'>
        <div className='form-input-group'>
          <Label htmlFor='first-name' aria-label='firstname'>
            First Name
          </Label>
          <Input
            type='text'
            name='firstname'
            id='first-name'
            placeholder='Enter first name'
          />
        </div>
        <div className='form-input-group'>
          <Label htmlFor='last-name' aria-label='lastname'>
            Last Name
          </Label>
          <Input
            type='text'
            id='last-name'
            name='lastname'
            placeholder='Enter last name'
          />
        </div>
        <div className='form-input-group'>
          <Label htmlFor='first-name' aria-label='phone number'>
            Phone Number
          </Label>
          <Input
            type='number'
            id='phone-number'
            name='number'
            placeholder='000'
          />
        </div>
        <div className='form-input-group'>
          <Label htmlFor='linkedin' aria-label='linkedIn'>
            LinkedIn
          </Label>
          <Input
            type='text'
            name='linkedin'
            id='linkedin'
            placeholder='https://www.linkedin.com/'
          />
        </div>
        <div className='form-input-group'>
          <Label htmlFor='email' aria-label='email'>
            Email
          </Label>
          <Input
            type='email'
            autoComplete='email'
            id='email'
            placeholder='Enter last name'
          />
        </div>
        <div className='form-input-group'>
          <Label htmlFor='city' aria-label='city'>
            City
          </Label>
          <Input type='text' name='city' id='city' placeholder='NY' />
        </div>
        <div className='form-input-group'>
          <Label htmlFor='website' aria-label='website'>
            Personal Website
          </Label>
          <Input type='text' name='website' id='website' placeholder='NY' />
        </div>
      </section>
    </>
  );
};

export default UserInfo;
