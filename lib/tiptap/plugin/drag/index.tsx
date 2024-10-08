import { Extension } from '@tiptap/core';

import { NodeSelection, Plugin } from '@tiptap/pm/state';
// @ts-ignore
import { __serializeForClipboard, EditorView } from '@tiptap/pm/view';

export interface DragHandleOptions {
  /**
   * The width of the drag handle
   */
  dragHandleWidth: number;
}
function absoluteRect(node: Element) {
  const data = node.getBoundingClientRect();

  return {
    top: data.top,
    left: data.left,
    width: data.width,
  };
}

function nodeDOMAtCoords(coords: { x: number; y: number }) {
  return document
    .elementsFromPoint(coords.x, coords.y)
    .find(
      (elem: Element) =>
        elem.parentElement?.matches?.('.ProseMirror') &&
        elem.matches(['li', 'p', 'h2, h3, h4'].join(', '))
    );
}

function nodePosAtDOM(node: Element, view: EditorView) {
  const boundingRect = node.getBoundingClientRect();

  return view.posAtCoords({
    left: boundingRect.left + 1,
    top: boundingRect.top + 1,
  })?.inside;
}

function DragHandle(options: DragHandleOptions) {
  function handleDragStart(event: DragEvent, view: EditorView) {
    view.focus();

    if (!event.dataTransfer) return;

    const node = nodeDOMAtCoords({
      x: event.clientX + 50 + options.dragHandleWidth,
      y: event.clientY,
    });

    if (!(node instanceof Element)) return;

    const nodePos = nodePosAtDOM(node, view);
    if (nodePos == null || nodePos < 0) return;

    view.dispatch(
      view.state.tr.setSelection(NodeSelection.create(view.state.doc, nodePos))
    );

    const slice = view.state.selection.content();
    const { dom, text } = __serializeForClipboard(view, slice);
    event.dataTransfer.clearData();
    event.dataTransfer.setData('text/html', dom.innerHTML);
    event.dataTransfer.setData('text/plain', text);
    event.dataTransfer.effectAllowed = 'copyMove';
    event.dataTransfer.setDragImage(node, 0, 0);
    view.dragging = { slice, move: event.ctrlKey };
  }

  function handleClick(event: MouseEvent, view: EditorView) {
    view.focus();
    view.dom.classList.remove('dragging');
    const node = nodeDOMAtCoords({
      x: event.clientX + 50 + options.dragHandleWidth,
      y: event.clientY,
    });

    if (!(node instanceof Element)) return;

    const nodePos = nodePosAtDOM(node, view);
    if (!nodePos) return;

    view.dispatch(
      view.state.tr.setSelection(NodeSelection.create(view.state.doc, nodePos))
    );
  }
  let toolTipElement: HTMLElement | null = null;
  let dragHandleElement: HTMLElement | null = null;

  function showTooltip(e: MouseEvent) {
    if (toolTipElement) {
      toolTipElement.classList.remove('hidden');
    }
  }

  function hideTooltip() {
    if (toolTipElement) {
      toolTipElement.classList.add('hidden');
    }
  }

  function hideDragHandle() {
    if (dragHandleElement) {
      dragHandleElement.classList.add('hidden');
    }
  }

  function showDragHandle() {
    if (dragHandleElement) {
      dragHandleElement.classList.remove('hidden');
    }
  }

  return new Plugin({
    view: (view) => {
      const parent = view.dom.parentElement;
      dragHandleElement = document.createElement('div');
      dragHandleElement.id = 'dragHandle';
      dragHandleElement.draggable = true;
      dragHandleElement.dataset.dragHandle = '';
      dragHandleElement.classList.add('drag-handle');
      toolTipElement = document.createElement('div');
      toolTipElement.innerHTML =
        '<p><span style="color: white;">Drag</span> to move<br/><span style="color: white;">Click</span> to open menu</p>';
      toolTipElement.classList.add('tooltip');
      document.body.appendChild(toolTipElement);
      dragHandleElement.addEventListener('dragstart', (e) => {
        handleDragStart(e, view);
      });
      dragHandleElement.addEventListener('click', (e) => {
        handleClick(e, view);
      });
      dragHandleElement.addEventListener('mouseenter', (e) => {
        showTooltip(e);
      });
      dragHandleElement.addEventListener('mouseleave', () => {
        hideTooltip();
      });
      hideTooltip();
      hideDragHandle();
      parent?.appendChild(dragHandleElement);
      parent?.appendChild(toolTipElement);
      return {
        destroy: () => {
          dragHandleElement?.removeEventListener('dragstart', (e) => {
            handleDragStart(e, view);
          });
          dragHandleElement?.removeEventListener('click', (e) => {
            handleClick(e, view);
          });
          dragHandleElement?.removeEventListener('mouseenter', (e) => {
            showTooltip(e);
          });
          dragHandleElement?.removeEventListener('mouseleave', () => {
            hideTooltip();
          });
          dragHandleElement?.remove?.();
          dragHandleElement = null;
          toolTipElement?.remove?.();
          toolTipElement = null;
        },
      };
    },

    props: {
      handleDOMEvents: {
        mouseout: (_view, event) => {
          if (
            event.relatedTarget instanceof Element &&
            event.relatedTarget.id === 'dragHandle'
          )
            return;
          hideDragHandle();
        },
        mousemove: (view, event) => {
          if (!view.editable) {
            return;
          }
          const node = nodeDOMAtCoords({
            x: event.clientX + 50 + options.dragHandleWidth,
            y: event.clientY,
          });
          if (!(node instanceof Element) || node.matches('ul, ol')) {
            hideDragHandle();
            return;
          }
          const compStyle = window.getComputedStyle(node);
          const lineHeight = parseInt(compStyle.lineHeight, 10);
          const paddingTop = parseInt(compStyle.paddingTop, 10);
          const rect = absoluteRect(node);
          rect.top += (lineHeight - 24) / 2;
          rect.top += paddingTop;
          if (node.matches('ul:not([data-type=taskList]) li, ol li')) {
            rect.left -= options.dragHandleWidth;
          }
          rect.width = options.dragHandleWidth;

          if (!dragHandleElement || !toolTipElement) return;
          dragHandleElement.style.left = `${rect.left - rect.width}px`;
          dragHandleElement.style.top = `${rect.top}px`;
          toolTipElement.style.left = `${rect.left - rect.width - 130}px`;
          toolTipElement.style.top = `${rect.top + 25}px`;
          showDragHandle();
        },
        keydown: () => {
          hideDragHandle();
        },
        mousewheel: () => {
          hideDragHandle();
        },
        dragstart: (view) => {
          view.dom.classList.add('dragging');
        },
        drop: (view) => {
          view.dom.classList.remove('dragging');
        },
        dragend: (view) => {
          view.dom.classList.remove('dragging');
        },
      },
    },
  });
}

interface DragAndDropOptions {}

const DragAndDrop = Extension.create<DragAndDropOptions>({
  name: 'dragAndDrop',

  addProseMirrorPlugins() {
    return [
      DragHandle({
        dragHandleWidth: 24,
      }),
    ];
  },
});

export default DragAndDrop;
