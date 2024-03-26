import Spacer from '@/components/root/Spacer';
import { GenerateFill } from '@/components/root/SvgComponents';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { generateOutlineSchema } from '@/lib/validation';
import { EdtitorDictType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
type Props = {
  handleGenerate: (idea: string, area: string) => Promise<void>;
  t: EdtitorDictType;
};
const OutlineBtn = ({ handleGenerate, t }: Props) => {
  const form = useForm<z.infer<typeof generateOutlineSchema>>({
    resolver: zodResolver(generateOutlineSchema),
    defaultValues: {
      idea: '',
      area: '',
    },
  });
  const onSubmit = async (values: z.infer<typeof generateOutlineSchema>) => {
    await handleGenerate(values.idea, values.area);
  };
  return (
    <div className='flex flex-col'>
      <Spacer y='30' />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-y-8'
        >
          <FormField
            control={form.control}
            name='area'
            render={({ field }) => (
              <FormItem className='relative'>
                <FormLabel className='small-regular text-black' htmlFor='area'>
                  {t.Generate.outline_form1}
                </FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    id='area'
                    placeholder='Physical sciences'
                    className='small-regular rounded focus-visible:ring-0'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='absolute -bottom-5 text-xs text-red-400' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='idea'
            render={({ field }) => (
              <FormItem className='relative'>
                <FormLabel className='small-regular text-black' htmlFor='idea'>
                  {t.Generate.outline_form2}
                </FormLabel>
                <FormControl>
                  <Textarea
                    id='idea'
                    placeholder={t.Generate.outline_placeholder}
                    className='small-regular rounded focus-visible:ring-0'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='absolute -bottom-5 text-xs text-red-400' />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='h-max w-max self-center rounded-full bg-violet-500 px-8 py-1'
          >
            <GenerateFill fill='#fff' size='20' />
            {t.Utility.Generate}
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default OutlineBtn;
