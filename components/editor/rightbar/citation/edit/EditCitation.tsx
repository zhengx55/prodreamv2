import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';
import { useCitation } from '@/zustand/store';

const EditCitation = () => {
  const updateShowEditCitation = useCitation(
    (state) => state.updateShowEditCitation
  );

  const handleSave = async () => {};

  return (
    <TabsContent value='citation'>
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
