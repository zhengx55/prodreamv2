import { TabsContent } from '@/components/ui/tabs';
import { useCitation } from '@/zustand/store';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const WebsiteForm = dynamic(() => import('../form/Website'));
const JournalForm = dynamic(() => import('../form/Journal'));
const ChapterForm = dynamic(() => import('../form/Chapter'));
const WholeBook = dynamic(() => import('../form/WholeBook'));
const IntroductionForm = dynamic(() => import('../form/Introduction'));

const EditCitation = () => {
  const currentInline = useCitation((state) => state.currentInline);
  const inTextCitation = useCitation((state) => state.inTextCitation);
  const current_citation = useMemo(() => {
    const foundCitation = inTextCitation.find(
      (item) => item.data.id === currentInline?.node.attrs.citation_id
    );
    return foundCitation ? foundCitation : null;
  }, [inTextCitation, currentInline]);

  const renderForm = (data: any) => {
    switch (current_citation?.type) {
      case 'Website':
        return <WebsiteForm data={data} type='edit' />;
      case 'Journal':
        return <JournalForm data={data} type='edit' />;
      case 'BookSection':
        return <ChapterForm data={data} type='edit' />;
      case 'WholeBook':
        return <WholeBook data={data} type='edit' />;
      default:
        return <IntroductionForm data={data} type='edit' />;
    }
  };
  return (
    <TabsContent value='citation'>
      {renderForm(current_citation?.data)}
    </TabsContent>
  );
};
export default EditCitation;
