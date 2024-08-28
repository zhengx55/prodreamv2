'use client';
import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
const AuthAnimatePanel = () => {
  const [positions, setPositions] = useState<
    {
      top: string;
      left: string;
    }[]
  >([]);

  const [trackPosition, setTrackPosition] = useState<{
    leftTop: { top: number; left: number };
    rightTop: { top: number; left: number };
    leftBottom: { top: number; left: number };
    rightBottom: { top: number; left: number };
    leftMiddle: { top: number; left: number };
    rightMiddle: { top: number; left: number };
  } | null>(null);

  const [elementSize, setElementSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const parentEl = useRef<HTMLDivElement>(null);
  const leftTop = useRef<HTMLDivElement>(null);
  const rightTop = useRef<HTMLDivElement>(null);
  const leftBottom = useRef<HTMLDivElement>(null);
  const rightBottom = useRef<HTMLDivElement>(null);
  const leftMiddle = useRef<HTMLDivElement>(null);
  const rightMiddle = useRef<HTMLDivElement>(null);
  const handlePositions = () => {
    const parentCoor = parentEl.current?.getBoundingClientRect();
    const leftTopCoor = leftTop.current?.getBoundingClientRect();
    const rightTopCoor = rightTop.current?.getBoundingClientRect();
    const leftBottomCoor = leftBottom.current?.getBoundingClientRect();
    const rightBottomCoor = rightBottom.current?.getBoundingClientRect();
    const leftMiddleCoor = leftMiddle.current?.getBoundingClientRect();
    const rightMiddleCoor = rightMiddle.current?.getBoundingClientRect();
    if (
      !parentCoor ||
      !leftTopCoor ||
      !rightTopCoor ||
      !leftBottomCoor ||
      !rightBottomCoor ||
      !leftMiddleCoor ||
      !rightMiddleCoor
    )
      return;
    setElementSize({
      width: leftTopCoor?.width || 0,
      height: leftTopCoor?.height || 0,
    });
    const initialPositions = [
      {
        top: `${leftTopCoor?.top - parentCoor?.top}px`,
        left: `${leftTopCoor?.left - parentCoor?.left}px`,
      },
      {
        top: `${rightTopCoor?.top - parentCoor?.top}px`,
        left: `${rightTopCoor?.left - parentCoor?.left}px`,
      },
      {
        top: `${leftBottomCoor?.top - parentCoor?.top}px`,
        left: `${leftMiddleCoor?.left - parentCoor?.left}px`,
      },
      {
        top: `${rightBottomCoor?.top - parentCoor?.top}px`,
        left: `${rightMiddleCoor?.left - parentCoor?.left}px`,
      },
    ];
    const trackPosition = {
      leftTop: {
        top: leftTopCoor?.top || 0,
        left: leftTopCoor?.left || 0,
      },
      rightTop: {
        top: rightTopCoor?.top || 0,
        left: rightTopCoor?.left || 0,
      },
      leftBottom: {
        top: leftBottomCoor?.top || 0,
        left: leftBottomCoor?.left || 0,
      },
      rightBottom: {
        top: rightBottomCoor?.top || 0,
        left: rightBottomCoor?.left || 0,
      },
      leftMiddle: {
        top: leftMiddleCoor?.top || 0,
        left: leftMiddleCoor?.left || 0,
      },
      rightMiddle: {
        top: rightMiddleCoor?.top || 0,
        left: rightMiddleCoor?.left || 0,
      },
    };
    setTrackPosition(trackPosition);
    setPositions(initialPositions);
  };

  useEffect(() => {
    handlePositions();
    window.addEventListener('resize', handlePositions);
    return () => window.removeEventListener('resize', handlePositions);
  }, []);

  const moveElement = (index: number) => {
    setPositions((prevPositions) => {
      if (!trackPosition) return prevPositions;

      const newPositions = [...prevPositions];
      const currentPosition = newPositions[index];
      const currentTop = parseFloat(currentPosition.top);
      const currentLeft = parseFloat(currentPosition.left);

      let newTop = currentTop;
      let newLeft = currentLeft;

      // 根据当前位置来确定下一个位置
      if (
        currentTop ===
          trackPosition.leftTop.top -
            parentEl.current!.getBoundingClientRect().top &&
        currentLeft ===
          trackPosition.leftTop.left -
            parentEl.current!.getBoundingClientRect().left
      ) {
        // 左上 -> 左中
        newTop =
          trackPosition.leftMiddle.top -
          parentEl.current!.getBoundingClientRect().top;
        newLeft =
          trackPosition.leftMiddle.left -
          parentEl.current!.getBoundingClientRect().left;
      } else if (
        currentTop ===
          trackPosition.rightTop.top -
            parentEl.current!.getBoundingClientRect().top &&
        currentLeft ===
          trackPosition.rightTop.left -
            parentEl.current!.getBoundingClientRect().left
      ) {
        // 右上 -> 左上
        newTop =
          trackPosition.leftTop.top -
          parentEl.current!.getBoundingClientRect().top;
        newLeft =
          trackPosition.leftTop.left -
          parentEl.current!.getBoundingClientRect().left;
      } else if (
        currentTop ===
          trackPosition.leftMiddle.top -
            parentEl.current!.getBoundingClientRect().top &&
        currentLeft ===
          trackPosition.leftMiddle.left -
            parentEl.current!.getBoundingClientRect().left
      ) {
        // 左中 -> 左下
        newTop =
          trackPosition.leftBottom.top -
          parentEl.current!.getBoundingClientRect().top;
        newLeft =
          trackPosition.leftBottom.left -
          parentEl.current!.getBoundingClientRect().left;
      } else if (
        currentTop ===
          trackPosition.rightMiddle.top -
            parentEl.current!.getBoundingClientRect().top &&
        currentLeft ===
          trackPosition.rightMiddle.left -
            parentEl.current!.getBoundingClientRect().left
      ) {
        // 右中 -> 右上
        newTop =
          trackPosition.rightTop.top -
          parentEl.current!.getBoundingClientRect().top;
        newLeft =
          trackPosition.rightTop.left -
          parentEl.current!.getBoundingClientRect().left;
      } else if (
        currentTop ===
          trackPosition.leftBottom.top -
            parentEl.current!.getBoundingClientRect().top &&
        currentLeft ===
          trackPosition.leftBottom.left -
            parentEl.current!.getBoundingClientRect().left
      ) {
        // 左下 -> 右下
        newTop =
          trackPosition.rightBottom.top -
          parentEl.current!.getBoundingClientRect().top;
        newLeft =
          trackPosition.rightBottom.left -
          parentEl.current!.getBoundingClientRect().left;
      } else if (
        currentTop ===
          trackPosition.rightBottom.top -
            parentEl.current!.getBoundingClientRect().top &&
        currentLeft ===
          trackPosition.rightBottom.left -
            parentEl.current!.getBoundingClientRect().left
      ) {
        // 右下 -> 右中
        newTop =
          trackPosition.rightMiddle.top -
          parentEl.current!.getBoundingClientRect().top;
        newLeft =
          trackPosition.rightMiddle.left -
          parentEl.current!.getBoundingClientRect().left;
      }

      newPositions[index] = {
        top: `${newTop}px`,
        left: `${newLeft}px`,
      };

      return newPositions;
    });
  };

  useLayoutEffect(() => {
    if (!elementSize) return;
    const intervalId = setInterval(() => {
      for (let i = 0; i < 4; i++) {
        moveElement(i);
      }
    }, 1500);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementSize]);

  const renderImage = (src: string, alt: string) => (
    <Image alt={alt} src={src} fill sizes='(max-width: 768px) 100vw, 33vw' />
  );
  return (
    <div
      ref={parentEl}
      className='relative flex h-screen w-1/2 flex-col gap-y-5'
    >
      {positions.map((position, index) => (
        <div
          key={`${index}`}
          className='absolute transition-all duration-1000 ease-in-out'
          style={{
            top: position.top,
            left: position.left,
            width: elementSize?.width ?? 0,
            height: elementSize?.height ?? 0,
          }}
        >
          {index === 0 && renderImage('/auth/auth_grid_1.png', 'auth')}
          {index === 1 && renderImage('/auth/auth_grid_2.png', 'auth')}
          {index === 2 && renderImage('/auth/auth_grid_3.png', 'auth')}
          {index === 3 && (
            <span className='flex-center size-full rounded-[28px] bg-[#7270E8]'>
              <Image
                alt='auth'
                src='/logo/logo_square.svg'
                width={100}
                height={100}
                priority
                className='size-20'
              />
            </span>
          )}
        </div>
      ))}

      <div className='flex h-[8%] w-full gap-5'>
        <div className='w-[18%] flex-none rounded-br-[28px] bg-gray-100'></div>
        <div className='flex-between flex w-[30%] rounded-b-[28px] bg-gray-100 p-0.5'>
          <span className='w-1/3'></span>
          <span className='h-full w-1/3 rounded-[28px] bg-white/50'></span>
          <span className='h-full w-1/3 rounded-[28px] bg-white'></span>
        </div>
        <div className='flex-between flex w-[30%] rounded-b-[28px] bg-gray-100 p-0.5'>
          <span className='h-full w-1/3 rounded-[28px] bg-white/20'></span>
          <span className='w-1/3'></span>
          <span className='h-full w-1/3 rounded-[28px] bg-white/70'></span>
        </div>
        <div className='w-[18%] flex-none rounded-bl-[28px] bg-gray-100'></div>
      </div>

      {/* 第二行 */}
      <div className='flex h-[28%] w-full gap-5'>
        <div className='w-[18%] flex-none rounded-br-[28px] rounded-tr-[28px] bg-gray-100'></div>
        <div
          ref={leftTop}
          className='relative -z-10 flex w-[30%] overflow-hidden rounded-[28px] bg-gray-100'
        >
          <Image
            alt='auth'
            src='/auth/grid_bg_left.png'
            sizes='(max-width: 768px) 100vw, 33vw'
            fill
          />
        </div>
        <div
          ref={rightTop}
          className='relative -z-10 flex w-[30%] rounded-[28px] bg-gray-100'
        >
          <Image alt='auth' src='/auth/grid_bg_right.png' fill />
        </div>
        <div className='w-[18%] flex-none rounded-bl-[28px] rounded-tl-[28px] bg-gray-100'></div>
      </div>

      {/* 第三行 */}
      <div className='flex h-[28%] w-full gap-5'>
        <div className='w-[18%] flex-none rounded-br-[28px] rounded-tr-[28px] bg-gray-100'></div>
        <div
          ref={leftMiddle}
          className='relative -z-10 w-[30%] rounded-[28px] bg-gray-100'
        >
          <Image
            alt='auth'
            src='/auth/grid_bg_left.png'
            fill
            sizes='(max-width: 768px) 100vw, 33vw'
          />
        </div>
        <div
          ref={rightMiddle}
          className='relative -z-10 w-[30%] rounded-[28px] bg-gray-100'
        >
          <Image
            alt='auth'
            src='/auth/grid_bg_right.png'
            fill
            sizes='(max-width: 768px) 100vw, 33vw'
          />
        </div>
        <div className='w-[18%] flex-none rounded-bl-[28px] rounded-tl-[28px] bg-gray-100'></div>
      </div>

      {/* 第四行 */}
      <div className='flex h-[28%] w-full gap-5'>
        <div className='w-[18%] flex-none rounded-br-[28px] rounded-tr-[28px] bg-gray-100'></div>
        <div
          ref={leftBottom}
          className='relative -z-10 w-[30%] rounded-[28px] bg-gray-100'
        >
          <Image
            alt='auth'
            src='/auth/grid_bg_left.png'
            fill
            sizes='(max-width: 768px) 100vw, 33vw'
          />
        </div>
        <div
          ref={rightBottom}
          className='relative -z-10 w-[30%] rounded-[28px] bg-gray-100'
        >
          <Image
            alt='auth'
            src='/auth/grid_bg_left.png'
            fill
            sizes='(max-width: 768px) 100vw, 33vw'
          />
        </div>
        <div className='w-[18%] flex-none rounded-bl-[28px] rounded-tl-[28px] bg-gray-100'></div>
      </div>

      {/* 第五行 */}
      <div className='flex h-[8%] w-full gap-5'>
        <div className='w-[18%] flex-none rounded-tr-[28px] bg-gray-100'></div>
        <div className='flex w-[30%] rounded-t-[28px] bg-gray-100 p-0.5'>
          <span className='h-full w-1/3 rounded-[28px] bg-white/70'></span>
        </div>
        <div className='flex w-[30%] rounded-t-[28px] bg-gray-100 p-0.5'>
          <span className='h-full w-1/3 rounded-[28px] bg-white/20'></span>
          <span className='w-1/3'></span>
          <span className='h-full w-1/3 rounded-[28px] bg-white/70'></span>
        </div>
        <div className='flex w-[18%] rounded-tl-[28px] bg-gray-100 p-0.5'>
          <span className='h-full w-1/2 rounded-[28px] bg-white/70'></span>
        </div>
      </div>
    </div>
  );
};

export default AuthAnimatePanel;
