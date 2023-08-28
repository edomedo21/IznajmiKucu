'use client';
import React, { useCallback, useState } from 'react'
import { safeUser, SafeReservations } from '../types';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Heading from '../components/Heading';
import Container from '../components/Container';
import ListingCard from '../components/Listings/ListingCard';
import { useRouter } from 'next/navigation';

interface ReservationsClientProps{
    reservations: SafeReservations[];
    currentUser?: safeUser | null;
}

const ReservationsClient:React.FC<ReservationsClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');
    const onCancel = useCallback((id:string)=>{
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`).then(()=>{
            toast.success('Rezervacija otkazana!');
            router.refresh();
        }).catch(()=>{
            toast.error('Nešto nije u redu!');
        }).finally(()=>{
            setDeletingId('');
        })
    },[router])
  return (
    <Container>
        <Heading title='Rezervacije' subtitle='Lista rezervacija na Vašem posjedu!'/>
        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:gric-cols-6 gap-8'>
            {reservations.map((reservation)=>(
                <ListingCard key={reservation.id} data={reservation.listing} reservation={reservation} actionId={reservation.id} onAction={onCancel} disabled={deletingId == reservation.id} actionLabel='Otkažite rezervaciju' currentUser={currentUser}/>
            ))}
        </div>
    </Container>
  )
}

export default ReservationsClient