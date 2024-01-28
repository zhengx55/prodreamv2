import { handleUpdateUserInfo } from '@/actions/action';
import LazyMotionProvider from '@/components/root/LazyMotionProvider';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { getDocs } from '@/query/api';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, m } from 'framer-motion';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Edit from './Edit';
import Start from './Start';

type Props = { open: boolean; toogleOpen: (value: boolean) => void };
const OnBoard = ({ open, toogleOpen }: Props) => {
  const { id } = useParams();
  const [board, setBoard] = useState(0);
  const router = useRouter();
  const { mutateAsync: handleClose } = useMutation({
    mutationFn: async () => {
      await handleUpdateUserInfo({ document_dialog: true }, id as string);
    },
    onSuccess: () => {
      toogleOpen(false);
    },
  });

  const handleUpdateInfoAndClose = async () => {
    await handleClose();
  };

  const handleCreateCitation = async () => {
    const doc_list = await getDocs(0, 10);
    const sample_doc = doc_list.list.find(
      (item) => item.in_text_citations.length > 0
    );
    if (sample_doc) {
      await handleClose();
      router.replace(`/writtingpal/polish/${sample_doc.id}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={toogleOpen}>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        className='bg-white px-16 py-8 md:w-[1100px] md:rounded'
      >
        <LazyMotionProvider>
          <AnimatePresence mode='wait'>
            {board === 0 ? (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='flex flex-1 flex-col gap-y-16'
                key={'board-1'}
              >
                <div className='flex-between'>
                  <h1 className='h2-semibold'>
                    And one more thing...
                    <br />
                    <span className='font-[300] text-doc-primary'>
                      What are you looking for today?
                    </span>
                  </h1>
                  <Button
                    className='h-max w-max rounded border border-doc-primary px-10 py-1 text-doc-primary'
                    variant={'ghost'}
                    onClick={handleUpdateInfoAndClose}
                  >
                    Skip
                  </Button>
                </div>
                <div className='flex-between gap-x-4'>
                  <div
                    onClick={() => {
                      setBoard(1);
                    }}
                    className='flex h-[380px] w-1/3 cursor-pointer flex-col items-center justify-evenly rounded-2xl border border-shadow-border py-4 hover:bg-[#F8F9FC]'
                  >
                    <p className='title-semibold text-doc-shadow'>
                      Start writing an essay
                    </p>
                    <div className='relative h-[250px] w-[90%] overflow-hidden'>
                      <Image
                        alt='start'
                        src='/welcome/Start.png'
                        sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
                        fill
                      />
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      setBoard(2);
                    }}
                    className='flex h-[380px] w-1/3 cursor-pointer flex-col items-center justify-evenly rounded-2xl border border-shadow-border py-4 hover:bg-[#F8F9FC]'
                  >
                    <p className='title-semibold text-doc-shadow'>
                      Edit essays
                    </p>
                    <div className='relative h-[250px] w-[90%] overflow-hidden'>
                      <Image
                        alt='start'
                        src='/welcome/Edit.png'
                        fill
                        sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
                      />
                    </div>
                  </div>
                  <div
                    onClick={handleCreateCitation}
                    className='flex h-[380px] w-1/3 cursor-pointer flex-col items-center justify-evenly rounded-2xl border border-shadow-border py-4 hover:bg-[#F8F9FC]'
                  >
                    <p className='title-semibold text-doc-shadow'>
                      Create citation
                    </p>
                    <div className='relative h-[250px] w-[90%] overflow-hidden'>
                      <Image
                        alt='start'
                        src='/welcome/Citation.png'
                        fill
                        sizes='(max-width: 768px) 100vw, (max-width: 180px) 50vw, 180px'
                      />
                    </div>
                  </div>
                </div>
              </m.div>
            ) : board === 1 ? (
              <Start handleClose={handleUpdateInfoAndClose} />
            ) : (
              <Edit handleClose={handleUpdateInfoAndClose} />
            )}
          </AnimatePresence>
        </LazyMotionProvider>
      </DialogContent>
    </Dialog>
  );
};
export default OnBoard;
