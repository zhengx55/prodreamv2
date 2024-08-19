import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { PAGESIZE } from '@/constant/enum';
import {
  useGetMaterials,
  useGetPrompts,
  useHandleOutlineFromChat,
} from '@/query/outline';
import { useAgent } from '@/zustand/store';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { memo, useCallback, useMemo, useState } from 'react';
import ModalOptionsCard from '../../common/ModalOptionsCard';
import ModalPaginations from '../../common/ModalPaginations';

type Material = {
  id: string;
  title: string;
  content: string;
};

type MaterialListRes = {
  data: Material[];
  total_page_count: number;
};

type Prompt = {
  id: string;
  title: string;
  score?: number;
};

const ChatPolishOutline = () => {
  const [steps, setSteps] = useState(0);
  const [page, setPage] = useState(0);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<string>('');
  const [outlineContent, setOutlineContent] = useState<string>('');
  const { data: materials, isLoading: materialLoading } = useGetMaterials(
    '',
    page,
    PAGESIZE.MATERIAL_MODAL_PAGE_SIZE
  ) as { data: MaterialListRes | undefined; isLoading: boolean };

  const { data: prompts, isLoading: promptLoading } = useGetPrompts();
  const { mutate, isPending } = useHandleOutlineFromChat();

  const handleNextStep = useCallback(() => {
    if (steps === 2) {
      handleSubmit();
    } else {
      setSteps((prev) => prev + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps]);

  const canGotoStepTwo = useMemo(() => outlineContent !== '', [outlineContent]);

  const canGotoStepThree = useMemo(
    () =>
      selectedPrompt !== '' &&
      selectedMaterials.length > 0 &&
      selectedMaterials.length <= 5,
    [selectedMaterials.length, selectedPrompt]
  );

  const selectedPromptData = useMemo(
    () => prompts?.find((p) => p.id === selectedPrompt),
    [selectedPrompt, prompts]
  );

  const handleMaterialSelect = useCallback((id: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  }, []);

  const handleSubmit = async () => {
    mutate({
      title: 'Untitled',
      material_ids: selectedMaterials,
      prompt_id: selectedPrompt,
      original_outline: outlineContent,
    });
  };

  const show = useAgent((state) => state.showPolishOutlineModal);
  const setShow = useAgent((state) => state.setshowPolishOutlineModal);

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent
        aria-describedby='dialog-content'
        className='flex flex-col gap-0 rounded-lg bg-white p-0 outline-none focus:outline-none md:w-[978px]'
      >
        <DialogTitle className='hidden' />
        <DialogDescription className='hidden' />
        <StepProgress steps={steps} />

        {steps === 0 ? (
          <UploadOutline
            outlineContent={outlineContent}
            setOutlineContent={setOutlineContent}
          />
        ) : steps === 1 ? (
          <ElementSelection
            materials={materials}
            materialLoading={materialLoading}
            onMaterialSelect={handleMaterialSelect}
            page={page}
            setPage={setPage}
            selectedMaterials={selectedMaterials}
            prompts={prompts}
            promptLoading={promptLoading}
            selectedPrompt={selectedPrompt}
            setSelectedPrompt={setSelectedPrompt}
          />
        ) : (
          <OutlinePreview
            selectedPromptData={selectedPromptData}
            selectedMaterials={selectedMaterials}
            materials={materials}
          />
        )}

        <DialogFooter className='items-center px-6 py-4 sm:justify-between'>
          <Button
            onClick={() => setSteps((prev) => prev - 1)}
            className='h-10 px-1'
            style={{ visibility: steps === 0 ? 'hidden' : 'visible' }}
            variant={'icon'}
          >
            <ChevronLeft size={18} />
            Back
          </Button>
          <div className='space-x-2'>
            <DialogClose asChild>
              <Button
                disabled={isPending}
                variant={'secondary'}
                className='h-10 px-8'
              >
                Cancel
              </Button>
            </DialogClose>

            <Button
              onClick={handleNextStep}
              disabled={
                isPending || (steps === 0 ? !canGotoStepTwo : !canGotoStepThree)
              }
              className='h-10 px-8'
            >
              {steps === 2 ? 'Create' : 'Next'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(ChatPolishOutline);

const StepProgress: React.FC<{ steps: number }> = ({ steps }) => (
  <div className='flex items-center gap-x-6 px-6 py-4'>
    <Step number={1} isActive={steps >= 0} title='Upload Outline' />
    <span className='w-16 border border-dashed border-indigo-100' />
    <Step number={2} isActive={steps >= 1} title='Select Prompt&Materals' />
    <span className='w-16 border border-dashed border-indigo-100' />
    <Step number={3} isActive={steps === 2} title='Polish Outline' />
  </div>
);

const Step: React.FC<{ number: number; title: string; isActive?: boolean }> =
  memo(({ number, title, isActive }) => (
    <div className='flex items-center gap-x-4'>
      <span
        className={`${
          isActive ? 'bg-indigo-500/20' : 'bg-zinc-200'
        } flex-center size-[42px] rounded-full`}
      >
        <span
          className={`${
            isActive ? 'bg-indigo-500' : 'bg-zinc-500'
          } flex-center size-[34px] rounded-full text-xl font-medium text-white`}
        >
          {number}
        </span>
      </span>
      <h2 className='text-xl font-medium'>{title}</h2>
    </div>
  ));

const UploadOutline: React.FC<{
  outlineContent: string;
  setOutlineContent: (value: string) => void;
}> = ({ outlineContent, setOutlineContent }) => (
  <div className='bg-slate-100 p-6'>
    <Textarea
      aria-label='Outline Content'
      required
      aria-required
      value={outlineContent}
      onChange={(e) => setOutlineContent(e.target.value)}
      className='h-[492px] w-full focus-visible:ring-0'
      placeholder='Enter your outline content here'
    />
  </div>
);

const ElementSelection: React.FC<{
  prompts: Prompt[] | undefined;
  promptLoading: boolean;
  selectedPrompt: string;
  setSelectedPrompt: (value: string) => void;
  materials: MaterialListRes | undefined;
  materialLoading: boolean;
  selectedMaterials: string[];
  onMaterialSelect: (id: string) => void;
  page: number;
  setPage: (page: number) => void;
}> = ({
  prompts,
  promptLoading,
  selectedPrompt,
  setSelectedPrompt,
  materials,
  materialLoading,
  selectedMaterials,
  onMaterialSelect,
  page,
  setPage,
}) =>
  promptLoading || materialLoading ? (
    <div className='flex-center h-[540px] bg-slate-100'>
      <Loader2 size={32} className='animate-spin text-indigo-500' />
    </div>
  ) : (
    <div className='flex h-[540px] flex-col bg-slate-100 px-6 py-8'>
      <h3 className='base-medium'>Prompt</h3>
      <Spacer y='8' />
      <Select value={selectedPrompt} onValueChange={setSelectedPrompt}>
        <SelectTrigger className='h-11 shrink-0 rounded-lg border-gray-300 bg-white px-4 text-base text-zinc-600'>
          <SelectValue placeholder='Select a prompt' />
        </SelectTrigger>
        <SelectContent className='bg-white'>
          {prompts?.map((prompt) => (
            <SelectItem
              key={prompt.id}
              className='hover:bg-slate-100'
              value={prompt.id}
            >
              {prompt.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Spacer y='24' />
      <h3 className='base-medium'>Materials</h3>
      <Spacer y='8' />
      <div className='grid size-full grid-cols-3 grid-rows-2 gap-2'>
        {materials?.data.map((material) => {
          const isSelected = selectedMaterials.includes(material.id);
          return (
            <ModalOptionsCard
              key={material.id}
              id={material.id}
              title={material.title}
              content={material.content}
              isSelected={isSelected}
              onSelect={onMaterialSelect}
            />
          );
        })}
      </div>
      <Spacer y='16' />
      {(materials?.total_page_count ?? 1) > 0 && (
        <ModalPaginations
          page={page}
          setPage={setPage}
          totalPage={materials?.total_page_count ?? 1}
        />
      )}
    </div>
  );

const OutlinePreview: React.FC<{
  selectedPromptData: Prompt | undefined;
  selectedMaterials: string[];
  materials: MaterialListRes | undefined;
}> = ({ selectedPromptData, selectedMaterials, materials }) => (
  <div className='flex h-[540px] flex-col bg-slate-100 px-6 py-8'>
    <h3 className='base-medium'>Prompt</h3>
    <Spacer y='8' />
    <div className='flex h-11 items-center rounded-lg border border-gray-300 bg-white px-4'>
      <p className='text-zinc-600'>{selectedPromptData?.title}</p>
    </div>
    <Spacer y='24' />
    <h3 className='base-medium'>Materials</h3>
    <Spacer y='8' />
    <div className='flex flex-1'>
      <div className='grid grid-cols-3 grid-rows-2 gap-2'>
        {selectedMaterials.map((id) => {
          const material = materials?.data.find((m) => m.id === id);
          return (
            <ModalOptionsCard
              key={id}
              id={id}
              title={material!.title}
              content={material!.content}
              unselectable
            />
          );
        })}
      </div>
    </div>
  </div>
);
