"use client"
import React, {useState, useRef} from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { User } from '@supabase/supabase-js'
import { Image } from 'lucide-react'
import { Button } from '../ui/button'
import Imagepreview from '../common/Imagepreview'
 import {v4 as uuiv4} from  'uuid'
import { createClient} from "@/lib/supabase/supabaseClient"
import { toast } from 'react-toastify'
import Env from '@/Env'
export default function AddPost({children}: {user: User ,children: React.ReactNode}) {

    const [open , setOpen] =  useState(false);
    const [previewUrl , setPreviewUrl] = useState(false)
    const [image , setImage] = useState(null);
    const imageRef = useRef<HTMLInputElement | null >(null)
    const [content , setContent] = useState("")
    const [loading, setLoading] = useState(false)
    const supabase = createClient()
    const handleImageIcon = () => {
        imageRef.current?.click()
    }

    const removePreview = () => {
       setImage(null)
       if( imageRef.current) {
        imageRef.current.value = "";
       }
       setPreviewUrl(false)
    };

    const addPost  = async (user) => {
      setLoading(true)
      const payload:PostPayloadType = {


        content: content,
        user_id: user.id
      }

      if(image) {
             const path = `${user.id}/${uuiv4()}`
             const {data , error} = await supabase.storage.from(Env.S3_BUCKET).
             upload(path , image)
             if(error) {
              setLoading(false)
              toast.error("something went wrong" , {theme: 'colored'})
                 return
             }
             payload.image = data.path
      }


      const {error} = await supabase.from("posts").insert(payload)

      if(error) {
        toast.error("something went wrong while upload the post" , {theme: "colored"})
        setLoading(false)
        return
      }
 
      resetState()
      setLoading(false)
      toast.success("post add successfully" , {theme:"colored"})
      setOpen(false)
    }

    const  resetState = () => {
        setContent("");
        removePreview()
    }

    


    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
               const selectedFile = event.target.files?.[0]
               if(selectedFile) {
                setImage(selectedFile)
                const imageUrl = URL.createObjectURL
                (selectedFile)
                setPreviewUrl(imageUrl)
               }
    }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild >{children}</DialogTrigger>
  <DialogContent onInteractOutside={(e) => e.preventDefault()}>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
    <textarea className='  bg-muted w-full rounded-lg outline-none h-32 p-2 border '
    placeholder='Add your thoughts'
    value={content}
    onChange={( event)=> setContent( event.target.value) }
    >

    </textarea>


    {previewUrl && <Imagepreview image={previewUrl} callback={removePreview}/> }
    <input type='file'  className=' hidden ' ref={imageRef} accept='image/png, image/jpeg,
     image/webp , image/svg'
     onChange={handleImageChange}
     />
    <div className=' flex justify-between items-center mt-2'>
        <Image className=' cursor-pointer ' onClick={handleImageIcon} />
        <Button size="sm" disabled={content.length <= 1} onClick={addPost}> {loading ? "procesing" : "Post"}</Button>
    </div>
  </DialogContent>
</Dialog>

  )
}
