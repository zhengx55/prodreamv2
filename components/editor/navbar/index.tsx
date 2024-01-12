import { Cloud } from '@/components/root/SvgComponents';
import { ChevronLeft, FileCheck, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';
import NavbarDropdown from './NavbarDropdown';
type Props = { title: string };
const DocNavbar = ({ title }: Props) => {
  return (
    <nav className='flex h-[var(--top-nav-bar-height)] w-full shrink-0 items-center justify-between border-b border-shadow-border px-5 py-3'>
      <div className='flex h-full items-center gap-x-4'>
        <Link passHref href={'/writtingpal/polish'}>
          <span className='flex-center h-10 w-10 cursor-pointer rounded-md bg-shadow-border hover:opacity-50'>
            <ChevronLeft />
          </span>
        </Link>

        <h1 className='h3-bold'>{title}</h1>
        <Cloud />
      </div>
      <div className='flex items-center gap-x-4'>
        <FileCheck size={18} />
        <ShieldCheck size={18} />
        <NavbarDropdown />
      </div>
    </nav>
  );
};
export default memo(DocNavbar);
