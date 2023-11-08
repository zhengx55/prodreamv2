import { IEducationForm } from '@/types';
import ResumePDFSection from '../common/Section';
import { View } from '@react-pdf/renderer';
import ResumePDFText from '../common/Text';
import { spacing, styles } from '../ResumeStyle';
import ResumePDFBulletList from '../common/BulletList';
import { ResumePDFIcon, IconType } from '../common/Icon';

export const ResumePDFEducation = ({
  educations,
  themeColor,
  showBulletPoints,
}: {
  educations: IEducationForm[];
  themeColor: string;
  showBulletPoints: boolean;
}) => {
  return (
    <ResumePDFSection heading={'Education'} themeColor={themeColor}>
      {educations.map(
        ({ school_name, location, state, degree_name, starts, ends }, idx) => {
          // Hide school name if it is the same as the previous school
          const hideSchoolName =
            idx > 0 && school_name === educations[idx - 1].school_name;
          //   const showDescriptions = descriptions.join() !== '';

          return (
            <View key={idx}>
              {!hideSchoolName && (
                <View
                  style={{
                    ...styles.flexRowBetween,
                    alignItems: 'center',
                    marginTop: 20,
                  }}
                >
                  <ResumePDFText bold={true}>{school_name}</ResumePDFText>
                  {location && (
                    <ResumePDFText bold={true}>
                      <ResumePDFIcon type='location' />
                      {location} {state}
                    </ResumePDFText>
                  )}
                </View>
              )}
              <View
                style={{
                  ...styles.flexRowBetween,
                  marginTop: hideSchoolName ? '-' + spacing['1'] : spacing['2'],
                }}
              >
                <ResumePDFText>{degree_name}</ResumePDFText>
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
