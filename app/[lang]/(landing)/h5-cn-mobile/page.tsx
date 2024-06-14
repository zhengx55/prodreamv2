"use client"
import { useEffect, useState } from "react";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import CopyDialog from '@/components/landing/h5-cn-mobile/CopyDialog';

export default function Page({ }) {
    const [open, setOpen] = useState(false);

    const h5TopBgUrl = "/landing/h5_cn_mobile/h5_top_bg.png";


    const handleFreeUse = () => {
        const copyText = 'https://prodream.cn/';
        navigator.clipboard.writeText(copyText);
        setOpen(true);
    }

    return (
        <>
            <div className="bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white h-full min-h-screen w-full">
                <CopyDialog open={open} setOpen={setOpen} />

                <div className="text-center pt-4 px-5 w-full" style={{ backgroundImage: `url(${h5TopBgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <Image src="/logo/Prodream.png" alt="ProDream Logo" width={170} height={33} className="mb-4" />
                    <h1 className="font-poppins text-4xl font-bold leading-[52px] text-center mb-2 mt-20">一站式AI服务平台</h1>
                    <p className="font-poppins text-4xl font-normal leading-[36px] text-center mb-4">智能写作 轻松留学</p>
                    <p className="text-sm mb-6 mt-6 text-neutral-500">全球留学群体的共同选择 <span className="text-neutral-500">https://prodream.cn/</span></p>
                    <Button className="bg-purple-500 text-white py-2 px-12 rounded-full mb-12" onClick={handleFreeUse}>免费使用</Button>
                    <Image src="/landing/h5_cn_mobile/main_banner.png" alt="Main Banner" width={1260} height={600} className="mx-auto" />
                </div>

                <div className="mt-8 mb-4 mx-5 rounded-t-lg rounded-b-lg p-4.5 bg-white dark:bg-zinc-800">
                    <div className="flex items-center border-b border-gray-300 pb-4 mx-4 pt-4" style={{ borderBottomWidth: '0.5px' }}>
                        <Image src="/landing/h5_cn_mobile/sub_banner_1.png" alt="Feature Image" width={300} height={150} className="w-1/2 rounded-lg mr-2.5" />
                        <div className="w-1/2">
                            <h2 className="text-xl font-semibold mb-2">快速文书生成体验</h2>
                            <p className="text-sm mb-4">续写/润色/提纲生成多功能支持</p>
                        </div>
                    </div>
                    <div className="flex items-center flex-row-reverse border-b border-gray-300 py-4 mx-4" style={{ borderBottomWidth: '0.5px' }}>
                        <Image src="/landing/h5_cn_mobile/sub_banner_2.png" alt="Feature Image" width={300} height={150} className="w-1/2 rounded-lg ml-2.5" />
                        <div className="w-1/2">
                            <h2 className="text-xl font-semibold mb-2">专业学术写作支持</h2>
                            <p className="text-sm mb-4">文献引用/AI检测降重专业可靠</p>
                        </div>
                    </div>
                    <div className="flex items-center py-4 mx-4">
                        <Image src="/landing/h5_cn_mobile/sub_banner_3.png" alt="Feature Image" width={300} height={150} className="w-1/2 rounded-lg mr-2.5" />
                        <div className="w-1/2">
                            <h2 className="text-xl font-semibold mb-2">MEET JESSICA</h2>
                            <p className="text-sm mb-4">AI对话，随时答疑解惑</p>
                        </div>
                    </div>
                    <div className="text-center pt-4 pb-4">
                        <Button className="bg-purple-500 text-white py-2 px-16 rounded-full" onClick={handleFreeUse}>免费使用</Button>
                    </div>
                </div>


                <div className="bg-zinc-100 dark:bg-zinc-800 px-5 mb-4">
                    <div className="bg-white rounded-lg py-5 w-full max-w-full overflow-x-hidden">
                        <h2 className="text-xl font-semibold mb-2 text-center">专业高效</h2>
                        <p className="text-xl font-semibold mb-4 text-center">获得多元群体和院校的认可</p>
                        <div className="flex overflow-x-auto space-x-4 px-4" style={{ width: 'auto' }}>
                            <div className="flex-shrink-0 w-[240px] rounded-lg p-4" style={{ background: 'linear-gradient(204deg, #6A9092 -0.18%, #384D54 85.67%)' }}>
                                <div className="flex items-center space-x-2.5 mb-6">
                                    <Image src="/landing/h5_cn_mobile/card_avatar_1.png" alt="User Image" width={46} height={46} className="rounded-full" />
                                    <div className="text-white font-poppins text-sm font-normal leading-7">
                                        <p className="text-sm">王雨晴</p>
                                        <p className="text-sm">海外本申请中</p>
                                    </div>
                                </div>
                                <p className="text-white font-poppins text-sm font-normal leading-7">ProDream，简单易用，帮助我更好的进行文书的修改和撰写，文书得到了指导老师认可，获得了理想院校offer。</p>
                            </div>
                            <div className="flex-shrink-0 w-[240px] rounded-lg p-4" style={{ background: 'linear-gradient(204deg, #766A92 -0.18%, #403854 85.67%)' }}>
                                <div className="flex items-center space-x-2.5 mb-6">
                                    <Image src="/landing/h5_cn_mobile/card_avatar_2.png" alt="User Image" width={46} height={46} className="rounded-full" />
                                    <div className="text-white font-poppins text-sm font-normal leading-7">
                                        <p className="text-sm">李海华</p>
                                        <p className="text-sm">大四学生</p>
                                    </div>
                                </div>
                                <p className="text-white font-poppins text-sm font-normal leading-7">ProDream现在是我的写作工具。它帮助我润色我的句子以适应学术风格，当然也有助于提高我的成绩。有了ProDream，写论文变得容易多了。</p>
                            </div>
                            <div className="flex-shrink-0 w-[240px] rounded-lg p-4" style={{ background: 'linear-gradient(204deg, #6A7F92 -0.18%, #383E54 85.67%)' }}>
                                <div className="flex items-center space-x-2.5 mb-6">
                                    <Image src="/landing/h5_cn_mobile/card_avatar_3.png" alt="User Image" width={46} height={46} className="rounded-full" />
                                    <div className="text-white font-poppins text-sm font-normal leading-7">
                                        <p className="text-sm">Aarav S. Gupta</p>
                                        <p className="text-sm">博士在读</p>
                                    </div>
                                </div>
                                <p className="text-white font-poppins text-sm font-normal leading-7">我尝试过一些AI工具，ProDream无疑是最好的。它可以帮助我改写句子，组织段落，使语言更加流畅。使用ProDream让我对自己的论文充满信心。</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="bg-zinc-100 dark:bg-zinc-800 px-5 mb-4">
                    <div className="flex items-center space-x-2">
                        <div className="bg-white rounded-lg p-5 w-full max-w-full overflow-x-hidden">
                            <div className="flex items-center space-x-2">
                                <div className="w-1 bg-purple-500 h-6 rounded-22 my-auto"></div>
                                <h2 className="text-3xl font-normal leading-10 font-poppins text-black my-2">我们的团队</h2>
                            </div>
                            <p className="text-sm font-normal leading-7 font-poppins text-neutral-500">团队基于哈佛创新实验室及微软创中心成立，成员来自哈佛大学和斯坦福大学等学府，在人工智能和计算机科学领域，帮助了超过10万名学生获得学术成就。</p>
                            <Image src="/landing/h5_cn_mobile/team_logo.png" alt="Feature Image" width={402} height={60} className="w-2/3 mt-6" />
                        </div>
                    </div>
                </div>

                <div className="bg-zinc-100 dark:bg-zinc-800 px-5 mb-4">
                    <div className="text-white text-center py-8 rounded-lg mb-4 px-5" style={{ background: 'linear-gradient(82deg, #795BFF -12.76%, #CD65FF 95.69%)' }}>
                        <h2 className="text-white text-center font-poppins text-3xl font-normal leading-10">欢迎使用ProDream</h2>
                        <p className="text-white text-center font-poppins text-xs font-normal leading-tighter tracking-wide my-1">与全球留学群体共同使用AI文书工具</p>
                        <Button onClick={handleFreeUse} className="flex justify-center items-center gap-2.5 px-12 py-2 border-2 border-light-purple bg-white rounded-[42px] m-auto mt-3">
                            <span className="text-purple-500 font-poppins text-base font-bold leading-10">免费使用</span>
                        </Button>
                    </div>
                </div>

                <div className="bg-zinc-900 py-4 px-5">
                    <div className="text-white">
                        <h2 className="text-lg font-normal leading-6 font-poppins mb-2">联系我们</h2>
                        <p className="text-white-60 font-poppins text-sm font-normal leading-6">商务电话: 13221838728</p>
                        <p className="text-white-60 font-poppins text-sm font-normal leading-6">客服邮箱: support@prodream.ai</p>
                        <p className="text-white-60 font-poppins text-sm font-normal leading-6">公司地址: 北京市延庆区八达岭延庆城路2号楼2层1001室</p>
                        <Image src="/logo/ProdreamWhite.png" alt="ProDream Logo" width={85} height={16} className="mb-2 mt-10" />
                        <p className="text-white-60 font-poppins text-sm font-normal leading-6">塑造您的学术未来</p>
                        <p className="text-white-60 font-poppins text-sm font-normal leading-6">从大学申请到毕业，一路保持精湛写作。</p>
                        <div className="flex flex-col items-center justify-center gap-2 p-0 h-6 self-stretch border-t border-dark-gray bg-dark-gray rounded-full mt-2">
                            <span className="text-light-gray font-poppins text-xs font-normal leading-6">
                                https://prodream.cn/
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}