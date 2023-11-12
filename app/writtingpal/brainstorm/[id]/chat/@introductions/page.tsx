import BackButton from '@/components/root/BackButton';
import { Button } from '@/components/ui/button';

const moduleMenu = [
  { id: 'module-01', title: 'Overview' },
  { id: 'module-02', title: 'Academic achievements' },
  { id: 'module-03', title: 'Previous Experience' },
  { id: 'module-04', title: 'Program Fit' },
  { id: 'module-05', title: 'Career Path' },
];

const moduleInfo = [
  {
    id: 'info1',
    value: [
      {
        id: 'info1-sub-1',
        title: 'AI-Powered Brainstorming',
        info: "We'll have several sections and will brainstorm with you in each section through dialogue with AI. At the end of each section, we'll provide a summary and reflection. After completing all the sections, you can choose to generate an essay based on your experience, for reference only.",
      },
      {
        id: 'info1-sub-2',
        title: 'Designing Your Blueprint',
        info: "For graduate school personal statements, schools want to know who you are, which program you're applying to, and why. Therefore, we'll brainstorm with you focusing on motivations, academic achievements, previous experiences, program fit, and future career goals. This will likely mirror your essay's structure as well.",
      },
      {
        id: 'info1-sub-3',
        title: 'Read All',
        info: 'Please take your time to read all the provided information, so you can fully understand how to craft an effective graduate school essay.',
      },
    ],
  },
  { id: 'info2', value: [] },
  { id: 'info3', value: [] },
  { id: 'info4', value: [] },
  { id: 'info5', value: [] },
];

export default function Page() {
  return (
    <main className='relative flex h-[calc(100%_-var(--top-nav-bar-height))] w-full flex-col items-center overflow-y-auto px-10 pt-20 md:px-0'>
      <BackButton />
      <div className=' flex flex-col items-start '>
        <h1 className='primary-title capitalize'>Introduction</h1>
        <h2 className='h3-semibold mt-12'>Unleash your potential with us!</h2>
        <div className='mt-5 flex items-center gap-x-5'>
          <div className='flex h-[240px] w-[370px] flex-col gap-y-8 rounded-lg border border-shadow-border p-6 shadow-card'>
            <h3 className='body-medium text-black-500'>Discover yourself</h3>
            <p className='small-regular leading-7 text-shadow-300'>
              Delve into your story to uncover what truly drives you. By
              recognizing these values, you&apos;ll better navigate your major
              and school choices.
            </p>
          </div>
          <div className='flex h-[240px] w-[370px] flex-col gap-y-8 rounded-lg border border-shadow-border p-6 shadow-card'>
            <h3 className='body-medium text-black-500'>Know what and how</h3>
            <p className='small-regular leading-7 text-shadow-300'>
              Learn what schools seek and how to craft standout essays with
              tutorials and examples. Analyze top essays to elevate your own.
            </p>
          </div>
          <div className='flex h-[240px] w-[370px] flex-col gap-y-8 rounded-lg border border-shadow-border p-6 shadow-card'>
            <h3 className='body-medium text-black-500'>
              Being guided step by step
            </h3>
            <p className='small-regular leading-7 text-shadow-300'>
              Being guided step-by-step, much like a human teacher, to delve
              deep and uncover the core of your college essay narrative
            </p>
          </div>
        </div>
        <h2 className='h3-semibold mt-12'>What does this module cover?</h2>
        <div className='mt-5 flex h-[450px] '>
          <div className='flex w-[268px] flex-col'>
            {moduleMenu.map((item, index) => (
              <div
                className={`flex h-[52px] w-[268px] cursor-pointer items-center rounded-bl-xl rounded-tl-xl px-4 hover:bg-primary-50 hover:text-primary-200`}
                key={item.id}
              >
                {item.title}
              </div>
            ))}
          </div>
          <div className='grid w-[836px] grid-cols-1'>
            {moduleInfo[0].value.map((item, index) => (
              <div
                key={item.id}
                className='flex gap-x-16 border border-shadow-border p-6'
              >
                <h1 className='h3-semibold'>{index}</h1>
                <p className='small-regular leading-6 text-shadow-300'>
                  <span className='font-[600] text-black-200'>
                    {item.title}:{' '}
                  </span>
                  {item.info}
                </p>
              </div>
            ))}
          </div>
        </div>
        <Button size={'expand'} className='mt-10 self-end'>
          Next
        </Button>
      </div>
    </main>
  );
}
