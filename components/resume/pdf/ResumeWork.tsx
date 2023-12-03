import { IWorkForm } from '@/types';
import ResumePDFSection from '../common/Section';
import { View } from '@react-pdf/renderer';
import ResumePDFText from '../common/Text';
import { spacing, styles } from '../ResumeStyle';
import ResumePDFBulletList from '../common/BulletList';
import { ResumePDFIcon } from '../common/Icon';

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
    <ResumePDFSection
      heading={works.length > 0 ? 'Work Experiences' : undefined}
      themeColor={themeColor}
    >
      {works.map(
        (
          { company, location, state, position, starts, ends, description },
          idx
        ) => {
          const showDescriptions = description.join() !== '';
          return (
            <View key={idx}>
              <View
                style={{
                  ...styles.flexRowBetween,
                  alignItems: 'center',
                }}
              >
                {company ? (
                  <ResumePDFText style={{ fontSize: 18 }} bold={true}>
                    {company}
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
                  marginTop: spacing['1'],
                }}
              >
                <ResumePDFText>{position}</ResumePDFText>
                {starts ? (
                  <ResumePDFText>
                    {starts} ~~ {ends}
                  </ResumePDFText>
                ) : null}
              </View>
              {showDescriptions ? (
                <View style={{ ...styles.flexCol, marginTop: spacing['1.5'] }}>
                  <ResumePDFBulletList
                    items={description}
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
