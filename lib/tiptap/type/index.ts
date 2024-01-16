import { Editor as CoreEditor } from '@tiptap/core';
import { EditorState } from '@tiptap/pm/state';
import { EditorView } from '@tiptap/pm/view';
import { Editor } from '@tiptap/react';
import React, { ReactNode } from 'react';
export interface MenuProps {
  editor: Editor;
  appendTo?: React.RefObject<any>;
  shouldHide?: boolean;
}

export interface ShouldShowProps {
  editor?: CoreEditor;
  view: EditorView;
  state?: EditorState;
  oldState?: EditorState;
  from?: number;
  to?: number;
}

export interface Group {
  name: string;
  title: string;
  commands: Command[];
}

export interface Command {
  name: string;
  label: string;
  description?: string;
  aliases?: string[];
  iconName?: ReactNode;
  action?: (editor: Editor) => void;
  shouldBeHidden?: (editor: Editor) => boolean;
  apiEndpoint?: string;
}

export interface MenuListProps {
  editor: Editor;
  items: Group[];
  command: (command: Command) => void;
}
