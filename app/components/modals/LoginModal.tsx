'use client';

import React, { useCallback, useState } from 'react';
import { signIn} from 'next-auth/react'
import { FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';;
import Heading from '../Heading';
import  Input  from '../Inputs/Input';
import {toast} from 'react-hot-toast';
import Button from '../Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';


const LoginModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setisLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,

    }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const BodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Dobrodošli nazad' subtitle='Logirajte se na svoj račun' center/>
      <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required/>
      <Input id='password' type='password' label='Lozinka' disabled={isLoading} register={register} errors={errors} required/>
    </div>
  );

  const onSubmit: SubmitHandler<FieldValues> =(data) =>{
    setisLoading(true);
    signIn('credentials', {
      ... data,
      redirect: false
    }).then((callback) =>{
      setisLoading(false);
      if(callback?.ok){
        toast.success('Logged in');
        router.refresh();
        loginModal.onClose();
      }

      if(callback?.error){
        toast.error(callback.error);
      }
    })
  }

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />

      <div className='justify-center flex flex-row gap-2'>
      <Button outline label={'Logiraj se preko Google-a'} icon={FcGoogle} onClick={()=>signIn('google')}/>
      </div>

    </div>
  )

  return (
   <Modal disabled={isLoading} isOpen={loginModal.isOpen} title='Login' actionLabel='Logiraj se' onClose={loginModal.onClose} onSubmit={handleSubmit(onSubmit)} body={BodyContent} footer={footerContent}/>
  )
}

export default LoginModal