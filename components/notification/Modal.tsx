import { XCircle } from 'lucide-react';
import { memo } from 'react';
import Spacer from '../root/Spacer';
import { DialogClose, DialogContent, DialogHeader } from '../ui/dialog';

type Props = {};
const Modal = (props: Props) => {
  return (
    <DialogContent className='flex flex-col items-center gap-y-0 rounded bg-white p-2 pb-4 md:w-[624px]'>
      <DialogHeader className='self-end'>
        <DialogClose>
          <XCircle className='text-stone-300' size={24} />
        </DialogClose>
      </DialogHeader>
      <Spacer y='8' />
      <h1 className='self-center text-xl font-semibold text-zinc-900'>
        📢 New Features Announcement! 📢
      </h1>
      <Spacer y='8' />
      <h2 className='self-center text-base font-medium text-zinc-900'>
        We&apos;re pleased to inform you about the latest updates to our
        platform
      </h2>
      <Spacer y='32' />
      <ol className='small-regular flex w-[90%] list-decimal flex-col gap-y-2 text-zinc-500'>
        <li className=''>
          Introducing Jessica: Your AI Research Companion: We&apos;ve added a
          new AI Chatbot named Jessica to assist with research and writing
          tasks. Jessica can provide guidance on essay improvement strategies
          and offer explanations to your readings.
        </li>
        <li>
          Improved Stability in Citation Search: We&apos;ve upgraded our
          citation search system to enhance stability, especially during peak
          hours. This update includes an updated database and search system,
          ensuring more accurate references and zero API downtime. Please note
          that this switch may lead to disruptions in existing citations. If
          encountering any issues, consider re-searching and citing the
          reference or contacting our customer support at support@prodream.ai.
        </li>
        <li>
          AI Research Tool: Our platform now features an AI-powered research
          tool designed to help find answers to research questions and summarize
          findings effectively.
        </li>
        <li>
          Enhanced Feedback Center: We&apos;ve introduced a new feedback center
          where you can report bugs, seek support, and submit feature requests.
          Your feedback is valuable to us as we strive to improve our services
          continuously.
        </li>
      </ol>
    </DialogContent>
  );
};
export default memo(Modal);
