import { motion } from 'framer-motion';
import { useEffect } from 'react';
const HistoryPanel = () => {
  const fetchData = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}write_history_query`,
      {
        method: 'POST',
        body: JSON.stringify({
          template_id: 'fab35e67d2bd409d82c9fe068e630af3',
          page: 1,
          page_size: 999,
        }),
        next: { revalidate: 3600 },
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEST_TOKEN}`,
        },
      }
    );
    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
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
      <div className='flex flex-col justify-evenly rounded-lg bg-white p-5 md:h-[200px] md:w-[full]'>
        <p className='small-regular text-shadow'>
          My goal is to expand my company and help more Chinese students come to
          study in the UK. Although I have gained extensive experience in this
          field, I recognize that there is still much more for me to learn. ...
        </p>
        <p className='small-regular text-primary-200'>Created Nov 7, 2023</p>
      </div>
      <div className='flex flex-col justify-evenly rounded-lg bg-white p-5 md:h-[200px] md:w-[full]'>
        <p className='small-regular text-shadow'>
          My goal is to expand my company and help more Chinese students come to
          study in the UK. Although I have gained extensive experience in this
          field, I recognize that there is still much more for me to learn. ...
        </p>
        <p className='small-regular text-primary-200'>Created Nov 7, 2023</p>
      </div>
      <div className='flex flex-col justify-evenly rounded-lg bg-white p-5 md:h-[200px] md:w-[full]'>
        <p className='small-regular text-shadow'>
          My goal is to expand my company and help more Chinese students come to
          study in the UK. Although I have gained extensive experience in this
          field, I recognize that there is still much more for me to learn. ...
        </p>
        <p className='small-regular text-primary-200'>Created Nov 7, 2023</p>
      </div>
    </motion.div>
  );
};

export default HistoryPanel;
