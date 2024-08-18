import { create, useStore } from 'zustand';
import { ChatAgentStore, useChatAgent } from './slice/workbench/chat-agent';
import { EditorStore, useEditorStore } from './slice/workbench/editor';
import { RightbarStore, useRightbarStore } from './slice/workbench/rightbar';

type AppStore = ChatAgentStore & EditorStore & RightbarStore;

const useRootStore = create<AppStore>((...a) => ({
  ...useChatAgent(...a),
  ...useEditorStore(...a),
  ...useRightbarStore(...a),
}));

export function useAgent<T>(selector?: (state: ChatAgentStore) => T) {
  return useStore(useRootStore, selector!);
}

export function useEditor<T>(selector?: (state: EditorStore) => T) {
  return useStore(useRootStore, selector!);
}

export function useRightbar<T>(selector?: (state: RightbarStore) => T) {
  return useStore(useRootStore, selector!);
}

export default useRootStore;
