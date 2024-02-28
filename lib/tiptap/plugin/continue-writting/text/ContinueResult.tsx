import { NodeViewContent, NodeViewProps, NodeViewWrapper } from '@tiptap/react';
import { memo } from 'react';
const ContinueButton = (
  props: NodeViewProps & { node: { attrs: { citation_id: string } } }
) => {
  return (
    <NodeViewWrapper className='inline-block'>
      <NodeViewContent
        as='span'
        className='relative cursor-pointer'
      ></NodeViewContent>
    </NodeViewWrapper>
  );
};
export default memo(ContinueButton);
