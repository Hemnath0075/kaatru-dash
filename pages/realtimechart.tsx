import { Select } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import Iframe from 'react-iframe'
import Logo from '../public/logo.png';
import Menu from '../public/menu-svgrepo-com.svg';
import {Drawer} from 'antd';


export default function Realtimechart(){
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
    const router = useRouter();
    return (
        <>
        <div className="h-[50px] w-full fixed flex justify-between items-center border-b-2 top-0">
        <Drawer title="Select Device Range" placement="left" onClose={onClose} open={open} >
        <div className="flex flex-col gap-8">
            <p className='cursor-pointer px-2 py-2 border-black' onClick={()=>router.push("/")}>Home</p>  
            <p className='cursor-pointer px-2 py-2 border-black' onClick={()=>router.push("/charts")}>Charts</p>  
            <p className='cursor-pointer px-2 py-2 border-black' onClick={()=>router.push("/realtimechart")}>Realtime Chart</p>  
            
        </div>
      </Drawer>
        <div className="flex flex-row gap-[15%] basis-[33%]">
            <div className="flex flex-row w-auto gap-4">
              <Image src={Menu} alt="" width={30} className='cursor-pointer' onClick={showDrawer}/>
              <Image src={Logo} alt="" width={120}/>
            </div>
        </div>
        <div className="basis-[33%]"><h1 className='text-2xl'>COLLOCATION</h1></div>
        <div className="basis-[33%]"></div>
      </div>
        <div className="mt-[50px]"> 
        <Iframe url="http://54.157.207.178:3200/"
        width="90%"
        height="100%"  
        id=""
        className=""
        display="block"
        position='absolute'
        />
        </div>
        </>
    )
}