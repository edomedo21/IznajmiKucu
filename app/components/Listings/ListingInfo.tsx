'use client' 

import useCountries from '@/app/hooks/useCountries';
import { safeUser } from '@/app/types'
import React from 'react'
import { IconType } from 'react-icons';
import Avatar from '../Avatar';
import dynamic from 'next/dynamic';

interface ListingInfoProps{
user: safeUser;
description: string;
roomCount: number;
guestCount: number;
bathroomCount: number;
locationValue: string,
}

const Map = dynamic(()=>import('../Map'), {
    ssr: false
});

const ListingInfo:React.FC<ListingInfoProps> = ({
    user,
    description,
    roomCount,guestCount,bathroomCount,
    locationValue
}) => {

    const {getByValue} = useCountries();

    const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className='col-span-4 flex flex-col gap-8'>
        <div className='flex flex-col gap-2'>
            <div className='text-xl font-semibold flex flex-row items-center gap-2'>
                <div>Vlasnik posjeda je {user?.name}</div>
                <Avatar src={user?.image} />
            </div>
            <div className='flex flex-row items-center gap-4 font-light text-neutral-500'>
                <div>{guestCount} gost/a </div>
                <div>{roomCount} soba/e</div>
                <div>{bathroomCount} kupatilo/a</div>
            </div>
        </div>
        <hr />
        <div className='text-lg font-light text-neutral-500'>{description}</div>
        <hr />
        <Map center={coordinates}/>
    </div>
  )
}

export default ListingInfo