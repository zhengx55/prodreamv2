import { ICompetitionForm, IEducationForm } from '@/types';
import ResumePDFSection from '../common/Section';
import { View } from '@react-pdf/renderer';
import ResumePDFText from '../common/Text';
import { spacing, styles } from '../ResumeStyle';
import ResumePDFBulletList from '../common/BulletList';
import { ResumePDFIcon, IconType } from '../common/Icon';

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
    <ResumePDFSection heading={'Award Experiences'} themeColor={themeColor}>
      {competitions.map(
        ({ name, location, date, results, additional }, idx) => {
          return (
            <View key={idx}>
              <View
                style={{
                  ...styles.flexRowBetween,
                  alignItems: 'center',
                  marginTop: spacing['1'],
                }}
              >
                <ResumePDFText style={{ fontSize: 18 }} bold={true}>
                  {name}
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
                <ResumePDFText>{results}</ResumePDFText>
                {date && <ResumePDFText>{date}</ResumePDFText>}
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
