'use client';
import FormPanel from '@/components/brainstorm/FormPanel';
import OutputPanel from '@/components/brainstorm/OutputPanel';
import { Move } from 'lucide-react';
import { PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

export default function Page() {
  return (
    <main className='flex flex-1 bg-sectionBackground'>
      <PanelGroup direction='horizontal' disablePointerEventsDuringResize>
        <FormPanel />
        <PanelResizeHandle className='relative w-[1px] rounded-lg bg-shadow-border'>
          <Move
            className='absolute -left-2.5 top-[50%] text-shadow'
            size={20}
          />
        </PanelResizeHandle>
        <OutputPanel />
      </PanelGroup>
    </main>
  );
}
