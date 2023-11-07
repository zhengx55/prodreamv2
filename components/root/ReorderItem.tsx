'use client';
import { Reorder, Variants, useDragControls } from 'framer-motion';
import { GripVertical } from 'lucide-react';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  key: string;
  animate: string;
  variants: Variants;
  classnames: string;
  value: any;
  isParentCollapsed: boolean;
};

const ReorderItem = ({
  children,
  value,
  key,
  animate,
  variants,
  classnames,
  isParentCollapsed,
}: Props) => {
  const controls = useDragControls();

  return (
    <Reorder.Item
      key={key}
      //   dragListener={false}
      //   dragControls={controls}
      value={value}
      initial={false}
      variants={variants}
      className={classnames}
      animate={animate}
    >
      {isParentCollapsed && (
        <GripVertical
          className='absolute -left-7 top-[calc(50%_-_11px)] cursor-grab text-shadow hover:scale-110 hover:text-nav-active'
          size={22}
          onPointerDown={(e) => {
            controls.start(e);
          }}
        />
      )}
      {children}
    </Reorder.Item>
  );
};

export default ReorderItem;
