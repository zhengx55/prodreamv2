import { findTitle } from '@/lib/tiptap/utils';
import { getDraftSteam, useSaveDraft } from '@/query/draft';
import { getOutlineStream, useSaveOutline } from '@/query/outline';
import { useEditor as useEditorStore } from '@/zustand/store';
import type { Editor } from '@tiptap/core';
import type { Transaction } from '@tiptap/pm/state';
import { useEditor } from '@tiptap/react';
import { marked } from 'marked';
import { useParams, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useUpdateEffect } from 'react-use';
import TurndownService from 'turndown';
import { useDebouncedCallback } from 'use-debounce';
import EditorExtensions from '../extensions';

export default function useEditorBlock(
  defaultContent?: string,
  defaultHTML?: string,
  defaultTitle?: string
) {
  const setEditor = useEditorStore((state) => state.setEditor);
  const clearStore = useEditorStore((state) => state.clearStore);
  const isGrammarMode = useEditorStore((state) => state.isGrammarMode);
  const setEditorContentGenerating = useEditorStore(
    (state) => state.setEditorContentGenerating
  );
  const { id } = useParams();
  const path = usePathname();
  const shouldTriggerDraftStream =
    path.includes('draft') && Boolean(id) && !defaultContent;
  const shouldTriggerOutlineStream =
    path.includes('outline') && Boolean(id) && !defaultContent;
  const { mutateAsync: saveDraftFile } = useSaveDraft();
  const { mutateAsync: saveOutlineFile } = useSaveOutline();
  const debouncedCallback = useDebouncedCallback(
    ({ editor }: { editor: Editor; transaction: Transaction }) => {
      if (!id || isGrammarMode) return;
      const currentTitle = findTitle(editor as Editor).content;
      const currentHTML = editor.getHTML();
      const updatedTitle = currentTitle !== defaultTitle ? currentTitle : null;
      const turnDownService = new TurndownService();
      const updatedHTML = currentHTML !== defaultHTML ? currentHTML : null;
      const updatedContent = updatedHTML
        ? turnDownService.turndown(currentHTML.replace(/<h1>.*?<\/h1>/, ''))
        : null;
      if (path.includes('outline')) {
        saveOutlineFile({
          outline_id: id as string,
          title: updatedTitle,
          content: updatedContent,
          html: updatedHTML,
        });
      } else if (path.includes('draft')) {
        saveDraftFile({
          draft_id: id as string,
          title: updatedTitle,
          content: updatedContent,
          html: updatedHTML,
        });
      }
    },
    2000
  );
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [...EditorExtensions()],
    injectCSS: false,
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        spellcheck: 'false',
        class: 'min-h-full focus:outline-none prose prose-base !max-w-none',
      },
    },
    content: defaultHTML
      ? defaultHTML
      : defaultContent
        ? `<h1>Untitled</h1> ${marked.parse(defaultContent)}`
        : '<h1>Untitled</h1>',
    onCreate: async ({ editor }) => {
      setEditor(editor as Editor);
    },
    onUpdate: debouncedCallback,
    onDestroy: () => {
      clearStore();
    },
  });
  const createAbort = useEditorStore((state) => state.createAbortController);
  const recreateSignal = useEditorStore((state) => state.recreateSignal);
  const setRecreateSignal = useEditorStore((state) => state.setRecreateSignal);

  useEffect(() => {
    const abortController = new AbortController();
    async function getStream() {
      if (shouldTriggerDraftStream && editor) {
        createAbort(abortController);
        setEditorContentGenerating(true);
        await getDraftSteam(
          id as string,
          editor as Editor,
          abortController.signal
        );
        setEditorContentGenerating(false);
      }
    }
    getStream();
    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldTriggerDraftStream, editor, id]);

  useEffect(() => {
    const abortController = new AbortController();
    async function getStream() {
      if (shouldTriggerOutlineStream && editor) {
        createAbort(abortController);
        setEditorContentGenerating(true);
        await getOutlineStream(
          id as string,
          editor as Editor,
          abortController.signal
        );
        setEditorContentGenerating(false);
      }
    }
    getStream();
    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldTriggerOutlineStream, editor, id]);

  useUpdateEffect(() => {
    if (recreateSignal) {
      const abortController = new AbortController();
      createAbort(abortController);
      if (path.includes('outline') && id && editor) {
        getOutlineStream(
          id as string,
          editor as Editor,
          abortController.signal
        );
        setRecreateSignal(false);
      } else if (path.includes('draft') && id && editor) {
        getDraftSteam(id as string, editor as Editor, abortController.signal);
        setRecreateSignal(false);
      }
    }
  }, [recreateSignal, path, id, editor]);

  return { editor };
}
