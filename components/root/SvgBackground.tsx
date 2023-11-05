'use client';

import { JSX, SVGProps } from 'react';

const SvgBackground = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={215}
    height={93}
    viewBox='0 0 215 93'
    fill='none'
    {...props}
  >
    <g filter='url(#filter0_d_504_22322)'>
      <rect x={4} y={4} width={200} height={85} rx={10} fill='#7D22F5' />
      <rect x={6} y={4} width={205} height={85} rx={10} fill='white' />
    </g>
    <defs>
      <filter
        id='filter0_d_504_22322'
        x={0}
        y={0}
        width={215}
        height={93}
        filterUnits='userSpaceOnUse'
        colorInterpolationFilters='sRGB'
      >
        <feFlood floodOpacity={0} result='BackgroundImageFix' />
        <feColorMatrix
          in='SourceAlpha'
          type='matrix'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
          result='hardAlpha'
        />
        <feOffset />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2='hardAlpha' operator='out' />
        <feColorMatrix
          type='matrix'
          values='0 0 0 0 0.611765 0 0 0 0 0.172549 0 0 0 0 0.952941 0 0 0 0.25 0'
        />
        <feBlend
          mode='normal'
          in2='BackgroundImageFix'
          result='effect1_dropShadow_504_22322'
        />
        <feBlend
          mode='normal'
          in='SourceGraphic'
          in2='effect1_dropShadow_504_22322'
          result='shape'
        />
      </filter>
    </defs>
  </svg>
);
export default SvgBackground;
