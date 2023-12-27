'use client';
import OutputPanel from '@/components/brainstorm/OutputPanel';
import { IBrainStormSection } from '@/query/type';
import { Grid } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import Loading from '../root/CustomLoading';
const FormPanel = dynamic(() => import('@/components/brainstorm/FormPanel'), {
  ssr: false,
  loading: () => <Loading />,
});
type Props = { template_data: IBrainStormSection };

const ResizePanel = ({ template_data }: Props) => {
  return (
    <PanelGroup direction='horizontal' disablePointerEventsDuringResize>
      <Panel minSize={45} defaultSize={50}>
        <FormPanel templateData={template_data} />
      </Panel>
      <PanelResizeHandle className='relative w-[1px] rounded-lg bg-shadow-border'>
        <Grid className='absolute -left-2.5 top-[50%] text-shadow' size={20} />
      </PanelResizeHandle>
      <Panel
        className='flex h-full w-full flex-col overflow-y-hidden px-6 pt-4'
        minSize={45}
        defaultSize={50}
      >
        <OutputPanel />
      </Panel>
    </PanelGroup>
  );
};

export default ResizePanel;
