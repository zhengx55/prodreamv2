import { Page, View, Document, Text } from '@react-pdf/renderer';
import { spacing, styles } from './ResumeStyle';
import { ResumePDFProfile } from './pdf/ResumeProfile';
import { Resume } from '@/types';
import { ResumePDFEducation } from './pdf/ResumeEducation';
import { ResumePDFWork } from './pdf/ResumeWork';
import { ResumePDFCompetition } from './pdf/ResumeCompetition';
import { ResumePDFResearch } from './pdf/ResumeResearch';
import { ResumePDFActivity } from './pdf/ResumeActivity';

type Props = { resume: Resume; isPDF?: boolean; themeColor: string };

const ResumePdf = ({ resume, isPDF = false, themeColor }: Props) => {
  return (
    <Document producer={'QuickAppply'}>
      <Page
        size={'A4'}
        style={{
          ...styles.flexCol,
          fontSize: 14 + 'pt',
        }}
      >
        <View
          style={{
            width: spacing['full'],
            height: spacing[3.5],
            backgroundColor: themeColor,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        />
        <View
          style={{
            ...styles.flexCol,
            padding: `${spacing[0]} ${spacing[10]}`,
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
