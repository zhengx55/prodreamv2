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
      gap: spacing['2'],
      marginTop: spacing['5'],
      ...style,
    }}
  >
    {heading && (
      <View style={{ ...styles.flexRow, alignItems: 'center' }}>
        {themeColor && (
          <View
            style={{
              height: '3.75pt',
              width: '30pt',
              backgroundColor: themeColor,
              marginRight: spacing['3.5'],
            }}
          />
        )}
        <Text
          style={{
            fontWeight: 'bold',
            letterSpacing: '0.3pt', // tracking-wide -> 0.025em * 12 pt = 0.3pt
            fontSize: 22,
          }}
        >
          {heading}
        </Text>
      </View>
    )}
    {children}
  </View>
);

export default ResumePDFSection;
