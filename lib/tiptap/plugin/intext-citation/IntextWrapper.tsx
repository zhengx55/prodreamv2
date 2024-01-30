import LazyMotionProvider from '@/components/root/LazyMotionProvider';
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import dynamic from 'next/dynamic';
import { memo } from 'react';
const IntextContent = dynamic(() => import('./IntextContent'));
const InTextCitaion = ({
  node,
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
}) => {
  console.log(node);

  return (
    <NodeViewWrapper as='span' className='inline-block'>
      <LazyMotionProvider>
        <NodeViewContent as='span' className='relative cursor-pointer'>
          <IntextContent node={node} />
        </NodeViewContent>
      </LazyMotionProvider>
    </NodeViewWrapper>
  );
};
export default memo(InTextCitaion);
