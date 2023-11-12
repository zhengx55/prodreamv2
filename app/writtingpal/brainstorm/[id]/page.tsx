'use client';
import FormPanel from '@/components/brainstorm/FormPanel';
import OutputPanel from '@/components/brainstorm/OutputPanel';
import { Grid } from 'lucide-react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Provider } from 'react-redux';
import { store } from '../../../../store/store';
import { useEssayWriting } from '@/query/query';
import { redirect } from 'next/navigation';
export default function Page({ params }: { params: { id: string } }) {
  // !test hard code chat id

  const { isPending: isSubmitPending, mutateAsync: submitEssay } =
    useEssayWriting();

  if (params.id === '820e6ec3bb1648958140ffac066836e9') {
    redirect(`/writtingpal/brainstorm/${params.id}/chat`);
  }
  return (
    <Provider store={store}>
      <main className='flex h-full w-full overflow-y-hidden bg-sectionBackground'>
        <PanelGroup direction='horizontal' disablePointerEventsDuringResize>
          <Panel minSize={45} defaultSize={50}>
            <FormPanel
              submitHandler={submitEssay}
              submitPending={isSubmitPending}
            />
          </Panel>
          <PanelResizeHandle className='relative w-[1px] rounded-lg bg-shadow-border'>
            <Grid
              className='absolute -left-2.5 top-[50%] text-shadow'
              size={20}
            />
          </PanelResizeHandle>
          <Panel
            className='flex h-full w-full flex-col overflow-y-hidden px-6 pt-4'
            minSize={45}
            defaultSize={50}
          >
            <OutputPanel submitPending={isSubmitPending} />
          </Panel>
        </PanelGroup>
      </main>
    </Provider>
  );
}
