'use client';
import React from 'react'
import { safeListing, safeUser } from '../types';
import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/Listings/ListingCard';

interface FavouritesClientProps{
    listings: safeListing[];
    currentUser?: safeUser |null;
}

const FavouritesClient:React.FC<FavouritesClientProps> = ({
    listings,
    currentUser
}) => {
  return (
    <Container>
        <Heading title='Omiljeni posjedi' subtitle='Lista posjeda koje ste odabrali kao omiljene!'/>
        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
            {listings.map((listing)=>(
                <ListingCard currentUser={currentUser} key={listing.id} data={listing}/>
            ))}
        </div>
    </Container>
  )
}

export default FavouritesClient