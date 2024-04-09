import { useLayoutEffect } from 'react';

const useAutoSizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string,
  maxSize?: number
) => {
  useLayoutEffect(() => {
    const textArea = textAreaRef;
    if (textArea) {
      textArea.style.height = '0px';
      const scrollHeight = textArea.scrollHeight;
      textArea.style.height =
        scrollHeight > (maxSize || 96)
          ? (maxSize || 96) + 'px'
          : scrollHeight + 'px';
    }
  }, [maxSize, textAreaRef, value]);
};

export default useAutoSizeTextArea;
