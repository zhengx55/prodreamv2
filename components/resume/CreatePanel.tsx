'use client';
import { PencilLine } from 'lucide-react';
import { useState } from 'react';
import Spacer from '../root/Spacer';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import ActivityInfo from './forms/activityInfo';
import CompetionsInfo from './forms/competitionInfo';
import EducationInfo from './forms/educationInfo';
import ResearchInfo from './forms/researchInfo';
import UserInfo from './forms/userInfo';
import WorkInfo from './forms/workInfo';

const CreatePanel = () => {
  const [title, setTitle] = useState('');
  const [showTitleInput, setShowTitleInput] = useState(false);

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
      <Spacer y='16' />
      <UserInfo />
      <Spacer y='32' />
      {/* education */}
      <EducationInfo />
      <Spacer y='32' />
      {/* work exprience */}
      <WorkInfo />
      <Spacer y='32' />
      {/* Research Experience */}
      <ResearchInfo />
      <Spacer y='32' />
      {/* Competition exprience */}
      <CompetionsInfo />
      <Spacer y='32' />
      {/* activity exprience */}
      <ActivityInfo />
    </div>
  );
};

export default CreatePanel;
