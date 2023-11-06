'use client';
import FormPanel from '@/components/brainstorm/FormPanel';
import OutputPanel from '@/components/brainstorm/OutputPanel';
import { Separator } from '@/components/ui/separator';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

export default function Page() {
  return (
    <main className='flex flex-1 bg-sectionBackground'>
      <PanelGroup direction='horizontal' disablePointerEventsDuringResize>
        <FormPanel />
        <PanelResizeHandle className='w-[2px] rounded-lg bg-shadow-border' />
        <OutputPanel />
      </PanelGroup>
      {/* <Separator orientation='vertical' className='bg-shadow-border' /> */}
    </main>
  );
}
