import React from 'react';
import type { Style } from '@react-pdf/types';
import { Text, View } from '@react-pdf/renderer';
import { spacing, styles } from '../ResumeStyle';

type Props = {
  themeColor?: string;
  heading?: string;
  style?: Style;
  children: React.ReactNode;
};

const ResumePDFSection = ({
  themeColor,
  heading,
  style = {},
  children,
}: Props) => (
  <View
    style={{
      ...styles.flexCol,
      ...style,
    }}
  >
    {heading && (
      <Text
        style={{
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '0.3pt', // tracking-wide -> 0.025em * 12 pt = 0.3pt
          fontSize: 18,
        }}
      >
        {heading}
      </Text>
    )}
    {heading && (
      <View
        style={{
          height: 2,
          width: '100%',
          marginBottom: spacing['2'],
          backgroundColor: themeColor,
        }}
      />
    )}
    {children}
  </View>
);

export default ResumePDFSection;
