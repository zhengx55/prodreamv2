'use client';
import { formatTimestamphh } from '@/lib/utils';
import { IResumeListItem } from '@/types';
import { Download, Edit, Trash2 } from 'lucide-react';
import Spacer from '../root/Spacer';

const ResumeListItem = ({ title, update_time }: Partial<IResumeListItem>) => {
  return (
    <div className='flex h-80 gap-x-4 rounded-lg bg-white p-4'>
      <section className=' h-full w-56 rounded-lg border border-primary-50'></section>
      <section className='flex flex-col justify-between'>
        <div className='flex flex-col'>
          <h2 className='title-medium'>{title}</h2>
          <Spacer y='10' />
          <p className='subtle-regular text-shadow'>
            {formatTimestamphh(update_time ?? '')}
          </p>
        </div>
        <div className='flex flex-col gap-y-4'>
          <div className='resume_list_options'>
            <Download size={18} />
            Download
          </div>
          <div className='resume_list_options'>
            <Edit size={18} />
            Edit
          </div>
          <div className='resume_list_options'>
            <Trash2 size={18} />
            Delete
          </div>
        </div>
      </section>
    </div>
  );
};
export default ResumeListItem;
