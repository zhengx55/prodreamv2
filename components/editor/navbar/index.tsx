import { Cloud } from '@/components/root/SvgComponents';
import Tooltip from '@/components/root/Tooltip';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAIEditor } from '@/zustand/store';
import {
  ChevronLeft,
  Loader,
  Loader2,
  MoreHorizontal,
  ShieldCheck,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { plagiarismCheck, plagiarismQuery } from '@/query/api';
import useAiEditor from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import useUnmount from 'beautiful-react-hooks/useUnmount';
import { memo, useRef, useState } from 'react';
type Props = { title: string };

const NavbarDropdown = dynamic(() => import('./NavbarDropdown'));
const CitationDropdown = dynamic(() => import('./CitationDropdown'));

const DocNavbar = ({ title }: Props) => {
  const citationStyle = useAIEditor((state) => state.citationStyle);
  const isSaving = useAIEditor((state) => state.isSaving);
  const [isGenerating, setIsGenerating] = useState(false);
  const editor = useAiEditor((state) => state.editor_instance);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const { mutateAsync: plagiarism } = useMutation({
    mutationFn: (params: string) => plagiarismCheck(params),
    onMutate: () => {
      setIsGenerating(true);
    },
    onSuccess: (data) => {
      timer.current = setInterval(async () => {
        const res = await plagiarismQuery(data);
        if (res.status !== 'doing') {
          setIsGenerating(false);
          clearInterval(timer.current!);
        }
        console.log('🚀 ~ timer.current=setInterval ~ res:', res);
      }, 5000);
    },
    onError: async (error) => {
      const toast = (await import('sonner')).toast;
      toast.error(error.message);
    },
  });

  useUnmount(() => {
    timer.current && clearInterval(timer.current);
  });

  const handlePlagiarismCheck = async () => {
    if (!editor) return;
    if (!editor.getText()) {
      const toast = (await import('sonner')).toast;
      toast.error('Please write something to check plagiarism');
      return;
    }
    await plagiarism(editor?.getText());
  };

  return (
    <nav className='flex-between h-[var(--top-nav-bar-height)] w-full shrink-0 border-b border-shadow-border px-5 py-3'>
      <div className='flex h-full items-center gap-x-4'>
        <Link passHref href={'/writtingpal/polish'}>
          <span className='flex-center h-10 w-10 cursor-pointer rounded-md bg-shadow-border hover:opacity-50'>
            <ChevronLeft />
          </span>
        </Link>
        <h1 className='h3-bold'>
          {title === 'Untitled' ? 'My College Application' : title}
        </h1>
        {isSaving ? <Loader className='animate-spin' /> : <Cloud />}
      </div>
      <div className='flex items-center gap-x-4'>
        <Tooltip tooltipContent='Plagiarism Check'>
          <Button
            role='button'
            disabled={isGenerating}
            onClick={handlePlagiarismCheck}
            className='h-max rounded border border-doc-primary bg-transparent px-2 py-1 text-black-400 hover:bg-doc-secondary hover:text-doc-primary'
          >
            {isGenerating ? (
              <Loader2 className='animate-spin text-doc-primary' size={18} />
            ) : (
              <ShieldCheck size={18} className='text-doc-primary' />
            )}
            <p className='small-regular text-doc-primary'>Plaglarism Check</p>
          </Button>
        </Tooltip>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='h-max rounded bg-doc-primary/20 py-1 hover:bg-doc-secondary'>
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
