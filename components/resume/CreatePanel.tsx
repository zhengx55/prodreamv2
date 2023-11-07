'use client';
import { PencilLine } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useState } from 'react';
import DatePicker from '../root/DatePicker';
import { IEducationForm } from '@/types';

const CreatePanel = () => {
  const [title, setTitle] = useState('');
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [personalInfo, setPersonalInfo] = useState();
  const [educationInfo, setEducationInfo] = useState<Array<IEducationForm>>([]);
  const [workInfo, setWorkInfo] = useState<Array<IEducationForm>>([]);
  const [researchInfo, setReasearchInfo] = useState<Array<IEducationForm>>([]);
  const [competionInfo, setCompetionInfo] = useState<Array<IEducationForm>>([]);
  const [activityInfo, setActiviyInfo] = useState<Array<IEducationForm>>([]);

  return (
    <div className='custom-scrollbar h-full overflow-y-auto bg-white md:w-[49.5%] md:px-4 md:py-5'>
      {!showTitleInput ? (
        <div
          onClick={() => {
            setShowTitleInput(true);
          }}
          className='flex cursor-pointer items-center gap-x-2 transition-transform hover:-translate-y-0.5'
        >
          <h1 className='title-semibold'>Untitled Resume</h1>
          <PencilLine size={20} />
        </div>
      ) : (
        <Input
          id='resume title'
          type='text'
          placeholder='Resume Title'
          className='w-[190px]'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      )}

      <Separator orientation='horizontal' className='mt-4 bg-shadow-border' />

      {/* personal info section */}
      <h1 className='title-semibold mt-4'>Personal Info</h1>
      <section className='mt-4 grid grid-flow-row grid-cols-2 gap-x-14 gap-y-5'>
        <div className='form-input-group'>
          <Label aria-label='firstname'>First Name</Label>
          <Input type='text' id='last-name' placeholder='Enter first name' />
        </div>
        <div className='form-input-group'>
          <Label aria-label='lastname'>LastName</Label>
          <Input type='text' id='last-name' placeholder='Enter last name' />
        </div>
        <div className='form-input-group'>
          <Label aria-label='phone number'>Phone Number</Label>
          <Input type='number' id='last-name' placeholder='000' />
        </div>
        <div className='form-input-group'>
          <Label aria-label='linkedIn'>LinkedIn</Label>
          <Input
            type='text'
            id='last-name'
            placeholder='https://www.linkedin.com/'
          />
        </div>
        <div className='form-input-group'>
          <Label aria-label='email'>Email</Label>
          <Input type='email' id='email' placeholder='Enter last name' />
        </div>
        <div className='form-input-group'>
          <Label aria-label='city'>LastName</Label>
          <Input type='text' id='city' placeholder='New York, NY' />
        </div>
      </section>
      {/* education */}

      <h1 className='title-semibold mt-8 text-black-100'>Education</h1>
      <div className='mt-8 flex w-full flex-col rounded-md border-1 border-shadow-border px-4 py-4'>
        <h3 className='base-semibold text-black-300'>
          New educational experience
        </h3>
        <section className='mt-4 grid grid-flow-row grid-cols-2 gap-x-10 gap-y-5 px-2'>
          <div className='form-input-group'>
            <Label aria-label='school'>School Name</Label>
            <Input type='text' id='school' placeholder='Enter first name' />
          </div>
          <div className='form-input-group'>
            <Label aria-label='degree'>Full Degree Name</Label>
            <Input type='text' id='degree' placeholder='Enter last name' />
          </div>
          <div className='form-input-group'>
            <Label aria-label='date'>Start Date</Label>
            {/* <DatePicker /> */}
          </div>
          <div className='form-input-group'>
            <Label aria-label='end-date'>End Date</Label>
            {/* <DatePicker /> */}
          </div>
          <div className='form-input-group'>
            <Label aria-label='email'>City/Location</Label>
            <Input type='text' id='city' placeholder='Enter last name' />
          </div>
          <div className='form-input-group'>
            <Label aria-label='state'>State/Country</Label>
            <Input type='text' id='state' placeholder='New York, NY' />
          </div>
          <div className='form-input-group'>
            <Label aria-label='areas'>Areas of Study</Label>
            <Textarea id='area of study' />
          </div>
          <div className='form-input-group'>
            <Label aria-label='areas'>Related Courses</Label>
            <Textarea id='related course' />
          </div>
          <div className='form-input-group col-span-2'>
            <Label aria-label='areas'>Additional Information</Label>
            <Textarea
              id='related course'
              className='h-[150px]'
              placeholder='...'
            />
          </div>
        </section>
      </div>

      {/* work exprience */}
      <h1 className='title-semibold mt-8 text-black-100'>Work</h1>
      <div className='mt-8 flex w-full flex-col rounded-md border-1 border-shadow-border px-4 py-4'>
        <h3 className='base-semibold text-black-300'>
          New educational experience
        </h3>
        <section className='mt-4 grid grid-flow-row grid-cols-2 gap-x-10 gap-y-5 px-2'>
          <div className='form-input-group'>
            <Label aria-label='firstname'>First Name</Label>
            <Input type='text' id='last-name' placeholder='Enter first name' />
          </div>
          <div className='form-input-group'>
            <Label aria-label='lastname'>LastName</Label>
            <Input type='text' id='last-name' placeholder='Enter last name' />
          </div>
          <div className='form-input-group'>
            <Label aria-label='phone number'>Phone Number</Label>
            <Input type='number' id='last-name' placeholder='000' />
          </div>
          <div className='form-input-group'>
            <Label aria-label='linkedIn'>LinkedIn</Label>
            <Input
              type='text'
              id='last-name'
              placeholder='https://www.linkedin.com/'
            />
          </div>
          <div className='form-input-group'>
            <Label aria-label='email'>Email</Label>
            <Input type='email' id='email' placeholder='Enter last name' />
          </div>
          <div className='form-input-group'>
            <Label aria-label='city'>City</Label>
            <Input type='text' id='city' placeholder='New York, NY' />
          </div>
        </section>
      </div>

      {/* Research Experience */}
      <h1 className='title-semibold mt-8 text-black-100'>Research</h1>
      <div className='mt-8 flex w-full flex-col rounded-md border-1 border-shadow-border px-4 py-4'>
        <h3 className='base-semibold text-black-300'>
          New educational experience
        </h3>
        <section className='mt-4 grid grid-flow-row grid-cols-2 gap-x-10 gap-y-5 px-2'>
          <div className='form-input-group'>
            <Label aria-label='firstname'>First Name</Label>
            <Input type='text' id='last-name' placeholder='Enter first name' />
          </div>
          <div className='form-input-group'>
            <Label aria-label='lastname'>LastName</Label>
            <Input type='text' id='last-name' placeholder='Enter last name' />
          </div>
          <div className='form-input-group'>
            <Label aria-label='phone number'>Phone Number</Label>
            <Input type='number' id='last-name' placeholder='000' />
          </div>
          <div className='form-input-group'>
            <Label aria-label='linkedIn'>LinkedIn</Label>
            <Input
              type='text'
              id='last-name'
              placeholder='https://www.linkedin.com/'
            />
          </div>
          <div className='form-input-group'>
            <Label aria-label='email'>Email</Label>
            <Input type='email' id='email' placeholder='Enter last name' />
          </div>
          <div className='form-input-group'>
            <Label aria-label='city'>City</Label>
            <Input type='text' id='city' placeholder='New York, NY' />
          </div>
        </section>
      </div>

      {/* activity exprience */}
      <h1 className='title-semibold mt-8 text-black-100'>Activity</h1>
      <div className='mt-8 flex w-full flex-col rounded-md border-1 border-shadow-border px-4 py-4'>
        <h3 className='base-semibold text-black-300'>
          New educational experience
        </h3>
        <section className='mt-4 grid grid-flow-row grid-cols-2 gap-x-10 gap-y-5 px-2'>
          <div className='form-input-group'>
            <Label aria-label='firstname'>First Name</Label>
            <Input type='text' id='last-name' placeholder='Enter first name' />
          </div>
          <div className='form-input-group'>
            <Label aria-label='lastname'>LastName</Label>
            <Input type='text' id='last-name' placeholder='Enter last name' />
          </div>
          <div className='form-input-group'>
            <Label aria-label='phone number'>Phone Number</Label>
            <Input type='number' id='last-name' placeholder='000' />
          </div>
          <div className='form-input-group'>
            <Label aria-label='linkedIn'>LinkedIn</Label>
            <Input
              type='text'
              id='last-name'
              placeholder='https://www.linkedin.com/'
            />
          </div>
          <div className='form-input-group'>
            <Label aria-label='email'>Email</Label>
            <Input type='email' id='email' placeholder='Enter last name' />
          </div>
          <div className='form-input-group'>
            <Label aria-label='city'>City</Label>
            <Input type='text' id='city' placeholder='New York, NY' />
          </div>
        </section>
      </div>

      {/* Competition exprience */}
      <h1 className='title-semibold mt-8 text-black-100'>Competition</h1>
      <div className='mt-8 flex w-full flex-col rounded-md border-1 border-shadow-border px-4 py-4'>
        <h3 className='base-semibold text-black-300'>
          New educational experience
        </h3>
        <section className='mt-4 grid grid-flow-row grid-cols-2 gap-x-10 gap-y-5 px-2'>
          <div className='form-input-group'>
            <Label aria-label='firstname'>First Name</Label>
            <Input type='text' id='last-name' placeholder='Enter first name' />
          </div>
          <div className='form-input-group'>
            <Label aria-label='lastname'>LastName</Label>
            <Input type='text' id='last-name' placeholder='Enter last name' />
          </div>
          <div className='form-input-group'>
            <Label aria-label='phone number'>Phone Number</Label>
            <Input type='number' id='last-name' placeholder='000' />
          </div>
          <div className='form-input-group'>
            <Label aria-label='linkedIn'>LinkedIn</Label>
            <Input
              type='text'
              id='last-name'
              placeholder='https://www.linkedin.com/'
            />
          </div>
          <div className='form-input-group'>
            <Label aria-label='email'>Email</Label>
            <Input type='email' id='email' placeholder='Enter last name' />
          </div>
          <div className='form-input-group'>
            <Label aria-label='city'>City</Label>
            <Input type='text' id='city' placeholder='New York, NY' />
          </div>
        </section>
      </div>
    </div>
  );
};

export default CreatePanel;
