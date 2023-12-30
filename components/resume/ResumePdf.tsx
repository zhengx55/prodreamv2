import { useResume } from '@/zustand/store';
import { Document, Font, Page, View } from '@react-pdf/renderer';
import { spacing, styles } from './ResumeStyle';
import { ResumePDFActivity } from './pdf/ResumeActivity';
import { ResumePDFCompetition } from './pdf/ResumeCompetition';
import { ResumePDFEducation } from './pdf/ResumeEducation';
import { ResumePDFProfile } from './pdf/ResumeProfile';
import { ResumePDFResearch } from './pdf/ResumeResearch';
import { ResumePDFWork } from './pdf/ResumeWork';

Font.register({
  family: 'Times',
  fonts: [
    {
      src: '/fonts/Times-Roman-Regular.ttf',
      fontWeight: 'normal',
    },
    { src: '/fonts/Times-Roman-Bold.ttf', fontWeight: 'bold' },
  ],
});

type Props = { isPDF?: boolean; themeColor: string };

const ResumePdf = ({ isPDF = false, themeColor }: Props) => {
  const profile = useResume((state) => state.profile);
  const educations = useResume((state) => state.educations);
  const works = useResume((state) => state.works);
  const researches = useResume((state) => state.researches);
  const competitions = useResume((state) => state.competitions);
  const activities = useResume((state) => state.activities);

  return (
    <Document
      title={`${profile.firstname} ${profile.lastname}'s Resume`}
      producer={'QuickAppply'}
    >
      <Page
        size='A4'
        style={{
          ...styles.flexCol,
          fontSize: 14,
        }}
      >
        <View
          style={{
            ...styles.flexCol,
            padding: `${spacing[0]} ${spacing[10]}`,
            rowGap: parseInt(spacing['5']),
            fontFamily: 'Times',
          }}
        >
          <ResumePDFProfile profile={profile} isPDF={isPDF} />
          <ResumePDFEducation
            educations={educations}
            showBulletPoints
            themeColor={themeColor}
          />
          <ResumePDFWork
            works={works}
            showBulletPoints
            themeColor={themeColor}
          />
          <ResumePDFResearch
            researches={researches}
            showBulletPoints
            themeColor={themeColor}
          />
          <ResumePDFCompetition
            competitions={competitions}
            showBulletPoints
            themeColor={themeColor}
          />
          <ResumePDFActivity
            activities={activities}
            showBulletPoints
            themeColor={themeColor}
          />
        </View>
      </Page>
    </Document>
  );
};

export default ResumePdf;
