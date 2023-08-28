import ProfilClient from "./ProfilClient";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/GetCurrentUser";


const ProfilPage = async ()=>{

    const currentUser = await getCurrentUser();
    
    return (
        <ClientOnly>
            <ProfilClient currentUser={currentUser} src={currentUser?.image}/>
        </ClientOnly>
    )
}

export default ProfilPage