'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { changeProfile, selectProfile } from '@/store/reducers/resumeSlice';
import { IResumeProfile } from '@/types';
import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/storehooks';

const UserInfo = () => {
  const profile = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();
  const handleValueChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const field = e.target.name as keyof IResumeProfile;
    const value = e.target.value;
    dispatch(changeProfile({ field, value }));
  };
  return (
    <>
      <h1 className='title-semibold'>Personal Info</h1>
      <section className='mt-8 grid grid-flow-row grid-cols-2 gap-x-14 gap-y-5'>
        <div className='form-input-group'>
          <Label htmlFor='first-name' aria-label='firstname'>
            First Name
          </Label>
          <Input
            value={profile.firstname}
            onChange={handleValueChange}
            type='text'
            name='firstname'
            autoComplete='on'
            id='first-name'
            placeholder='Enter first name'
          />
        </div>
        <div className='form-input-group'>
          <Label htmlFor='last-name' aria-label='lastname'>
            Last Name
          </Label>
          <Input
            value={profile.lastname}
            onChange={handleValueChange}
            type='text'
            id='last-name'
            autoComplete='on'
            name='lastname'
            placeholder='Enter last name'
          />
        </div>
        <div className='form-input-group'>
          <Label htmlFor='first-name' aria-label='phone number'>
            Phone Number
          </Label>
          <Input
            value={profile.number}
            onChange={handleValueChange}
            type='number'
            id='phone-number'
            name='number'
            autoComplete='tel'
            placeholder='000'
          />
        </div>
        <div className='form-input-group'>
          <Label htmlFor='linkedin' aria-label='linkedIn'>
            LinkedIn
          </Label>
          <Input
            value={profile.linkedin}
            onChange={handleValueChange}
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
            value={profile.email}
            onChange={handleValueChange}
            type='email'
            name='email'
            autoComplete='email'
            id='email'
            placeholder='Enter email address'
          />
        </div>
        <div className='form-input-group'>
          <Label htmlFor='city' aria-label='city'>
            City
          </Label>
          <Input
            value={profile.location}
            onChange={handleValueChange}
            type='text'
            name='location'
            id='city'
            placeholder='NY'
          />
        </div>
        <div className='form-input-group'>
          <Label htmlFor='website' aria-label='website'>
            Personal Website
          </Label>
          <Input
            value={profile.website}
            onChange={handleValueChange}
            type='text'
            name='website'
            id='website'
            placeholder='www.example.com'
          />
        </div>
      </section>
    </>
  );
};

export default UserInfo;
