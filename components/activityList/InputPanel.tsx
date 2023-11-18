import { Textarea } from '../ui/textarea';

const InputPanel = () => {
  return (
    <div className='h-fit w-1/2 md:p-4'>
      <div className='flex h-full min-h-[800px] w-full flex-col rounded-xl border border-border-50 bg-white p-4'>
        <h1 className='h3-bold text-primary-200'>
          Create a successful Activity List with one click
        </h1>
        <h3 className='title-semibold mt-14'>
          Paste your activity description here
        </h3>
        <Textarea
          className='mt-3 h-72 resize-none'
          placeholder='Eg: A comfortable dress made of yarn that has a cotton surface and an airy polyester core. Cotton provides a durable yet lightweight feel and is machine washable...'
        />
        <h3 className='title-semibold mt-14'>
          Select character limit(s) you would like to shorten to
        </h3>
      </div>
    </div>
  );
};

export default InputPanel;
