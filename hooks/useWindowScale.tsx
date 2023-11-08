import { CSS_VARIABLES } from '@/app/global-css';
import { A4_HEIGHT_PX, LETTER_HEIGHT_PX } from '@/constant/pdfsize';
import { useEffect, useState } from 'react';

const getPxPerRem = () => {
  const bodyComputedStyle = getComputedStyle(
    document.querySelector('body')!
  ) as any;
  return parseFloat(bodyComputedStyle['font-size']) || 16;
};

export const useSetDefaultScale = ({
  setScale,
  documentSize,
}: {
  setScale: (scale: number) => void;
  documentSize: string;
}) => {
  const [scaleOnResize, setScaleOnResize] = useState(true);

  useEffect(() => {
    const getDefaultScale = () => {
      const screenHeightPx = window.innerHeight;
      const PX_PER_REM = getPxPerRem();
      const screenHeightRem = screenHeightPx / PX_PER_REM;
      const topNavBarHeightRem = parseFloat(
        CSS_VARIABLES['--top-nav-bar-height']
      );
      const resumeControlBarHeight = parseFloat(
        CSS_VARIABLES['--resume-control-bar-height']
      );
      const resumePadding = parseFloat(CSS_VARIABLES['--resume-padding']);
      const topAndBottomResumePadding = resumePadding * 2;
      const defaultResumeHeightRem =
        screenHeightRem -
        topNavBarHeightRem -
        resumeControlBarHeight -
        topAndBottomResumePadding;
      const resumeHeightPx = defaultResumeHeightRem * PX_PER_REM;
      const height = documentSize === 'A4' ? A4_HEIGHT_PX : LETTER_HEIGHT_PX;
      const defaultScale = Math.round((resumeHeightPx / height) * 100) / 100;
      return defaultScale;
    };

    const setDefaultScale = () => {
      const defaultScale = getDefaultScale();
      setScale(defaultScale);
    };

    if (scaleOnResize) {
      setDefaultScale();
      window.addEventListener('resize', setDefaultScale);
    }

    return () => {
      window.removeEventListener('resize', setDefaultScale);
    };
  }, [setScale, scaleOnResize, documentSize]);

  return { scaleOnResize, setScaleOnResize };
};
