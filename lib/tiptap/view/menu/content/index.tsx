// import { Editor } from '@tiptap/react';
// import { useEffect, useState } from 'react';
// import useContentItemActions from './hooks/useContenItemActions';

// export type ContentItemMenuProps = {
//   editor: Editor;
// };

// export const ContentItemMenu = ({ editor }: ContentItemMenuProps) => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const data = useData();
//   const actions = useContentItemActions(
//     editor,
//     data.currentNode,
//     data.currentNodePos
//   );

//   useEffect(() => {
//     if (menuOpen) {
//       editor.commands.setMeta('lockDragHandle', true);
//     } else {
//       editor.commands.setMeta('lockDragHandle', false);
//     }
//   }, [editor, menuOpen]);

//   return (
//     <DragHandle
//       pluginKey='ContentItemMenu'
//       editor={editor}
//       onNodeChange={data.handleNodeChange}
//       tippyOptions={{
//         offset: [-2, 16],
//         zIndex: 99,
//       }}
//     ></DragHandle>
//   );
// };
