import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/GetCurrentUser";
import GetReservations from "../actions/GetReservations";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async ()=>{
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return (
        <ClientOnly>
            <EmptyState title="Nedopušten pristup" subtitle="Molimo logirajte se"/>
            </ClientOnly>
        )
    }

    const reservations = await GetReservations({
        authorId: currentUser.id
    });

    if(reservations.length == 0){
        return (
            <ClientOnly>
                <EmptyState title="Nema pronađenih rezervacija" subtitle="Izgleda da nije niko još uvijek izvršio rezervaciju na Vašem posjedu!"/>
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <ReservationsClient reservations={reservations} currentUser={currentUser} />
        </ClientOnly>
    )
};

export default ReservationsPage