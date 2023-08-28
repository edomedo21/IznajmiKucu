'use client';
import React, { useCallback, useState } from 'react'
import {safeUser } from '../types';
import Container from '../components/Container';
import Heading from '../components/Heading';
import Image from 'next/image';
import {CiLocationOn} from 'react-icons/ci';
import {AiOutlineStar, AiFillStar, AiOutlineCheck, AiFillEye} from 'react-icons/ai';
import {RiMessage2Fill} from 'react-icons/ri';
import {CgProfile} from 'react-icons/cg';

interface ProfilClientProps{
    currentUser?: safeUser |null;
    src: string | null | undefined;
}

const ProfilClient:React.FC<ProfilClientProps> = ({
    currentUser,
    src
}) => {
    const selected = true;
  return (
    <Container>
        <Heading title='Moj profil' subtitle='Osnovne informacije o Vama!'/>
        <div className='flex flex-row pt-10 gap-10 items-start justify-start'>
        <Image alt='logo' src={src || ''} width={242} height={200}/>
        <div className='flex flex-col items-start justify-start'>
            <div className='flex flex-row items-center justify-center gap-5'>
        <div className='text-2xl font-semibold'>{currentUser?.name}</div>
        <div className='flex flex-row text-light text-neutral-500 items-start justify-center gap-2'>
            <CiLocationOn size={21}/>
        <div className='text-sm'>{currentUser?.lokacija}</div>
        </div>
        </div>
        <div className='font-light text-sm text-zelena hover:text-neutral-500 cursor-pointer'>{currentUser?.email}</div>
        <div className='pt-6 text-sm font-semibold text-neutral-500'>OCJENA</div>
        <div className='flex flex-row gap-2'>
        <div className='items-center justify-center'>{currentUser?.ocjena}</div>
        <div className='flex flex-row items-center justify-center text-zelena'><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiOutlineStar/></div>
        </div>
        <div className='flex flex-row justify-center items-center gap-1 pt-6'>
            <div className='flex flex-row justify-center items-center gap-1 py-3 px-4 cursor-pointer rounded-full hover:bg-neutral-200'>
                <div><RiMessage2Fill/></div>
                <div>Pošalji poruku</div>
            </div>
            <div className='flex flex-row justify-center items-center bg-[#E8FFEF] py-3 px-4 gap-1 cursor-pointer hover:bg-neutral-50'>
                <AiOutlineCheck className='font-bold text-zelena'/>
                <div className='font-bold text-zelena'>Kontakti</div>
            </div>
            <div className='text-neutral-500 font-light px-4 cursor-pointer hover:text-zelena'>Prijavi korisnika</div>
        </div>
        <div className='flex flex-row gap-6 pt-6 text-md cursor-pointer'>
            <div className='flex flex-row items-center justify-center gap-1'>
                <div><AiFillEye className='text-neutral-500'/></div>
                <div className='text-neutral-500'>Vremenska osa</div>
            </div>
            <div className={`flex flex-row items-center border-b-2 justify-center gap-1 ${selected? 'text-crna' : 'text-neutral-500'} ${selected? 'font-bold' : 'font-ligth'} ${selected? 'border-b-zelena' : 'border-none'}`}>
                <div><CgProfile/></div>
                <div>O meni</div>
            </div>
        </div>
        <hr className='text-black w-full pb-6'/>

        <div className='text-neutral-500 text-sm pb-6'>KONTAKTNE INFORMACIJE</div>
        <div className='flex flex-col gap-4 min-w-full'>
    <div className='flex flex-row'>
        <div className='font-semibold basis-1/2'>Broj:</div>
        <div className='text-zelena basis-1/2'>{currentUser?.broj}</div>
    </div>
    <div className='flex flex-row'>
        <div className='font-semibold basis-1/2'>Adresa:</div>
        <div className='flex flex-col gap-1 basis-1/2'>
        <div className=''>{currentUser?.adresa}</div>
        </div>
    </div>
    <div className='flex flex-row'>
        <div className='font-semibold basis-1/2'>Email:</div>
        <div className='text-zelena basis-1/2'>{currentUser?.email}</div>
    </div>
</div>
    <div className='text-neutral-500 text-sm pb-6 pt-6'>OSNOVNE INFORMACIJE</div>
    <div className='flex flex-col gap-4 min-w-full'>
        <div className='flex flex-row'>
            <div className='font-semibold basis-1/2'>Ime:</div>
            <div className=''>{currentUser?.name}</div>
        </div>
        <div className='flex flex-row'>
            <div className='font-semibold basis-1/2'>Spol:</div>
            <div className=''>{currentUser?.spol}</div>
        </div>
    </div>
        </div>
        </div>
    </Container>
  )
}

export default ProfilClient