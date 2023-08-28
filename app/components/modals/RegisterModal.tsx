'use client';

import React, { useCallback, useMemo, useState } from 'react';
import axios from 'axios';
import { FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';;
import Heading from '../Heading';
import Input  from '../Inputs/Input';
import {toast} from 'react-hot-toast';
import Button from '../Button';
import {signIn} from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc';
import UploadujSliku from '../Inputs/ImageUpload';

enum koraci {
  OSNOVNI_PODACI = 0,
  SLIKA = 1,
  KORISNI_PODACI = 2,
  KORISNI_PODACI_2 = 3,
}

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setisLoading] = useState(false);
  const [korak, setKorak] = useState(koraci.OSNOVNI_PODACI);

  const povecaj = ()=>{
    setKorak((value)=>value+1);
  }

  const smanji = ()=>{
    setKorak((value)=>value-1);
  }

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      image: '',
      broj: '',
      spol: '',
      adresa: '',
      lokacija: '',
    }
  });

  const image = watch('image');
  const broj = watch('broj');
  const spol = watch('spol');
  const adresa = watch('adresa');
  const lokacija = watch('lokacija');

  const setCustomValue = (id: string, value: any)=>{
    setValue(id, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate:true,
    })
}


  let BodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Dobrodošli na IznajmiKucu' subtitle='Napravite račun' center/>
      <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required/>
      <Input id='name' label='Ime' disabled={isLoading} register={register} errors={errors} required/>
      <Input id='password' type='password' label='Lozinka' disabled={isLoading} register={register} errors={errors} required/>
    </div>
  );


  const onSubmit: SubmitHandler<FieldValues> =(data) =>{
    if(korak !== koraci.KORISNI_PODACI_2){
      return povecaj();
    }
    setisLoading(true);
    axios.post('/api/register', data).then(()=>{
      registerModal.onClose();
    }).catch((error)=>{
      toast.error('Nešto nije uredu!');
    }).finally(()=>{
      setisLoading(false);
    })
  }

  const akcija = useMemo(()=>{
    if(korak == koraci.KORISNI_PODACI_2){
      return 'Registriraj se'
    }

    return 'Sljedeće';
  },[korak]);

  const drugaAkcija = useMemo(()=>{
    if(korak == koraci.OSNOVNI_PODACI){
      return undefined;
    }
    return 'Nazad';
  },[korak]);

  if(korak == koraci.SLIKA){
    BodyContent = (
      <div className='flex flex-col gap-8'>
          <Heading title='Dodajte vašu profilnu sliku' subtitle='Pokažite nam kako izgledate!'/>
          <UploadujSliku value={image} onChange={(value)=>setCustomValue('image', value)}/>
      </div>
  )
  }

  if(korak == koraci.KORISNI_PODACI){
    BodyContent = (
      <div className='flex flex-col gap-8'>
                <Heading title='Kako biste se opisali?' subtitle='Kratko i jasno!'/>
                <Input id='adresa' label='Adresa' disabled={isLoading} register={register} errors={errors} required/>
                <hr />
                <Input id='lokacija' label='Lokacija' disabled={isLoading} register={register} errors={errors} required/>
            </div>
    )
  }

  if(korak == koraci.KORISNI_PODACI_2){
    BodyContent = (
      <div className='flex flex-col gap-8'>
                <Input id='spol' label='Spol' disabled={isLoading} register={register} errors={errors} required/>
                <hr />
                <Input id='broj' label='Broj' disabled={isLoading} register={register} errors={errors} required/>
      </div>
    )
  }

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />

      <div className='justify-center flex flex-row gap-2'>
      <Button outline label={'Registriraj se sa Google računom'} icon={FcGoogle} onClick={()=>signIn('google')}/>
      </div>

    </div>
  )

  return (
   <Modal disabled={isLoading} isOpen={registerModal.isOpen} title='Registriraj se' actionLabel={akcija} onClose={registerModal.onClose} onSubmit={handleSubmit(onSubmit)} body={BodyContent} footer={footerContent} secondaryAction={korak == koraci.OSNOVNI_PODACI ? undefined : smanji} secondaryActionLabel={drugaAkcija}/>
  )
}

export default RegisterModal