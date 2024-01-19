import { Cloud } from '@/components/root/SvgComponents';
import Tooltip from '@/components/root/Tooltip';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAIEditor } from '@/zustand/store';
import { ChevronLeft, MoreHorizontal, ShieldCheck } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { memo } from 'react';
type Props = { title: string };

const NavbarDropdown = dynamic(() => import('./NavbarDropdown'));
const CitationDropdown = dynamic(() => import('./CitationDropdown'));

const DocNavbar = ({ title }: Props) => {
  const citationStyle = useAIEditor((state) => state.citationStyle);
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
        <Tooltip tooltipContent='Plagiarism Check'>
          <Button className='h-max rounded border border-doc-primary bg-transparent px-2 py-1 text-black-400 hover:bg-doc-secondary hover:text-doc-primary'>
            <ShieldCheck size={18} className='text-doc-primary' />
            <p className='small-regular text-doc-primary'>Plaglarism Check</p>
          </Button>
        </Tooltip>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='py-1 hover:bg-doc-secondary h-max rounded bg-doc-primary/20'>
              <p className='small-regular text-doc-primary'>{citationStyle}</p>
            </Button>
          </DropdownMenuTrigger>
          <CitationDropdown />
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='bg-transparent p-2 text-black-400 hover:bg-doc-secondary hover:text-doc-primary'>
              <MoreHorizontal size={18} />
            </Button>
          </DropdownMenuTrigger>
          <NavbarDropdown />
        </DropdownMenu>
      </div>
    </nav>
  );
};
export default memo(DocNavbar);
