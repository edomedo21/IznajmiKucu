import ClientOnly from './components/ClientOnly'
import Container from './components/Container'
import EmptyState from './components/EmptyState';
import getListings, { MojiPosjedi } from './actions/getListings';
import ListingCard from './components/Listings/ListingCard';
import getCurrentUser from './actions/GetCurrentUser';
import Footer from './components/Footer/Footer';

interface HomeProps {
  searchParams: MojiPosjedi
}

const Home = async ({
  searchParams
}: HomeProps) => {

  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if(listings.length == 0){
    return (
      <ClientOnly>
        <EmptyState showReset/>
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <Container>
        <div className='bg-bijela pt-24 grid grid-cols-4 gap-8'>
           {listings.map((listing)=>{
            return (
              <ListingCard 
              currentUser={currentUser} key={listing.id} data={listing}/>
            )
           })}
        </div>
      </Container>
    </ClientOnly>
  )
}

export default Home;