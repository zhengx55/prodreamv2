import { Link } from '@react-pdf/renderer';
import React from 'react';

type Props = { src: string; isPDF: boolean; children: React.ReactNode };

const ResumePDFLink = ({ src, isPDF, children }: Props) => {
  if (isPDF) {
    return (
      <Link src={src} style={{ textDecoration: 'none' }}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={src}
      style={{ textDecoration: 'none' }}
      target='_blank'
      rel='noreferrer'
    >
      {children}
    </a>
  );
};

export default ResumePDFLink;
