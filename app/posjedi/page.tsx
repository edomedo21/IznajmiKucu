import React from 'react'
import EmptyState from '../components/EmptyState';
import ClientOnly from '../components/ClientOnly';
import getCurrentUser from '../actions/GetCurrentUser';
import PosjediClient from './PosjediClient';
import getListings from '../actions/getListings';


const Posjedipage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState title='Nemate odobrenje za pristup ovoj stranici' subtitle='Logirajte se!'/>
            </ClientOnly>
        )
    }

    const listings = await getListings({
        userId: currentUser.id,
    });

    if(listings.length == 0){
        return (
            <ClientOnly>
                <EmptyState title='Nema pronađenih posjeda' subtitle='Izgleda da nemate posjeda!'/>
            </ClientOnly>
        )
    }

  return (
    <ClientOnly>
        <PosjediClient listings={listings} currentUser={currentUser}/>
    </ClientOnly>
  )
}

export default Posjedipage