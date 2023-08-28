'use client';

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';

const Footer = () => {
  const router = useRouter();
  return (
   
<footer className="bg-crna rounded-t-lg shadow dark:bg-crna w-full">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a href="" className="flex items-center mb-4 sm:mb-0">
            <Image onClick={()=>router.push('/')} alt='Logo' className='hidden md:block cursor-pointer mr-3' height='100' width='100' src='/images/logo4.png'/>
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">IznajmiKucu</span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6 ">O Nama</a>
                </li>
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6">Prava Privatnosti</a>
                </li>
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6 ">Licenca</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Kontakt</a>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="" className="hover:underline">IznajmiKucu™</a>. Sva Prava Pridržana.</span>
    </div>
</footer>



  )
}

export default Footer