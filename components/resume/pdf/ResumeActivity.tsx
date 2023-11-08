import { IActivityForm, ICompetitionForm, IEducationForm } from '@/types';
import ResumePDFSection from '../common/Section';
import { View } from '@react-pdf/renderer';
import ResumePDFText from '../common/Text';
import { spacing, styles } from '../ResumeStyle';
import ResumePDFBulletList from '../common/BulletList';
import { ResumePDFIcon, IconType } from '../common/Icon';

export const ResumePDFActivity = ({
  activities,
  themeColor,
  showBulletPoints,
}: {
  activities: IActivityForm[];
  themeColor: string;
  showBulletPoints: boolean;
}) => {
  return (
    <ResumePDFSection heading={'Activity Experiences'} themeColor={themeColor}>
      {activities.map(
        (
          { starts, ends, company, location, description, responsibility },
          idx
        ) => {
          // Hide school name if it is the same as the previous school

          return (
            <View key={idx}>
              <View
                style={{
                  ...styles.flexRowBetween,
                  alignItems: 'center',
                  marginTop: spacing['1'],
                }}
              >
                <ResumePDFText style={{ fontSize: 20 }} bold={true}>
                  {company}
                </ResumePDFText>
                {location && (
                  <ResumePDFText bold={true}>
                    <ResumePDFIcon type='location' />
                    {location}
                  </ResumePDFText>
                )}
              </View>

              <View
                style={{
                  ...styles.flexRowBetween,
                  marginTop: spacing['2'],
                }}
              >
                <ResumePDFText>{responsibility}</ResumePDFText>
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
