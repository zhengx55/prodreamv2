import {
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

type Props = {};
const CitationDropdown = (props: Props) => {
  return (
    <DropdownMenuContent className='min-w-20 bg-white'>
      <DropdownMenuItem className='flex cursor-pointer gap-x-2 text-shadow hover:bg-doc-primary/20'>
        Website
      </DropdownMenuItem>
      <DropdownMenuItem className='flex cursor-pointer gap-x-2 text-shadow hover:bg-doc-primary/20'>
        Book
      </DropdownMenuItem>
      <DropdownMenuItem className='flex cursor-pointer gap-x-2 text-shadow hover:bg-doc-primary/20'>
        Journal
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};
export default CitationDropdown;
