import {
  ChevronLeft,
  FileCheck,
  MoreVertical,
  ShieldCheck,
  UploadCloud,
} from 'lucide-react';
import Link from 'next/link';
type Props = { title: string };
const DocNavbar = ({ title }: Props) => {
  return (
    <nav className='flex h-[var(--top-nav-bar-height)] w-full shrink-0 items-center justify-between px-5 py-3'>
      <div className='flex h-full items-center gap-x-4'>
        <Link passHref href={'/writtingpal/polish'}>
          <span className='flex-center h-10 w-10 cursor-pointer rounded-md bg-shadow-border hover:opacity-50'>
            <ChevronLeft />
          </span>
        </Link>

        <h1 className='h3-bold'>{title}</h1>
        <UploadCloud size={18} />
      </div>
      <div className='flex items-center gap-x-4'>
        <FileCheck size={18} />
        <ShieldCheck size={18} />
        <span className='flex-center h-10 w-10 cursor-pointer rounded-md bg-shadow-border hover:opacity-50'>
          <MoreVertical size={18} />
        </span>
      </div>
    </nav>
  );
};
export default DocNavbar;
