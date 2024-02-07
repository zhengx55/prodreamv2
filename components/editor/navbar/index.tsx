import { Cloud } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { plagiarismCheck, plagiarismQuery } from '@/query/api';
import { useUserTrackInfo } from '@/query/query';
import useAiEditor, { useAIEditor } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import useUnmount from 'beautiful-react-hooks/useUnmount';
import { ChevronLeft, Loader } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { memo, useRef, useState } from 'react';

const NavbarDropdown = dynamic(() => import('./NavbarDropdown'));
const CitationDropdown = dynamic(() => import('./CitationDropdown'));

const DocNavbar = () => {
  const citationStyle = useAIEditor((state) => state.citationStyle);
  const isSaving = useAIEditor((state) => state.isSaving);
  const docTtile = useAIEditor((state) => state.doc_title);
  const [isGenerating, setIsGenerating] = useState(false);
  const editor = useAiEditor((state) => state.editor_instance);
  const { data: track, isPending } = useUserTrackInfo();
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
  if (isPending) return null;
  return (
    <nav className='flex-between h-[var(--top-nav-bar-height)] w-full shrink-0 border-b border-shadow-border px-5 py-3'>
      <div className='flex h-full items-center gap-x-4'>
        {track?.guidence && (
          <Link passHref href={'/editor'}>
            <span className='flex-center h-10 w-10 cursor-pointer rounded-md bg-shadow-border hover:opacity-50'>
              <ChevronLeft />
            </span>
          </Link>
        )}
        <h1 className='base-semibold'>
          {!track?.guidence
            ? 'Welcome To Prodream'
            : docTtile === 'Untitled'
              ? 'Untitled Document'
              : docTtile}
        </h1>
        {isSaving ? <Loader className='animate-spin' /> : <Cloud />}
      </div>
      <div className='flex items-center gap-x-4'>
        {/* <Button
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
        </Button> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='h-max rounded bg-doc-primary/20 py-1 hover:bg-doc-secondary'>
              <p className='small-regular text-doc-primary'>{citationStyle}</p>
            </Button>
          </DropdownMenuTrigger>
          <CitationDropdown />
        </DropdownMenu>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='bg-transparent p-2 text-black-400 hover:bg-doc-secondary hover:text-doc-primary'>
              <MoreHorizontal size={18} />
            </Button>
          </DropdownMenuTrigger>
          <NavbarDropdown title={title} />
        </DropdownMenu> */}
      </div>
    </nav>
  );
};
export default memo(DocNavbar);
