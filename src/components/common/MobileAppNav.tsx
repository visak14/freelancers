"use client"
import { MenuIcon, Plus, Settings } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

export default function MobileAppNav() {
  return (
    <div className=' md:hidden ' >
        <nav className=' flex justify-between items-center p-2 '>
            <MenuIcon size={30}/>
            <Image
          src="/images/logo_512.png"
          width={30}
          height={40}
          alt="logo"
          priority={true}
        />
        <Settings size={30}/>
            </nav>  

            <Button className=' bg-primary absolute bottom-2 right-2 h-12 w-12 rounded-full flex justify-center items-center text-white'>
            <Plus/>
            </Button>     
    </div>
  )
}
