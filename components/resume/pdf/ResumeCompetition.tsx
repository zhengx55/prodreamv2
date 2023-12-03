import { ICompetitionForm } from '@/types';
import ResumePDFSection from '../common/Section';
import { View } from '@react-pdf/renderer';
import ResumePDFText from '../common/Text';
import { spacing, styles } from '../ResumeStyle';
import ResumePDFBulletList from '../common/BulletList';
import { ResumePDFIcon } from '../common/Icon';

export const ResumePDFCompetition = ({
  competitions,
  themeColor,
  showBulletPoints,
}: {
  competitions: ICompetitionForm[];
  themeColor: string;
  showBulletPoints: boolean;
}) => {
  return (
    <ResumePDFSection
      heading={competitions.length > 0 ? 'Award Experiences' : undefined}
      themeColor={themeColor}
    >
      {competitions.map(
        ({ name, location, date, results, additional_info }, idx) => {
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
                {name ? (
                  <ResumePDFText style={{ fontSize: 18 }} bold={true}>
                    {name}
                  </ResumePDFText>
                ) : null}
                {location ? (
                  <ResumePDFText bold={true}>
                    <ResumePDFIcon type='location' />
                    {location}
                  </ResumePDFText>
                ) : null}
              </View>

              <View
                style={{
                  ...styles.flexRowBetween,
                  marginTop: spacing['2'],
                }}
              >
                <ResumePDFText>{results}</ResumePDFText>
                {date ? <ResumePDFText>{date}</ResumePDFText> : null}
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
