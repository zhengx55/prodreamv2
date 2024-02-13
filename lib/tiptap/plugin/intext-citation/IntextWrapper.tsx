import { NodeViewContent, NodeViewProps, NodeViewWrapper } from '@tiptap/react';
import dynamic from 'next/dynamic';
import { memo } from 'react';
const IntextContent = dynamic(() => import('./IntextContent'));
const InTextCitaion = (
  props: NodeViewProps & { node: { attrs: { citation_id: string } } }
) => {
  return (
    <NodeViewWrapper
      data-id={props.node.attrs.citation_id}
      className='inline-block'
    >
      <NodeViewContent as='span' className='relative cursor-pointer'>
        <IntextContent {...props} />
      </NodeViewContent>
    </NodeViewWrapper>
  );
};
export default memo(InTextCitaion);
