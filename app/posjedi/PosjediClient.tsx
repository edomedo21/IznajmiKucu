'use client';

import React, { useCallback, useState } from 'react';
import { safeListing, safeUser } from '../types';
import Container from '../components/Container';
import Heading from '../components/Heading';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ListingCard from '../components/Listings/ListingCard';

interface PosjediClientProps{
    listings: safeListing[];
    currentUser?: safeUser |null;
}

const PosjediClient:React.FC<PosjediClientProps> = ({
    listings, 
    currentUser
}) => {

    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id:string)=>{
        setDeletingId(id);
        axios.delete(`/api/listings/${id}`).then(()=>{
            toast.success('Uspješno obrisan posjed!');
            router.refresh();
        }).catch((error)=>{
            toast.error(error?.response?.data?.error);
        }).finally(()=>{
            setDeletingId('');
        });
    },[router]);
  return (
    <Container>
        <Heading title='Moji posjedi' subtitle='Lista vaših posjeda!'/>
        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
            {listings.map((listing)=>(
                <ListingCard key={listing.id} data={listing} actionId={listing.id} onAction={onCancel} disabled={deletingId == listing.id} actionLabel='Obrišite posjed' currentUser={currentUser}/>
            ))}
        </div>
    </Container>
  )
}

export default PosjediClient