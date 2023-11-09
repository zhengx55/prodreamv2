'use client';
import { useBrainStormDetail } from '@/query/query';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Loading from '../root/Loading';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { Switch } from '@/components/ui/switch';

const FormPanel = () => {
  const pathname = usePathname();
  const id = pathname.split('/')[pathname.split('/').length - 1];
  const { data: moduleData, isPending: isModuleLoading } =
    useBrainStormDetail(id);

  if (!moduleData || isModuleLoading) {
    return <Loading />;
  }
  return (
    <div className='custom-scrollbar relative h-full overflow-y-auto p-6'>
      <div className='flex items-center'>
        <Link
          className='small-regular capitalize text-shadow hover:underline'
          href={'/writtingpal/brainstorm'}
        >
          {pathname.split('/')[2]}
        </Link>
        <p className='small-regular text-black-200'>
          &nbsp;/&nbsp;{moduleData.name}
        </p>
      </div>
      <div className='mt-4 flex flex-col gap-y-4 overflow-y-auto rounded-xl bg-white p-4 md:w-full'>
        <h1 className='h1-regular text-primary-200'>{moduleData.name}</h1>
        <p className=' base-regular text-shadow'>{moduleData.description}</p>
      </div>
      <div className='mt-4 flex flex-col gap-y-4 overflow-y-auto rounded-xl bg-white p-4 md:w-full'>
        <div className='flex-start gap-x-2'>
          <span className='h-6 w-2 rounded-[10px] bg-primary-200' />
          <p className='title-semibold'>Basic Settings</p>
        </div>
        <Separator orientation='horizontal' className='bg-shadow-border' />
        {/* Switch ------------------------------------------------------- */}
        <div className='flex gap-x-2'>
          <Label htmlFor='quality-mode' className='base-semibold flex-[0.3]'>
            High-Quality Mode
            <br />
            <p className='subtle-regular mt-2 text-shadow-100'>
              Generate higher-quality essays but may require more time. Please
              be patient
            </p>
          </Label>
          <div className='relative flex h-full flex-[0.7] items-center gap-x-2'>
            <p>off</p>
            <Switch id='quality-mode' />
            <p>on</p>
          </div>
        </div>

        {/* Personal Beta ------------------------------------------------------- */}
        <div className='flex gap-x-2 md:h-[160px]'>
          <Label htmlFor='personal' className='base-semibold flex-[0.3]'>
            Personality <span className=' text-primary-200'>(Beta)</span>
            <br />
            <p className='subtle-regular mt-2 text-shadow-100'>
              With just a few words, WritingPal can highlight your personality
              in the writing
            </p>
          </Label>
          <div className='relative h-full flex-[0.7]'>
            <Textarea
              id='personal'
              className='h-full w-full pb-8'
              placeholder=''
            />
            <div className='flex-between absolute bottom-0 z-10 h-8 w-full rounded-lg bg-red-200'></div>
          </div>
        </div>
      </div>
      <div className='mt-4 flex flex-col gap-y-4 overflow-y-auto rounded-xl bg-white p-4 md:w-full'>
        <div className='flex-start'>
          <span className='h-6 w-2 rounded-[10px] bg-primary-200' />
        </div>
        <Separator orientation='horizontal' className='bg-shadow-border' />
        {moduleData.modules[0].question.map((item) => {
          return (
            <div key={item.id} className='flex gap-x-2 md:h-[160px]'>
              <Label className='base-semibold flex-[0.3]' htmlFor={item.id}>
                {item.optional === 0 && (
                  <span className='text-red-500'>*&nbsp;</span>
                )}
                {item.text}
              </Label>
              <div className='relative h-full flex-[0.7]'>
                <Textarea
                  id={item.id}
                  className='h-full w-full pb-8'
                  placeholder={item.example}
                />
                <div className='flex-between absolute bottom-0 z-10 h-8 w-full rounded-lg bg-red-200'></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormPanel;
