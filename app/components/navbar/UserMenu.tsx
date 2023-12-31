'use client';

import React, { useCallback, useState } from 'react'
import { AiOutlineMenu} from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import {signOut} from 'next-auth/react';
import { safeUser } from '@/app/types';
import useRentModal from '@/app/hooks/useRentModal';
import { useRouter } from 'next/navigation';

interface UserMenuProps{
    currentUser?: safeUser | null;
}

const UserMenu:React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const [otvoren, setOtvoren] = useState(false);
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();

    const otvori = useCallback(()=>{
        setOtvoren((value)=> !value);
    }, []);

    const onRent = useCallback(()=>{
        if(!currentUser){
            return loginModal.onOpen();
        }
        // open rent modal
        rentModal.onOpen();

    },[currentUser, loginModal, rentModal]);

  return (
    <div className='relative'>
        <div className='flex flex-row items-center gap-3'>
        <div onClick={onRent} className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-svijetlo-crna transition cursor-pointer'>
            Vaša kuća
        </div>
        <div onClick={otvori} 
        className='p-4 md:py-1 border-[1px] border-zelena flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'>
        <AiOutlineMenu className='text-bijela'/>
        <div className='hidden md:block '>
        <Avatar src={currentUser?.image}/>
        </div>
        <div className='text-bijela'>{currentUser?.name}</div>
        </div>
        </div>
        {otvoren && (
            <div className='text-crna absolute border-zelena roudned-xl shadow-md w-[40vw] md:w-3/4 bg-bijela overflow-hidden right-0 top-12 text-sm font-light'>
                <div className='flex flex-col cursor-pointer'>
                    {currentUser ? (
                        <>
                        <MenuItem onClick={()=>router.push('/trips')} label='Moja putovanja'/>
                <MenuItem onClick={()=>router.push('/favourites')} label='Omiljeni'/>
                <MenuItem onClick={()=>router.push('/reservations')} label='Moje rezervacije'/>
                <MenuItem onClick={()=>router.push('/posjedi')} label='Moji posjedi'/>
                <MenuItem onClick={rentModal.onOpen} label='Vaša kuća'/>
                <MenuItem onClick={()=>router.push('/profil')} label='Moj profil'/>
                <hr className='border-zelena'/>
                <MenuItem onClick={()=>signOut()} label='Odjavi se'/>
                </>
                    ): (
                <>
                <MenuItem onClick={loginModal.onOpen} label='Logiraj se'/>
                <MenuItem onClick={registerModal.onOpen} label='Registriraj se'/>
                </>
                )}
                </div>
            </div>
        )}
    </div>
  )
}

export default UserMenu