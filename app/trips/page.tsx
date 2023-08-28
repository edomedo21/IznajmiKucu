import React from 'react'
import EmptyState from '../components/EmptyState';
import ClientOnly from '../components/ClientOnly';
import getCurrentUser from '../actions/GetCurrentUser';
import GetReservations from '../actions/GetReservations';
import TripsClient from './TripsClient';


const Tripspage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState title='Unauthoraized' subtitle='Please log in!'/>
            </ClientOnly>
        )
    }

    const reservations = await GetReservations({
        userId: currentUser.id,
    });

    if(reservations.length == 0){
        return (
            <ClientOnly>
                <EmptyState title='Nema pronađenih rezervacija' subtitle='Izgleda da niste rezervisali nikakva putovanja'/>
            </ClientOnly>
        )
    }

  return (
    <ClientOnly>
        <TripsClient reservations={reservations} currentUser={currentUser}/>
    </ClientOnly>
  )
}

export default Tripspage