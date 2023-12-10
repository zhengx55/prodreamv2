'use client';
import FormPanel from '@/components/brainstorm/FormPanel';
import OutputPanel from '@/components/brainstorm/OutputPanel';
import { Grid } from 'lucide-react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <main className='flex h-full w-full overflow-y-hidden bg-sectionBackground'>
      <PanelGroup direction='horizontal' disablePointerEventsDuringResize>
        <Panel minSize={45} defaultSize={50}>
          <FormPanel brainStormId={params.id} />
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
          <OutputPanel />
        </Panel>
      </PanelGroup>
    </main>
  );
}
