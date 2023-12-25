'use client';
import { updateUserInfo } from '@/query/api';
import { selectUsage, setSingleUsage } from '@/store/reducers/usageSlice';
import { selectUserEmail } from '@/store/reducers/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/storehooks';
import { IUsage } from '@/types';
import useRootStore from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, Variants, m } from 'framer-motion';
import { Loader2, Upload } from 'lucide-react';
import dynamic from 'next/dynamic';
import { ChangeEvent, useCallback, useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { v4 } from 'uuid';
import { Button } from '../ui/button';
import CharacterSelect from './inputpanel/CharacterSelect';
import Description from './inputpanel/Description';

const FileUploadModal = dynamic(() => import('./FileUploadModal'));
const Activityloader = dynamic(() => import('./Activityloader'));
const TutCard = dynamic(() => import('../root/TutCard'), { ssr: false });

const InputPanel = ({ fullScreen }: { fullScreen: boolean }) => {
  const usage = useAppSelector(selectUsage);
  const email = useAppSelector(selectUserEmail);
  const dispatch = useAppDispatch();
  const historyData = useRootStore((state) => state.alhistoryData);
  const [isDecoding, setIsDecoding] = useState(false);
  const [decodedData, setDecodedData] = useState<string[]>([]);
  const hasHistoryData = Object.keys(historyData).length > 0;
  const [activeFileUpload, setActiveFileUpload] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [descriptions, setDescriptions] = useState([
    {
      id: v4(),
      text: '',
      wordCount: 0,
    },
  ]);

  const isFirstTimeUpload =
    Object.keys(usage).length > 0 &&
    (usage.first_activity_list_upload ||
      usage.first_activity_list_upload === undefined);

  const toogleIsGenerating = useCallback((value: boolean) => {
    setIsGenerating(value);
  }, []);

  const toggleDecoding = useCallback(() => {
    setIsDecoding((prev) => !prev);
  }, []);

  const appendDecodeData = useCallback((value: string[]) => {
    setDecodedData(value);
  }, []);

  useDeepCompareEffect(() => {
    if (hasHistoryData) {
      const keys = Object.keys(historyData);
      keys.forEach((key) => {
        const activities = historyData[key].activities;
        const desciptions_from_history: {
          id: string;
          text: string;
          wordCount: number;
        }[] = [];
        activities.forEach((activity) => {
          desciptions_from_history.push({
            id: activity.id,
            text: activity.original_text!,
            wordCount: activity.original_text!.length,
          });
        });
        setDescriptions(desciptions_from_history);
      });
    }
  }, [historyData]);

  const toogleLoadingModal = useCallback(() => {
    setIsGenerating(false);
  }, []);

  const toogleActive = useCallback(() => {
    setActiveFileUpload(false);
  }, []);

  useDeepCompareEffect(() => {
    if (decodedData.length === 0) {
      return;
    }
    let new_desc_el_array: { id: string; text: string; wordCount: number }[] =
      [];
    decodedData.forEach((data) => {
      const new_desc_el = {
        id: v4(),
        text: data,
        wordCount: data.length,
      };
      new_desc_el_array = [...new_desc_el_array, new_desc_el];
    });
    setDescriptions((prev) => {
      if (prev.length === 1 && !prev[0].text) {
        return [...new_desc_el_array];
      }
      return [...prev, ...new_desc_el_array];
    });
  }, [decodedData]);

  const handleDescriptionChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>, id: string) => {
      const value = e.target.value;
      setDescriptions((prevDescriptions) =>
        prevDescriptions.map((description) =>
          description.id === id
            ? { ...description, text: value, wordCount: value.length }
            : description
        )
      );
    },
    []
  );

  const handleAddNewDescription = useCallback(() => {
    setDescriptions((prev) => [
      ...prev,
      {
        id: v4(),
        text: '',
        wordCount: 0,
      },
    ]);
  }, []);

  const handleRemoveDescription = useCallback((id: string) => {
    setDescriptions((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  }, []);

  const fullScreenVariants: Variants = {
    half: { width: '50%', opacity: 1 },
    full: { width: '0%', opacity: 0 },
  };

  const { mutateAsync: updateUsage } = useMutation({
    mutationFn: (args: { email: string; params: IUsage }) =>
      updateUserInfo(args.email, args.params),
    onSuccess: () => {
      dispatch(setSingleUsage('first_activity_list_upload'));
    },
    onError: () => {
      dispatch(setSingleUsage('first_activity_list_upload'));
    },
  });

  const handleCloseTutOne = async () => {
    await updateUsage({
      email,
      params: { ...usage, first_activity_list_upload: false },
    });
  };

  return (
    <m.div
      initial={false}
      variants={fullScreenVariants}
      animate={fullScreen ? 'full' : 'half'}
      className='relative flex min-h-full w-1/2 flex-col gap-y-4 overflow-y-auto pr-2'
    >
      {
        <AnimatePresence>
          {isFirstTimeUpload && (
            <TutCard
              onClickHandler={handleCloseTutOne}
              className='left-[calc(50%_-160px)] top-32 w-[320px]'
              title='Upload to get draft'
              info="Start by either uploading your files for automatic activity draft completion or click 'Add Activity' to manually enter your details"
              button='Got it!'
              arrowPosition='top'
            />
          )}
        </AnimatePresence>
      }

      {/* Dialogs here */}
      <FileUploadModal
        isActive={activeFileUpload}
        toogleActive={toogleActive}
        toggleDecoding={toggleDecoding}
        appendDecodeData={appendDecodeData}
      />
      {isGenerating && (
        <Activityloader
          isGenerating={isGenerating}
          toogleLoadingModal={toogleLoadingModal}
        />
      )}
      {/* file upload */}
      <section className='flex w-full shrink-0 flex-col gap-y-2 rounded-xl bg-white p-6'>
        <h2 className='small-semibold'>
          Start by uploading a file with activity descriptions. We will
          automatically decode it for you.
        </h2>
        <p className='small-regular text-shadow'>
          We support docx, pdf file types.
        </p>
        {isDecoding ? (
          <Button
            disabled
            variant={'ghost'}
            className='mt-1 h-full border border-shadow-border py-3 leading-6 shadow-none'
          >
            <Loader2 className=' animate-spin' />
            Decoding File
          </Button>
        ) : (
          <Button
            id='act-tut-01'
            onClick={() => setActiveFileUpload(true)}
            variant={'default'}
            className='h-full border border-shadow-border py-2 leading-6 shadow-none'
          >
            <Upload />
            Upload
          </Button>
        )}
      </section>
      {/* activity description */}
      <Description
        descriptions={descriptions}
        handleAddNewDescription={handleAddNewDescription}
        handleRemoveDescription={handleRemoveDescription}
        handleDescriptionChange={handleDescriptionChange}
      />
      {/* activity options */}
      <CharacterSelect
        descriptions={descriptions}
        setIsGenerating={toogleIsGenerating}
        isDecoding={isDecoding}
      />
    </m.div>
  );
};

export default InputPanel;
