'use client';

import React from 'react';
import Container from '../Container';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { GiBarn, GiBoatFishing, GiIsland} from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md';
import CategoryBox from '../CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';
import {IoDiamond} from 'react-icons/io5';

export const categories = [
    {
      id: 1,
      label: 'Plaža',
      icon: TbBeach,
      description: 'Ovaj posjed se nalazi u blizini plaže!',
    },
    {
      id: 2,
      label: 'Moderna',
      icon: MdOutlineVilla,
      description: 'Ovaj posjed predstavlja modernu kuću!'
    },
    {
      id: 3,
      label: 'Selo',
      icon: TbMountain,
      description: 'Ovaj posjed se nalazi na selu!'
    },
    {
      id:4,
      label: 'Bazeni',
      icon: TbPool,
      description: 'Ovaj posjed ima bazen!'
    },
    {
      id: 5,
      label: 'Otoci',
      icon: GiIsland,
      description: 'Ovaj posjed se nalazi na otoku!'
    },
    {
      id: 6,
      label: 'Rijeka',
      icon: GiBoatFishing,
      description: 'Ovaj posjed je u blizini rijeke!'
    },
    {
      id: 7,
      label: 'Farma',
      icon: GiBarn,
      description: 'Ovaj posjed je farma!'
    },
    {
      id: 8,
      label: 'Luksuz',
      icon: IoDiamond,
      description: 'Ovaj posjed je nov i luksuzan!'
    }
  ]

const Categories = () => {
    const params = useSearchParams();
    let category = params?.get('category');
    const pathName = usePathname();
    const isNamePage = pathName === '/';

    if(!isNamePage){
        return null;
    }

    if(!category){
      category = null;
    }

  return (
    <Container>
        <div className='pt-4 flex flex-row items-center justify-center overflow-x-auto'>
        {categories.map((item)=>(
            <CategoryBox key={item.id} label={item.label} selected={category === item.label} icon={item.icon} />
        ))}
        </div>
    </Container>
  )
}

export default Categories