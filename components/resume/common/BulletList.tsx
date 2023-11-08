import { View } from '@react-pdf/renderer';
import React from 'react';
import ResumePDFText from './Text';
import { spacing, styles } from '../ResumeStyle';

type Props = {
  items: string[];
  showBulletPoints?: boolean;
};

const ResumePDFBulletList = ({ items, showBulletPoints = true }: Props) => {
  return (
    <>
      {items.map((item, idx) => (
        <View style={{ ...styles.flexRow }} key={idx}>
          {showBulletPoints && (
            <ResumePDFText
              style={{
                paddingLeft: spacing['2'],
                paddingRight: spacing['2'],
                lineHeight: '1.3',
              }}
              bold={true}
            >
              {'•'}
            </ResumePDFText>
          )}
          {/* A breaking change was introduced causing text layout to be wider than node's width
              https://github.com/diegomura/react-pdf/issues/2182. flexGrow & flexBasis fixes it */}
          <ResumePDFText
            style={{ lineHeight: '1.3', flexGrow: 1, flexBasis: 0 }}
          >
            {item}
          </ResumePDFText>
        </View>
      ))}
    </>
  );
};

export default ResumePDFBulletList;
