import { Button } from '@/components/ui/button';
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
  const updateShowEditCitation = useCitation(
    (state) => state.updateShowEditCitation
  );
  const currentInline = useCitation((state) => state.currentInline);
  const inTextCitation = useCitation((state) => state.inTextCitation);
  const current_citation = useMemo(() => {
    const foundCitation = inTextCitation.find(
      (item) => item.data.id === currentInline?.node.attrs.citation_id
    );
    return foundCitation ? foundCitation : null;
  }, [inTextCitation, currentInline]);
  const handleSave = async () => {};

  const renderForm = (data: any) => {
    switch (current_citation?.type) {
      case 'Website':
        return <WebsiteForm />;
      case 'Journal':
        return <JournalForm data={data} />;
      case 'BookSection':
        return <ChapterForm />;
      case 'WholeBook':
        return <WholeBook />;
      default:
        return <IntroductionForm />;
    }
  };
  return (
    <TabsContent value='citation' className='h-full overflow-y-auto'>
      {renderForm(current_citation?.data)}
      <div className='absolute bottom-0 flex w-full justify-end gap-x-2 border-t border-shadow-border bg-white py-1.5'>
        <Button
          className='h-max rounded border border-doc-primary text-doc-primary'
          variant={'ghost'}
          type='button'
          onClick={() => {
            updateShowEditCitation(false);
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          type='button'
          role='button'
          className='h-max rounded'
        >
          Save
        </Button>
      </div>
    </TabsContent>
  );
};
export default EditCitation;
