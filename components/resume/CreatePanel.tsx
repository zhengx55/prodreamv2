'use client';
import { PencilLine } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { useRef, useState } from 'react';
import UserInfo from './forms/userInfo';
import EducationInfo from './forms/educationInfo';
import WorkInfo from './forms/workInfo';
import ResearchInfo from './forms/researchInfo';
import CompetionsInfo from './forms/competitionInfo';
import ActivityInfo from './forms/activityInfo';
import { useOnClickOutside } from 'usehooks-ts';

const CreatePanel = () => {
  const [title, setTitle] = useState('');
  const [showTitleInput, setShowTitleInput] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const handleHideInput = () => {
    setShowTitleInput(false);
  };
  useOnClickOutside(ref, handleHideInput);
  return (
    <div className=' h-full overflow-y-auto bg-transparent md:w-[49.5%] md:px-8 md:py-5'>
      {!showTitleInput ? (
        <div
          onClick={() => {
            setShowTitleInput(true);
          }}
          className='flex h-10 cursor-pointer items-center gap-x-2 transition-transform hover:-translate-y-0.5'
        >
          <h1 className='title-semibold'>
            {title ? title : 'Untitled Resume'}
          </h1>
          <PencilLine size={20} />
        </div>
      ) : (
        <Input
          ref={ref}
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
      <UserInfo />
      {/* education */}
      <EducationInfo />
      {/* work exprience */}
      <WorkInfo />
      {/* Research Experience */}
      <ResearchInfo />
      {/* Competition exprience */}
      <CompetionsInfo />
      {/* activity exprience */}
      <ActivityInfo />
    </div>
  );
};

export default CreatePanel;
