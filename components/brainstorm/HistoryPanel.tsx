import Loading from '@/app/writtingpal/loading';
import { useBrainStormHistoryById } from '@/query/query';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
const HistoryPanel = () => {
  const path = usePathname();
  const id = path.split('/')[path.split('/').length - 1];
  const { isPending, data, isError } = useBrainStormHistoryById(id);

  if (isPending) {
    return <Loading />;
  }
  return (
    <motion.div
      key={'history'}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className='md:grid md:w-full md:grid-cols-2 md:gap-x-4 md:gap-y-4'
    >
      {/* Card */}
      {!isPending &&
        data?.data?.map((item, index) => {
          return (
            <div
              key={`history-${item.template_id}-${index}`}
              className='flex flex-col justify-evenly rounded-lg bg-white p-5 md:h-[200px] md:w-[full]'
            >
              <p className='small-regular text-left text-shadow'>
                {item.result.length > 150
                  ? `${item.result.slice(0, 150)}...`
                  : item.result}
              </p>
              <p className='small-regular text-primary-200'>
                {item.create_time}
              </p>
            </div>
          );
        })}
    </motion.div>
  );
};

export default HistoryPanel;
