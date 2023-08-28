import getCurrentUser from '@/app/actions/GetCurrentUser';
import getListingById from '@/app/actions/getListingById'
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import React from 'react'
import ListingClient from './ListingClient';
import GetReservations from '@/app/actions/GetReservations';

interface Iparams {
    listingId?: string
}

const ListingPage = async  ({params} : {params: Iparams}) => {
    const listing = await getListingById(params);
    const reservations = await GetReservations(params);
    const currentUser = await getCurrentUser();

    if(!listing){
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }

  return (
    <ClientOnly>
        <ListingClient listing={listing} currentUser={currentUser} reservations={reservations}/>
    </ClientOnly>
  )
}

export default ListingPage