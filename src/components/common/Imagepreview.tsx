"use client"
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { X } from 'lucide-react'

export default function Imagepreview({image ,callback}: {image:string , callback:() => void}) {
  return (

       <div className=' relative border-2 rounded-xl '>

        <Image src={image} width={10} height={10}
        className=' w-full object-contain' alt='image' />

        <Button variant="secondary" size="icon" className=' absolute top-2 right-2 '
        onClick={callback}
        >
          <X/>
        </Button>
       </div>

    
  )
}
