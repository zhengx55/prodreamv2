// 'use client';
// import { Textarea } from '@/components/ui/textarea';
// import { useEffect, useRef, useState } from 'react';
// // import { useOnClickOutside } from 'usehooks-ts';

// export default function Home() {
//   const [selectedText, setSelectedText] = useState('');
//   const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

//   const handleTextSelect = () => {
//     requestAnimationFrame(() => {
//       const selection = document.getSelection();
//       const range = selection?.getRangeAt(0);
//       if (range && range.toString() !== '') {
//         const rect = range.getBoundingClientRect();
//         setTooltipPosition({
//           top: rect.top + window.scrollY - 40,
//           left: rect.left + rect.width / 2 + window.scrollX,
//         });
//         setSelectedText(range.toString());
//       } else {
//         setSelectedText('');
//       }
//     });
//   };

//   return (
//     <main className='min-h-screen bg-slate-400 py-20'>
//       <div
//         contentEditable
//         onMouseUp={handleTextSelect}
//         className='h-screen w-full select-text bg-slate-600 p-10 text-white'
//         placeholder='edit text...'
//       />
//       {selectedText && (
//         <div
//           style={{
//             position: 'absolute',
//             background: 'rgba(0, 0, 0, 0.8)',
//             color: 'white',
//             padding: '5px',
//             borderRadius: '5px',
//             pointerEvents: 'none',
//             top: tooltipPosition.top,
//             left: tooltipPosition.left,
//           }}
//         >
//           Menu
//         </div>
//       )}
//     </main>
//   );
// }
