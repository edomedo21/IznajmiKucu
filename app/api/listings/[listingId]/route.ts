import {NextResponse} from 'next/server';

import getCurrentUser from '@/app/actions/GetCurrentUser';

import prisma from '@/app/libs/prismadb';

interface param {
    listingId?: string
}

export async function DELETE (
    request: Request,
    {params}: {params: param}
){
  const trenutniKorisnik = await getCurrentUser();

  if(!trenutniKorisnik){
    return NextResponse.error();
  }

  const {listingId} = params;

  if(!listingId || typeof listingId != 'string'){
    throw new Error('Invalid ID');
  }

  const listing = await prisma.listing.deleteMany({
    where: {
        id: listingId,
        userId: trenutniKorisnik.id
        }
  });

  return NextResponse.json(listing);
}