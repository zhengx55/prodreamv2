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
      className={`flex cursor-pointer items-center gap-x-3 rounded-[64px] bg-white py-1 pl-1 pr-4`}
    >
      <div
        className='flex-center h-8 w-8 rounded-full'
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
      <h3 className={'small-semibold'}>{title}</h3>
    </motion.div>
  );
};

export default memo(ChatIconOption);
