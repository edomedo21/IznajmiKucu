'use client';

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';

interface AvatarProps{
  src: string | null | undefined
}

const Avatar:React.FC<AvatarProps> = ({
  src
}) => {
  return (
    <Image className='rounded-full' height='30' width='30' alt='Avatar' src={src || '/images/placeholder.jpg'} />
  )
}

export default Avatar