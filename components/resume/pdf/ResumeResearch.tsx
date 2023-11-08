import { ICompetitionForm, IEducationForm, IResearchForm } from '@/types';
import ResumePDFSection from '../common/Section';
import { View } from '@react-pdf/renderer';
import ResumePDFText from '../common/Text';
import { spacing, styles } from '../ResumeStyle';
import ResumePDFBulletList from '../common/BulletList';
import { ResumePDFIcon, IconType } from '../common/Icon';

export const ResumePDFResearch = ({
  researches,
  themeColor,
  showBulletPoints,
}: {
  researches: IResearchForm[];
  themeColor: string;
  showBulletPoints: boolean;
}) => {
  return (
    <ResumePDFSection heading={'Research Experiences'} themeColor={themeColor}>
      {researches.map(
        ({ starts, state, location, ends, role, project }, idx) => {
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
                  {project}
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
                  marginTop: spacing['2'],
                }}
              >
                <ResumePDFText>{role}</ResumePDFText>
                {starts && (
                  <ResumePDFText>
                    {starts} ~~ {ends}
                  </ResumePDFText>
                )}{' '}
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
