'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import CopyDialog from '@/components/landing/h5-cn-mobile/CopyDialog';

export default function Page({}) {
  const [open, setOpen] = useState(false);

  const h5TopBgUrl = '/landing/h5_cn_mobile/h5_top_bg.png';

  const handleFreeUse = () => {
    const copyText = 'https://prodream.cn/';
    navigator.clipboard.writeText(copyText);
    setOpen(true);

    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  return (
    <>
      <div className='h-full min-h-screen w-full bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-white'>
        <CopyDialog open={open} setOpen={setOpen} />

        <div
          className='w-full px-5 pt-4 text-center'
          style={{
            backgroundImage: `url(${h5TopBgUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Image
            src='/logo/Prodream.png'
            alt='ProDream Logo'
            width={170}
            height={33}
            className='mb-4  w-auto'
          />
          <h1 className='mb-2 mt-20 text-center font-poppins text-4xl font-bold leading-[52px]'>
            一站式AI服务平台
          </h1>
          <p className='mb-4 text-center font-poppins text-4xl font-normal leading-[36px]'>
            智能写作 轻松留学
          </p>
          <p className='mb-6 mt-6 text-sm text-neutral-500'>
            全球留学群体的共同选择{' '}
            <span className='text-neutral-500'>https://prodream.cn/</span>
          </p>
          <Button
            className='mb-12 rounded-full bg-purple-500 px-12 py-2 text-white'
            onClick={handleFreeUse}
          >
            免费使用
          </Button>
          <Image
            src='/landing/h5_cn_mobile/main_banner.png'
            alt='Main Banner'
            width={1260}
            height={600}
            className='mx-auto'
          />
        </div>

        <div className='p-4.5 mx-5 mb-4 mt-8 rounded-b-lg rounded-t-lg bg-white dark:bg-zinc-800'>
          <div
            className='mx-4 flex items-center justify-center border-b border-gray-300 pb-4 pt-4'
            style={{ borderBottomWidth: '0.5px' }}
          >
            <Image
              src='/landing/h5_cn_mobile/sub_banner_1.png'
              alt='Feature Image'
              width={300}
              height={150}
              className='mr-6 w-1/3 rounded-lg'
            />
            <div className='w-2/3'>
              <h2 className='text-xl font-semibold'>快速文书生成体验</h2>
              <p className='text-sm'>续写/润色/提纲生成多功能支持</p>
            </div>
          </div>
          <div
            className='mx-4 flex flex-row-reverse items-center justify-center border-b border-gray-300 py-4'
            style={{ borderBottomWidth: '0.5px' }}
          >
            <Image
              src='/landing/h5_cn_mobile/sub_banner_2.png'
              alt='Feature Image'
              width={300}
              height={150}
              className='ml-6 w-1/3 rounded-lg'
            />
            <div className='w-2/3'>
              <h2 className='text-xl font-semibold'>专业学术写作支持</h2>
              <p className='text-sm'>文献引用/AI检测降重专业可靠</p>
            </div>
          </div>
          <div className='mx-4 flex items-center justify-center py-4'>
            <Image
              src='/landing/h5_cn_mobile/sub_banner_3.png'
              alt='Feature Image'
              width={300}
              height={150}
              className='mr-6 w-1/3 rounded-lg'
            />
            <div className='w-2/3'>
              <h2 className='text-xl font-semibold'>MEET JESSICA</h2>
              <p className='text-sm'>AI对话，随时答疑解惑</p>
            </div>
          </div>
          <div className='pb-4 pt-4 text-center'>
            <Button
              className='rounded-full bg-purple-500 px-16 py-2 text-white'
              onClick={handleFreeUse}
            >
              免费使用
            </Button>
          </div>
        </div>

        <div className='mb-4 bg-zinc-100 px-5 dark:bg-zinc-800'>
          <div className='w-full max-w-full overflow-x-hidden rounded-lg bg-white py-5'>
            <h2 className='mb-2 text-center text-xl font-semibold'>专业高效</h2>
            <p className='mb-4 text-center text-xl font-semibold'>
              获得多元群体和院校的认可
            </p>
            <div
              className='flex space-x-4 overflow-x-auto px-4'
              style={{ width: 'auto' }}
            >
              <div
                className='w-[240px] flex-shrink-0 rounded-lg p-4'
                style={{
                  background:
                    'linear-gradient(204deg, #6A9092 -0.18%, #384D54 85.67%)',
                }}
              >
                <div className='mb-6 flex items-center space-x-2.5'>
                  <Image
                    src='/landing/h5_cn_mobile/card_avatar_1.png'
                    alt='User Image'
                    width={46}
                    height={46}
                    className='rounded-full'
                  />
                  <div className='font-poppins text-sm font-normal leading-7 text-white'>
                    <p className='text-sm'>王雨晴</p>
                    <p className='text-sm'>海外本申请中</p>
                  </div>
                </div>
                <p className='font-poppins text-sm font-normal leading-7 text-white'>
                  ProDream，简单易用，帮助我更好的进行文书的修改和撰写，文书得到了指导老师认可，获得了理想院校offer。
                </p>
              </div>
              <div
                className='w-[240px] flex-shrink-0 rounded-lg p-4'
                style={{
                  background:
                    'linear-gradient(204deg, #766A92 -0.18%, #403854 85.67%)',
                }}
              >
                <div className='mb-6 flex items-center space-x-2.5'>
                  <Image
                    src='/landing/h5_cn_mobile/card_avatar_2.png'
                    alt='User Image'
                    width={46}
                    height={46}
                    className='rounded-full'
                  />
                  <div className='font-poppins text-sm font-normal leading-7 text-white'>
                    <p className='text-sm'>李海华</p>
                    <p className='text-sm'>大四学生</p>
                  </div>
                </div>
                <p className='font-poppins text-sm font-normal leading-7 text-white'>
                  ProDream现在是我的写作工具。它帮助我润色我的句子以适应学术风格，当然也有助于提高我的成绩。有了ProDream，写论文变得容易多了。
                </p>
              </div>
              <div
                className='w-[240px] flex-shrink-0 rounded-lg p-4'
                style={{
                  background:
                    'linear-gradient(204deg, #6A7F92 -0.18%, #383E54 85.67%)',
                }}
              >
                <div className='mb-6 flex items-center space-x-2.5'>
                  <Image
                    src='/landing/h5_cn_mobile/card_avatar_3.png'
                    alt='User Image'
                    width={46}
                    height={46}
                    className='rounded-full'
                  />
                  <div className='font-poppins text-sm font-normal leading-7 text-white'>
                    <p className='text-sm'>Aarav S. Gupta</p>
                    <p className='text-sm'>博士在读</p>
                  </div>
                </div>
                <p className='font-poppins text-sm font-normal leading-7 text-white'>
                  我尝试过一些AI工具，ProDream无疑是最好的。它可以帮助我改写句子，组织段落，使语言更加流畅。使用ProDream让我对自己的论文充满信心。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='mb-4 bg-zinc-100 px-5 dark:bg-zinc-800'>
          <div className='flex items-center space-x-2'>
            <div className='w-full max-w-full overflow-x-hidden rounded-lg bg-white p-5'>
              <div className='flex items-center space-x-2'>
                <div className='rounded-22 my-auto h-6 w-1 bg-purple-500'></div>
                <h2 className='my-2 font-poppins text-3xl font-normal leading-10 text-black'>
                  我们的团队
                </h2>
              </div>
              <p className='font-poppins text-sm font-normal leading-7 text-neutral-500'>
                团队基于哈佛创新实验室及微软创中心成立，成员来自哈佛大学和斯坦福大学等学府，在人工智能和计算机科学领域，帮助了超过10万名学生获得学术成就。
              </p>
              <Image
                src='/landing/h5_cn_mobile/team_logo.png'
                alt='Feature Image'
                width={402}
                height={60}
                className='mt-6 w-2/3'
              />
            </div>
          </div>
        </div>

        <div className='mb-4 bg-zinc-100 px-5 dark:bg-zinc-800'>
          <div
            className='mb-4 rounded-lg px-5 py-8 text-center text-white'
            style={{
              background:
                'linear-gradient(82deg, #795BFF -12.76%, #CD65FF 95.69%)',
            }}
          >
            <h2 className='text-center font-poppins text-3xl font-normal leading-10 text-white'>
              欢迎使用ProDream
            </h2>
            <p className='leading-tighter my-1 text-center font-poppins text-xs font-normal tracking-wide text-white'>
              与全球留学群体共同使用AI文书工具
            </p>
            <Button
              onClick={handleFreeUse}
              className='m-auto mt-3 flex items-center justify-center gap-2.5 rounded-[42px] border-2 border-light-purple bg-white px-12 py-2'
            >
              <span className='font-poppins text-base font-bold leading-10 text-purple-500'>
                免费使用
              </span>
            </Button>
          </div>
        </div>

        <div className='bg-zinc-900 px-5 py-4'>
          <div className='text-white'>
            <h2 className='mb-2 font-poppins text-lg font-normal leading-6'>
              联系我们
            </h2>
            <p className='font-poppins text-sm font-normal leading-6 text-white-60'>
              商务电话: 13221838728
            </p>
            <p className='font-poppins text-sm font-normal leading-6 text-white-60'>
              客服邮箱: support@prodream.ai
            </p>
            <p className='font-poppins text-sm font-normal leading-6 text-white-60'>
              公司地址: 北京市延庆区八达岭延庆城路2号楼2层1001室
            </p>
            <Image
              src='/logo/ProdreamWhite.png'
              alt='ProDream Logo'
              width={85}
              height={16}
              className='mb-2 mt-10 w-auto'
            />
            <p className='font-poppins text-sm font-normal leading-6 text-white-60'>
              塑造您的学术未来
            </p>
            <p className='font-poppins text-sm font-normal leading-6 text-white-60'>
              从大学申请到毕业，一路保持精湛写作。
            </p>
            <div className='mt-2 flex h-6 flex-col items-center justify-center gap-2 self-stretch rounded-full border-t border-dark-gray bg-dark-gray p-0'>
              <span className='font-poppins text-xs font-normal leading-6 text-light-gray'>
                https://prodream.cn/
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
