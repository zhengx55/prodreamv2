import {
  AutoCompleteMenuGROUPS,
  AutoCompleteMenuList,
} from '@/components/editor/ai-autocomplete-slash-command';
import { Editor, Extension } from '@tiptap/core';
import { PluginKey } from '@tiptap/pm/state';
import { ReactRenderer } from '@tiptap/react';
import Suggestion, {
  SuggestionKeyDownProps,
  SuggestionProps,
} from '@tiptap/suggestion';
import tippy from 'tippy.js';

const extensionName = 'AutoCompleteSlashCommand';

let popup: any;

export const AutoCompleteSlashCommand = Extension.create({
  name: extensionName,
  priority: 300,
  onCreate() {
    popup = tippy('body', {
      interactive: true,
      trigger: 'manual',
      placement: 'bottom-start',
      maxWidth: '16rem',
      popperOptions: {
        strategy: 'fixed',
        modifiers: [
          {
            name: 'flip',
            enabled: false,
          },
        ],
      },
    });
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        char: '/',
        startOfLine: false,
        allowedPrefixes: null,
        pluginKey: new PluginKey(extensionName),
        allow: ({ state, range }) => {
          const $from = state.doc.resolve(range.from);
          const isParagraph = $from.parent.type.name === 'paragraph';
          const isSlashAtTheEnd =
            $from.parent.textContent.length > 1 &&
            $from.parent.textContent?.charAt(
              $from.parent.textContent.length - 1
            ) === '/';

          return isParagraph && isSlashAtTheEnd;
        },
        command: ({ editor, props }: { editor: Editor; props: any }) => {
          const { view, state } = editor;
          const { $head, $from } = view.state.selection;
          const end = $from.pos;
          const from = $head?.nodeBefore
            ? end -
              ($head.nodeBefore.text?.substring(
                $head.nodeBefore.text?.indexOf('/')
              ).length ?? 0)
            : $from.start();
          const tr = state.tr.deleteRange(from, end);
          view.dispatch(tr);
          view.focus();
        },

        items: ({ query }: { query: string }) => {
          const withFilteredCommands = AutoCompleteMenuGROUPS.map((group) => ({
            ...group,
            commands: group.commands.filter((item) => {
              const labelNormalized = item.label.toLowerCase().trim();
              const queryNormalized = query.toLowerCase().trim();
              return labelNormalized.includes(queryNormalized);
            }),
          }));
          return withFilteredCommands;
        },
        render: () => {
          let component: any;
          let editor_parent: HTMLElement | null;
          let scrollHandler: (() => void) | null = null;

          return {
            onStart: (props: SuggestionProps) => {
              component = new ReactRenderer(AutoCompleteMenuList, {
                props,
                editor: props.editor,
              });

              const { view } = props.editor;
              editor_parent = document.getElementById('editor-parent');
              editor_parent!.classList.replace(
                'overflow-y-auto',
                'overflow-y-hidden'
              );
              const getReferenceClientRect = () => {
                if (!props.clientRect) {
                  return props.editor.storage[extensionName].rect;
                }
                const rect = props.clientRect();
                if (!rect) {
                  return props.editor.storage[extensionName].rect;
                }
                let yPos = rect.y;
                if (
                  rect.top + component.element.offsetHeight + 40 >
                  window.innerHeight
                ) {
                  const diff =
                    rect.top +
                    component.element.offsetHeight -
                    window.innerHeight +
                    40;
                  yPos = rect.y - diff;
                }
                return new DOMRect(rect.x, yPos, rect.width, rect.height);
              };

              scrollHandler = () => {
                popup?.[0].setProps({
                  getReferenceClientRect,
                });
              };

              view.dom.parentElement?.addEventListener('scroll', scrollHandler);

              popup?.[0].setProps({
                getReferenceClientRect,
                appendTo: () => document.body,
                content: component.element,
              });

              popup?.[0].show();
            },

            onUpdate(props: SuggestionProps) {
              component.updateProps(props);

              const { view } = props.editor;

              const getReferenceClientRect = () => {
                if (!props.clientRect) {
                  return props.editor.storage[extensionName].rect;
                }

                const rect = props.clientRect();

                if (!rect) {
                  return props.editor.storage[extensionName].rect;
                }

                // Account for when the editor is bound inside a container that doesn't go all the way to the edge of the screen
                return new DOMRect(rect.x, rect.y, rect.width, rect.height);
              };

              let scrollHandler = () => {
                popup?.[0].setProps({
                  getReferenceClientRect,
                });
              };

              view.dom.parentElement?.addEventListener('scroll', scrollHandler);
              props.editor.storage[extensionName].rect = props.clientRect
                ? getReferenceClientRect()
                : {
                    width: 0,
                    height: 0,
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                  };
              popup?.[0].setProps({
                getReferenceClientRect,
              });
            },

            onKeyDown(props: SuggestionKeyDownProps) {
              if (props.event.key === 'Escape') {
                popup?.[0].hide();
                return true;
              }

              if (!popup?.[0].state.isShown) {
                popup?.[0].show();
              }

              return component.ref?.onKeyDown(props);
            },

            onExit(props: { editor: { view: any } }) {
              popup?.[0].hide();
              editor_parent!.classList.replace(
                'overflow-y-hidden',
                'overflow-y-auto'
              );
              if (scrollHandler) {
                const { view } = props.editor;
                view.dom.parentElement?.removeEventListener(
                  'scroll',
                  scrollHandler
                );
              }
              component.destroy();
            },
          };
        },
      }),
    ];
  },

  addStorage() {
    return {
      rect: {
        width: 0,
        height: 0,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    };
  },
});

export default AutoCompleteSlashCommand;
