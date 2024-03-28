'use client';

import { memo, useEffect, useState } from 'react';

type Props = { timestamp: number };
const DiscountCountdown = ({ timestamp }: Props) => {
  const calculateTimeLeft = () => {
    const difference =
      new Date(timestamp * 1000).getTime() - new Date().getTime();
    let timeLeft = '';
    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      const format = (num: number) => (num < 10 ? `0${num}` : num);
      timeLeft = `${days} days ${format(hours)}:${format(minutes)}:${format(seconds)}`;
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return <p className='subtle-regular text-violet-500'>Ends in: {timeLeft}</p>;
};
export default memo(DiscountCountdown);
