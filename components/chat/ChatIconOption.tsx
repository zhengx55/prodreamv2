import React, { memo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

type Props = {
  title: string;
  icon: string;
  theme: string;
};

const ChatIconOption = ({ title, icon, theme }: Props) => {
  return (
    <motion.div
      whileHover={{ y: -1 }}
      className={`flex cursor-pointer items-center gap-x-3 rounded-[64px] bg-white py-2 pl-2 pr-4`}
    >
      <div
        className='flex-center h-10 w-10 rounded-full'
        style={{ backgroundColor: theme }}
      >
        <Image
          alt={title}
          src={icon}
          width={24}
          height={24}
          className='h-auto w-auto'
        />
      </div>
      <h3 className={'base-semibold'}>{title}</h3>
    </motion.div>
  );
};

export default memo(ChatIconOption);
