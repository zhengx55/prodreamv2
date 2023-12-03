import { IEducationForm } from '@/types';
import ResumePDFSection from '../common/Section';
import { View } from '@react-pdf/renderer';
import ResumePDFText from '../common/Text';
import { spacing, styles } from '../ResumeStyle';
import ResumePDFBulletList from '../common/BulletList';
import { ResumePDFIcon } from '../common/Icon';

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
    <ResumePDFSection
      heading={educations.length > 0 ? 'Education' : undefined}
      themeColor={themeColor}
    >
      {educations.map(
        (
          {
            school_name,
            location,
            state,
            degree_name,
            starts,
            ends,
            related_courses,
            areas_of_study,
            additional_info,
          },
          idx
        ) => {
          const showAddition = additional_info.join() !== '';
          return (
            <View key={idx}>
              <View
                style={{
                  ...styles.flexRowBetween,
                  alignItems: 'center',
                  marginTop: spacing['1'],
                }}
              >
                {school_name ? (
                  <ResumePDFText style={{ fontSize: 18 }} bold={true}>
                    {school_name}
                  </ResumePDFText>
                ) : null}
                {location ? (
                  <ResumePDFText bold={true}>
                    <ResumePDFIcon type='location' />
                    {location} {state}
                  </ResumePDFText>
                ) : null}
              </View>
              <View
                style={{
                  ...styles.flexRowBetween,
                  marginTop: spacing['2'],
                }}
              >
                {degree_name ? (
                  <ResumePDFText>{degree_name}</ResumePDFText>
                ) : null}
                {starts ? (
                  <ResumePDFText>
                    {starts} ~~ {ends}
                  </ResumePDFText>
                ) : null}
              </View>
              <View style={{ ...styles.flexCol }}>
                {related_courses ? (
                  <ResumePDFText>
                    Relevant Courses: {related_courses}
                  </ResumePDFText>
                ) : null}
                {areas_of_study ? (
                  <ResumePDFText>Area Of Study: {areas_of_study}</ResumePDFText>
                ) : null}
              </View>
              {showAddition ? (
                <View style={{ ...styles.flexCol, marginTop: spacing['1.5'] }}>
                  <ResumePDFBulletList
                    items={additional_info}
                    showBulletPoints={showBulletPoints}
                  />
                </View>
              ) : null}
            </View>
          );
        }
      )}
    </ResumePDFSection>
  );
};
