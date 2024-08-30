import Spacer from '@/components/root/Spacer';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { PAGESIZE } from '@/constant/enum';
import {
  useGetMaterials,
  useGetRatedPrompts,
  useHandleOutlineFromChat,
} from '@/query/outline';
import { useAgent } from '@/zustand/store';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { memo, useCallback, useMemo, useState } from 'react';
import ModalOptionsCard from '../../common/ModalOptionsCard';
import ModalOptionsEmpty from '../../common/ModalOptionsEmpty';
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

const ChatGenerateOutline = () => {
  const [steps, setSteps] = useState(0);
  const [page, setPage] = useState(0);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedPromptType, setSelectedPromptType] = useState<string>('UC');
  const [selectedPrompt, setSelectedPrompt] = useState<string>('');
  const { mutate, isPending } = useHandleOutlineFromChat();
  const { data: materials, isLoading: materialLoading } = useGetMaterials(
    '',
    page,
    PAGESIZE.CHAT_MODAL_PAGE_SIZE
  ) as { data: MaterialListRes | undefined; isLoading: boolean };

  const { data: prompts, isLoading: promptLoading } = useGetRatedPrompts({
    prompt_type: selectedPromptType,
    material_ids: selectedMaterials,
    shouldShow: steps === 1,
  }) as { data: Prompt[] | undefined; isLoading: boolean };

  const canGotoStepTwo = useMemo(
    () => selectedMaterials.length > 0 && selectedMaterials.length <= 5,
    [selectedMaterials]
  );

  const canGotoStepThree = useMemo(
    () => selectedPrompt !== '',
    [selectedPrompt]
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
    });
  };

  const handleNextStep = useCallback(() => {
    if (steps === 2) {
      handleSubmit();
    } else {
      setSteps((prev) => prev + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps]);

  const show = useAgent((state) => state.showGenerateOutlineModal);
  const setShow = useAgent((state) => state.setshowGenerateOutlineModal);

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
          <MaterialSelection
            materials={materials}
            materialLoading={materialLoading}
            selectedMaterials={selectedMaterials}
            onMaterialSelect={handleMaterialSelect}
            page={page}
            setPage={setPage}
          />
        ) : steps === 1 ? (
          <PromptSelection
            selectedPromptType={selectedPromptType}
            setSelectedPromptType={setSelectedPromptType}
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

export default memo(ChatGenerateOutline);

const StepProgress: React.FC<{ steps: number }> = ({ steps }) => (
  <div className='flex items-center gap-x-6 px-6 py-4'>
    <Step number={1} isActive={steps >= 0} title='Select Materials' />
    <span className='w-16 border border-dashed border-indigo-100' />
    <Step number={2} isActive={steps >= 1} title='Select Prompt' />
    <span className='w-16 border border-dashed border-indigo-100' />
    <Step number={3} isActive={steps === 2} title='Generate Outline' />
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

const MaterialSelection: React.FC<{
  materials: MaterialListRes | undefined;
  materialLoading: boolean;
  selectedMaterials: string[];
  onMaterialSelect: (id: string) => void;
  page: number;
  setPage: (page: number) => void;
}> = ({
  materials,
  materialLoading,
  selectedMaterials,
  onMaterialSelect,
  page,
  setPage,
}) => (
  <div className='bg-slate-100 p-6'>
    {materialLoading ? (
      <div className='flex-center h-[430px] w-full'>
        <Loader2 className='animate-spin text-indigo-500' size={24} />
      </div>
    ) : materials?.data.length === 0 ? (
      <ModalOptionsEmpty title='No materials found.' height={430} />
    ) : (
      <div className='grid grid-cols-3 grid-rows-3 gap-2'>
        {materials!.data.map((material) => {
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
    )}
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

const PromptSelection: React.FC<{
  selectedPromptType: string;
  setSelectedPromptType: (value: string) => void;
  prompts: Prompt[] | undefined;
  promptLoading: boolean;
  selectedPrompt: string;
  setSelectedPrompt: (value: string) => void;
}> = ({
  selectedPromptType,
  setSelectedPromptType,
  prompts,
  promptLoading,
  selectedPrompt,
  setSelectedPrompt,
}) => (
  <div className='flex h-[526px] flex-col bg-slate-100 px-6 py-8'>
    <h3 className='base-medium'>Select application type</h3>
    <Spacer y='8' />
    <Select
      value={selectedPromptType}
      defaultValue='UC'
      onValueChange={setSelectedPromptType}
    >
      <SelectTrigger className='h-11 rounded-lg bg-white text-base'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent className='bg-white'>
        <SelectItem
          className='base-regular h-9 rounded-lg text-zinc-600 hover:bg-slate-200'
          value='Common App'
        >
          Common App Prompt
        </SelectItem>
        <SelectItem
          className='base-regular h-9 rounded-lg text-zinc-600 hover:bg-slate-200'
          value='UC'
        >
          UC App Prompt
        </SelectItem>
      </SelectContent>
    </Select>
    <Spacer y='40' />
    {promptLoading ? (
      <div className='flex-center'>
        <Loader2 className='animate-spin text-indigo-500' size={32} />
      </div>
    ) : (
      <ul className='flex flex-col gap-y-2 overflow-y-auto'>
        {prompts?.map((prompt) => {
          const isSelected = selectedPrompt === prompt.id;
          return (
            <li
              key={prompt.id}
              onClick={() => setSelectedPrompt(prompt.id)}
              className={`${
                isSelected
                  ? 'border-indigo-500 bg-violet-50'
                  : 'border-gray-300 bg-white'
              } flex h-11 shrink-0 cursor-pointer items-center space-x-4 rounded-lg border px-4 hover:bg-violet-50`}
            >
              <Checkbox
                className='rounded-full'
                checked={selectedPrompt === prompt.id}
              />
              <p className='text-zinc-600'>
                {prompt.title}{' '}
                {Array.from({ length: prompt.score ?? 0 }).map((_, index) => (
                  <span key={`${prompt.id}-star-${index}`}>🌟</span>
                ))}
              </p>
            </li>
          );
        })}
      </ul>
    )}
  </div>
);

const OutlinePreview: React.FC<{
  selectedPromptData: Prompt | undefined;
  selectedMaterials: string[];
  materials: MaterialListRes | undefined;
}> = ({ selectedPromptData, selectedMaterials, materials }) => (
  <div className='flex h-[526px] flex-col bg-slate-100 px-6 py-8'>
    <h3 className='base-medium'>Prompt</h3>
    <Spacer y='8' />
    <div className='flex h-11 items-center rounded-lg border border-gray-300 bg-white px-4'>
      <p className='text-zinc-600'>
        {selectedPromptData?.title}
        {Array.from({ length: selectedPromptData?.score ?? 0 }).map(
          (_, index) => (
            <span key={index}>🌟</span>
          )
        )}
      </p>
    </div>
    <Spacer y='24' />
    <h3 className='base-medium'>Materials</h3>
    <Spacer y='8' />
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
);
