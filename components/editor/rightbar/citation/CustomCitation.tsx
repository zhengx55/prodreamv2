import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Book from './form/Book';
import Journal from './form/Journal';
import Website from './form/Website';

const CustomCitation = () => {
  return (
    <section className='relative flex h-full w-full flex-col overflow-hidden'>
      <Tabs defaultValue='Website' className='flex-1 overflow-y-auto'>
        <TabsList className='gap-x-2 px-0'>
          <TabsTrigger
            className='rounded-lg border border-gray-200 bg-transparent data-[state=active]:bg-violet-500/20 data-[state=active]:text-violet-500'
            value='Website'
          >
            Website
          </TabsTrigger>
          <TabsTrigger
            className='rounded-lg border border-gray-200 bg-transparent data-[state=active]:bg-violet-500/20 data-[state=active]:text-violet-500'
            value='Book'
          >
            Book
          </TabsTrigger>
          <TabsTrigger
            className='rounded-lg border border-gray-200 bg-transparent data-[state=active]:bg-violet-500/20 data-[state=active]:text-violet-500'
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
    </section>
  );
};
export default CustomCitation;
