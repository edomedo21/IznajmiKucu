'use client';

import useSearchModal from '@/app/hooks/useSearchModal';
import React from 'react';
import {AiOutlineSearch} from 'react-icons/ai'

const Search = () => {
  const searchModal = useSearchModal();
  
  return (
    <div className='relative flex items-center text-gray-400 focus-within:text-gray-800 w-[270px]'>
        <AiOutlineSearch className='w-5 h-5 absolute ml-3 pointer-events-none'/>
       <input type='text' name='search' placeholder='Pretraži kuće' aria-label='Pretraži kuće' className='bg-bijela border-[1px] border-zelena min-w-full px-3 py-2 pr-3 pl-10 md:w-auto rounded-full shadow-sm hover:shadow-md transition text-black'/>
    </div>
  )
}

export default Search