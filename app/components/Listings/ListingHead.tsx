'use client';

import useCountries from '@/app/hooks/useCountries';
import { safeUser } from '@/app/types';
import React from 'react';
import Image from 'next/image';
import Heading from '../Heading';
import HeartButton from '../HeartButton';

interface ListingHeadProps {
title: string,
locationValue: string,
imageSrc: string,
id: string,
currentUser?: safeUser | null,

}

const ListingHead:React.FC<ListingHeadProps> = ({
    title,
    locationValue,
    imageSrc,
    id,
    currentUser
}) => {

    const {getByValue} = useCountries();
    const location = getByValue(locationValue);
  return (
    <>
    <Heading title={title} subtitle={`${location?.region}, ${location?.label}`}/>
    <div className='w-full h-[100vh] overflow-hidden rounded-xl relative'>
        <Image alt="Image" src={imageSrc} fill={true} className='object-cover w-full'/>
        <div className='absolute top-5 right-5'>
            <HeartButton listingId={id} currentUser={currentUser}/>
        </div>
    </div>
    </>
  )
}

export default ListingHead