import { IEducationForm, IWorkForm } from '@/types';
import ResumePDFSection from '../common/Section';
import { View } from '@react-pdf/renderer';
import ResumePDFText from '../common/Text';
import { spacing, styles } from '../ResumeStyle';
import ResumePDFBulletList from '../common/BulletList';
import { ResumePDFIcon, IconType } from '../common/Icon';

export const ResumePDFWork = ({
  works,
  themeColor,
  showBulletPoints,
}: {
  works: IWorkForm[];
  themeColor: string;
  showBulletPoints: boolean;
}) => {
  return (
    <ResumePDFSection heading={'Work Experiences'} themeColor={themeColor}>
      {works.map(
        ({ company, location, state, position, starts, ends }, idx) => {
          return (
            <View key={idx}>
              <View
                style={{
                  ...styles.flexRowBetween,
                  alignItems: 'center',
                }}
              >
                <ResumePDFText style={{ fontSize: 20 }} bold={true}>
                  {company}
                </ResumePDFText>
                {location && (
                  <ResumePDFText bold={true}>
                    <ResumePDFIcon type='location' />
                    {location} {state}
                  </ResumePDFText>
                )}
              </View>

              <View
                style={{
                  ...styles.flexRowBetween,
                  marginTop: spacing['1'],
                }}
              >
                <ResumePDFText>{position}</ResumePDFText>
                {starts && (
                  <ResumePDFText>
                    {starts} ~~ {ends}
                  </ResumePDFText>
                )}
              </View>
              {/* {showDescriptions && (
                <View style={{ ...styles.flexCol, marginTop: spacing['1.5'] }}>
                  <ResumePDFBulletList
                    items={descriptions}
                    showBulletPoints={showBulletPoints}
                  />
                </View>
              )} */}
            </View>
          );
        }
      )}
    </ResumePDFSection>
  );
};
