import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import dynamic from 'next/dynamic';
import { memo } from 'react';
const IntextContent = dynamic(() => import('./IntextContent'));
const InTextCitaion = ({
  node,
  deleteNode,
}: {
  node: {
    attrs: {
      citation_id: string;
      author: string;
      publish_year: string;
      article_title: string;
      abstract: string;
    };
  };
  deleteNode: () => void;
}) => {
  return (
    <NodeViewWrapper
      data-id={node.attrs.citation_id}
      as='span'
      className='inline-block'
    >
      <NodeViewContent as='span' className='relative cursor-pointer'>
        <IntextContent node={node} deleteHandler={deleteNode} />
      </NodeViewContent>
    </NodeViewWrapper>
  );
};
export default memo(InTextCitaion);
