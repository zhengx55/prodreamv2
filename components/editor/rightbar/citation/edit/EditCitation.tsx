import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';
import { useCitation } from '@/zustand/store';
import { useMemo } from 'react';
import WebsiteForm from '../form/Website';

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
  console.log(
    '🚀 ~ constcurrent_citation=useMemo ~ current_citation:',
    current_citation
  );
  const handleSave = async () => {};

  return (
    <TabsContent value='citation'>
      <WebsiteForm />
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
