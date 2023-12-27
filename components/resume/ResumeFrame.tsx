'use client';
import {
  A4_HEIGHT_PX,
  A4_WIDTH_PT,
  A4_WIDTH_PX,
  LETTER_WIDTH_PT,
} from '@/constant/pdfsize';
import { ReactNode, useMemo } from 'react';
import Frame from 'react-frame-component';

const getIframeInitialContent = (isA4: boolean) => {
  const width = isA4 ? A4_WIDTH_PT : LETTER_WIDTH_PT;
  //   const allFontFamilies = getAllFontFamiliesToLoad();

  //   const allFontFamiliesPreloadLinks = allFontFamilies
  //     .map(
  //       (
  //         font
  //       ) => `<link rel="preload" as="font" href="/fonts/${font}-Regular.ttf" type="font/ttf" crossorigin="anonymous">
  // <link rel="preload" as="font" href="/fonts/${font}-Bold.ttf" type="font/ttf" crossorigin="anonymous">`
  //     )
  //     .join('');

  //   const allFontFamiliesFontFaces = allFontFamilies
  //     .map(
  //       (
  //         font
  //       ) => `@font-face {font-family: "${font}"; src: url("/fonts/${font}-Regular.ttf");}
  // @font-face {font-family: "${font}"; src: url("/fonts/${font}-Bold.ttf"); font-weight: bold;}`
  //     )
  //     .join('');

  return `<!DOCTYPE html>
<html>
  <head>

  </head>
  <body style='overflow: hidden; width: ${A4_WIDTH_PT}pt; margin: 0; padding: 0; -webkit-text-size-adjust:none;'>
    <div></div>
  </body>
</html>`;
};

function ResumeFrame({
  scale,
  children,
}: {
  children: ReactNode;
  scale: number;
}) {
  const isA4 = true;
  const iframeInitialContent = useMemo(
    () => getIframeInitialContent(isA4),
    [isA4]
  );
  return (
    <div
      style={{
        maxWidth: `${A4_WIDTH_PX * scale}px`,
        maxHeight: `${A4_HEIGHT_PX * scale}px`,
      }}
    >
      <div
        style={{
          width: `${A4_WIDTH_PX}px`,
          height: `${A4_HEIGHT_PX}px`,
          transform: `scale(${scale})`,
        }}
        className={`origin-top-left rounded-xl bg-white shadow-2xl`}
      >
        <Frame
          initialContent={iframeInitialContent}
          style={{ width: '100%', height: '100%' }}
          key={'A4'}
        >
          {children}
        </Frame>
      </div>
    </div>
  );
}

export default ResumeFrame;
