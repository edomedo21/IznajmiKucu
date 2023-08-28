'use client';

import React, { useCallback, useMemo, useState } from 'react'
import Modal from './Modal'
import useRentModal from '@/app/hooks/useRentModal'
import Heading from '../Heading';
import { categories } from '../navbar/Categories';
import CategoryInput from '../Inputs/CategoryInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import CountrySelect from '../Inputs/CountrySelect';
import dynamic from 'next/dynamic';
import Counter from '../Inputs/Counter';
import ImageUpload from '../Inputs/ImageUpload';
import  Input  from '../Inputs/Input';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

enum koraci {
    KATEGORIJA = 0,
    LOKACIJA = 1,
    INFO = 2,
    SLIKE = 3,
    OPIS = 4,
    CIJENA = 5
}

const RentModal = () => {
    const router = useRouter();
    const rentModal = useRentModal();
    const [korak, setKorak] = useState(koraci.KATEGORIJA);
    const [isLoading, setisLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors
        },
        reset
    } = useForm<FieldValues>({
        defaultValues:{
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
    })

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');

    const Map = useMemo(()=> dynamic(()=> import('../Map'), {
        ssr: false
    }), [location]);

    const setCustomValue = (id: string, value: any)=>{
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate:true,
        })
    }

    const onBack = () =>{
        setKorak((value) => 
            value-1
        );
    }

    const onNext=()=>{
        setKorak((value) => value + 1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        if(korak !== koraci.CIJENA){
            return onNext();
        }
        setisLoading(true);
        axios.post('/api/listings', data).then(()=>{
            toast.success('Posjed uspješno napravljen!');
            router.refresh();
            reset();
            setKorak(koraci.KATEGORIJA);
            rentModal.onClose();
        }).catch(()=>{
            toast.error('Nešto nije u redu!');
        }).finally(()=>{
            setisLoading(false);
        });
    }

    const actionLabel = useMemo(()=>{
        if (korak == koraci.CIJENA){
            return 'Napravi posjed';
        }

        return 'Sljedeće';
    },[korak]);

    const provjera = useCallback(()=>{
        if(location && location.latlng && location.latlng[0] !== undefined){
            return true;
        }
        return false;
    }, [location]);

    const secondaryActionLabel = useMemo(()=>{
        if(korak == koraci.KATEGORIJA){
            return undefined;
        }
        return 'Nazad';
    },[korak]);

    let BodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading title='Koje od navedenih najbolje opisuje vaš posjed?' subtitle='Odaberite kategoriju'/>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
                {categories.map((item)=>(
                    <div key={item.label} className='col-span-1'>
                        <CategoryInput onClick={(category)=>setCustomValue('category', category)} selected={category == item.label} label={item.label} icon={item.icon}/>
                    </div>
                ))}
            </div>

        </div>
    )

    if(korak == koraci.LOKACIJA){
        console.log(provjera());
        BodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading title='Gdje se vaš posjed nalazi?' subtitle='Pomozite gostima da vas pronađu!'/>
                <CountrySelect value={location} onChange={(value) => setCustomValue('location', value)}/>
                {location && provjera() ? (
                <Map center={[location?.latlng[0], location?.latlng[1]]} />
                ) : (
                 <Map center={location?.LatLngExpression} />
                )}
            </div>
        )
         
    }

    if(korak == koraci.INFO){
        BodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading title='Podijelite neke osnovne stvari o vašem posjedu' subtitle='Od čega se sastoji?' />
                <Counter title='Gosti' subtitle='Koliko gostiju dozvoljavate?' value={guestCount} onChange={(value)=> setCustomValue('guestCount', value)}/>
                <hr />
                <Counter title='Sobe' subtitle='Koliko soba imate?' value={roomCount} onChange={(value)=> setCustomValue('roomCount', value)}/>
                <hr />
                <Counter title='Kupatila' subtitle='Koliko kupatila imate?' value={bathroomCount} onChange={(value)=> setCustomValue('bathroomCount', value)}/>
                </div>
            
        ) 
    }

    if(korak == koraci.SLIKE){
        BodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading title='Dodajte sliku vašeg posjeda' subtitle='Pokažite kako Vaš posjed izgleda!'/>
                <ImageUpload value={imageSrc} onChange={(value)=>setCustomValue('imageSrc', value)}/>
            </div>
        )
    }

    if(korak == koraci.OPIS){
        BodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading title='Kako biste opisali vaše mjesto?' subtitle='Kratko i jasno!'/>
                <Input id='title' label='Naziv' disabled={isLoading} register={register} errors={errors} required/>
                <hr />
                <Input id='description' label='Opis' disabled={isLoading} register={register} errors={errors} required/>

            </div>
        )
    }

    if(korak == koraci.CIJENA){
        BodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading title='Sada, postavite cijenu' subtitle='Koliko naplaćujete po noći?'/>
                <Input id='price' label='Cijena' formatPrice type='number' register={register} errors={errors} required/>
            </div>
            
        )
    }
  return (
    <Modal title='IznajmiKucu Tvoja kuća' body={BodyContent} isOpen={rentModal.isOpen} onClose={rentModal.onClose} onSubmit={handleSubmit(onSubmit)} secondaryAction={korak == koraci.KATEGORIJA ? undefined : onBack} actionLabel={actionLabel} secondaryActionLabel={secondaryActionLabel} />
  )
}

export default RentModal