import { Resume } from '@/types';
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

type Props = { resume: Resume; isPDF?: boolean; themeColor: string };

const ResumePdf = ({ resume, isPDF = false, themeColor }: Props) => {
  const { firstname, lastname } = resume.profile;
  return (
    <Document
      title={`${firstname} ${lastname}'s Resume`}
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
          <ResumePDFProfile profile={resume.profile} isPDF={isPDF} />
          <ResumePDFEducation
            educations={resume.educations}
            showBulletPoints
            themeColor={themeColor}
          />
          <ResumePDFWork
            works={resume.works}
            showBulletPoints
            themeColor={themeColor}
          />
          <ResumePDFResearch
            researches={resume.researches}
            showBulletPoints
            themeColor={themeColor}
          />
          <ResumePDFCompetition
            competitions={resume.competitions}
            showBulletPoints
            themeColor={themeColor}
          />
          <ResumePDFActivity
            activities={resume.activities}
            showBulletPoints
            themeColor={themeColor}
          />
        </View>
      </Page>
    </Document>
  );
};

export default ResumePdf;
