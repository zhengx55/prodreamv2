import Image from 'next/image';
import React from 'react';

const ActivityListTut = () => {
  return (
    <>
      <div className='mt-4 flex h-[calc(100vh_-150px)] shrink-0 overflow-y-auto rounded-lg bg-sectionBackground px-4 py-6'>
        <div className=' flex flex-col gap-y-6'>
          <div className='flex items-center gap-x-4'>
            <div className='h3-bold flex-center h-11 w-11 rounded-full bg-primary-400'>
              1
            </div>
            <h1 className='title-semibold'>Create a new activity list</h1>
          </div>
          <p className='small-regular'>
            😀 Upload your resume, personal statement or any document that
            details your experience
          </p>
          <Image
            alt='act-tut'
            src='/tutorials/acttut-4.png'
            width={480}
            height={900}
            className='h-auto w-auto'
          />
          <p className='small-regular'>😊 Add multiple files if needed</p>
          <div className='flex items-center gap-x-4'>
            <div className='h3-bold flex-center h-11 w-11 rounded-full bg-primary-400'>
              2
            </div>
            <h1 className='title-semibold'>
              Edit your drafted activity description
            </h1>
          </div>
          <p className='small-regular'>
            We&apos;ll extract your experience from the submitted documents and
            create a draft for you to edit or add any missing activities.
          </p>
          <Image
            alt='act-tut'
            src='/tutorials/acttut-2.png'
            width={480}
            height={900}
            className='h-auto w-auto'
          />
          <div className='flex items-center gap-x-4'>
            <div className='h3-bold flex-center h-11 w-11 rounded-full bg-primary-400'>
              3
            </div>
            <h1 className='title-semibold'>Generate the activity list</h1>
          </div>
          <p className='small-regular'>
            😋 Let the magic happen! Select the list(s) you want to generate,
            this could be UC Application, Common App or a list with customized
            character limits.
          </p>
          <Image
            alt='act-tut'
            src='/tutorials/acttut-1.png'
            width={480}
            height={900}
            className='h-auto w-auto'
          />
          <p className='small-regular'>
            The Generated activities will grouped by lists. If you selected
            multiple lists to generate, switch lists using the top bar.
          </p>
          <div className='flex items-center gap-x-4'>
            <div className='h3-bold flex-center h-11 w-11 rounded-full bg-primary-400'>
              4
            </div>
            <h1 className='title-semibold'>Edit, power up, and shorten</h1>
          </div>
          <p className='small-regular'>
            😚 Click the Edit (Pen) button to finalize your list. Use Power Up
            to boost the writing quality of the activity description. You can
            also use Fit to character limit to shorten the description.
          </p>
          <Image
            alt='act-tut'
            src='/tutorials/acttut-3.png'
            width={480}
            height={900}
            className='h-auto w-auto'
          />
          <p className='small-regular'>
            After editing the activity, make sure to click the Save Changes
            button to save your edits.
          </p>
          <div className='flex items-center gap-x-4'>
            <div className='h3-bold flex-center h-11 w-11 rounded-full bg-primary-400'>
              5
            </div>
            <h1 className='title-semibold'>Manage previous lists</h1>
          </div>
          <p className='small-regular'>
            🤗 All your previous activity lists will automatically saved and you
            can assess them by clicking the View History button on the upper
            right corner.
          </p>
          <Image
            alt='act-tut'
            src='/tutorials/acttut-5.png'
            width={480}
            height={900}
            className='h-auto w-auto'
          />
          <p className='small-regular'>
            After editing the activity, make sure to click the
            <span className='text-primary-200'>&nbsp;Save Changes&nbsp;</span>
            button to save your edits.
          </p>
        </div>
      </div>
    </>
  );
};

export default ActivityListTut;
