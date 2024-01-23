import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Book from './form/Book';
import Journal from './form/Journal';
import Website from './form/Website';

type Props = {};
const CustomCitation = (props: Props) => {
  return (
    <section className='relative flex flex-1 flex-col overflow-hidden'>
      <Tabs defaultValue='account' className='w-full'>
        <TabsList className='gap-x-2'>
          <TabsTrigger
            className='rounded-lg border border-shadow-border bg-transparent data-[state=active]:bg-doc-primary/20 data-[state=active]:text-doc-primary'
            value='Website'
          >
            Website
          </TabsTrigger>
          <TabsTrigger
            className='rounded-lg border border-shadow-border bg-transparent data-[state=active]:bg-doc-primary/20 data-[state=active]:text-doc-primary'
            value='Book'
          >
            Book
          </TabsTrigger>
          <TabsTrigger
            className='rounded-lg border border-shadow-border bg-transparent data-[state=active]:bg-doc-primary/20 data-[state=active]:text-doc-primary'
            value='Journal'
          >
            Journal
          </TabsTrigger>
        </TabsList>
        <TabsContent value='Website'>
          <Website />
        </TabsContent>
        <TabsContent value='Book'>
          <Book />
        </TabsContent>
        <TabsContent value='Journal'>
          <Journal />
        </TabsContent>
      </Tabs>
      <Spacer y='16' />

      <div className='flex w-full justify-end gap-x-2 border-t border-shadow-border py-2'>
        <Button
          className='rounded border border-doc-primary text-doc-primary'
          variant={'ghost'}
        >
          Cancel
        </Button>
        <Button className='rounded bg-doc-primary'>Save</Button>
      </div>
    </section>
  );
};
export default CustomCitation;
