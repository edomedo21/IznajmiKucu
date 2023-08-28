import axios from 'axios';
import { safeUser } from '../types';
import { useRouter } from 'next/navigation';
import useLoginModal from './useLoginModal';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

interface IUseFavourite {
    listingId: string;
    currentUser?: safeUser | null;
}


const useFavourite = ({
    listingId,
    currentUser
}: IUseFavourite) =>{
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavourited = useMemo(()=>{
        const list = currentUser?.favouriteIds || [];
        return list.includes(listingId);
    },[currentUser, listingId]);

    const toggleFavourite = useCallback(async (e: React.MouseEvent<HTMLDivElement>)=>{
        e.stopPropagation();
        if(!currentUser){
            return loginModal.onOpen();
        }
        try{
            let request;

            if(hasFavourited){
                request = ()=>axios.delete(`/api/favourites/${listingId}`)
            }
            else {
                request = ()=>axios.post(`/api/favourites/${listingId}`);
            }
            await request();

            router.refresh();
            toast.success('Uspješno dodano u favorite!');
        }
        catch(error){
            toast.error('Nešto nije uredu!');
        }
    },[currentUser, hasFavourited, listingId, loginModal, router]);

    return {
        hasFavourited,
        toggleFavourite
}
}
export default useFavourite