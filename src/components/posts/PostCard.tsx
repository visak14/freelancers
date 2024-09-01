import React from 'react'
import UserAvatar from '../common/UserAvatar'
import { Bookmark, Heart, MessageCircle, MoreVertical, Send } from 'lucide-react'
import { formatDate, getS3Url } from '@/lib/helper'

export default function PostCard({post}: {post:PostType}) {
  return (
   <div className=' mt-4 bg-muted rounded-2xl  w-full'>
       <div className='flex justify-between items-center p-2'>
        <div className='flex space-x-1'>
          <UserAvatar name={post.users?.profile_image ? getS3Url(post.users?.profile_image) :""} />
          <div className='flex flex-col'>
            <p className='font-bold'>{post.users?.name}</p>
            <p className='text-sm'>{formatDate(post.users?.created_at)}</p>
          </div>
        </div>
        <MoreVertical/>
      </div>
      { post.image && (
      <img src={getS3Url(post.image)} alt="Post Image"
      className=' w-full object-contain rounded-lg'
    
      />
      )  }
     
          <p className=' p-2'>{post.content}</p>
      <div className=' flex justify-between items-center mt-4 p-2 '>
        <div className=' flex space-x-4'>
       <Heart/>
       <MessageCircle/>
       <Send/>
        </div>
        <Bookmark/>
      </div>
      <div className=' flex space-x-4 p-2'>
        <p>Likes {post.likes_count}</p>
        <p>Replies {post.reply_count}</p>
      </div>
    </div>
  )
}
