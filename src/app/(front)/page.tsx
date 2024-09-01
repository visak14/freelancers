import { Button } from "@/components/ui/button";
import Image from "next/image";
import { createClient } from "@/lib/supabase/supabaseServer";
import { cookies } from "next/headers";
import PostCard from "@/components/posts/PostCard";

export default async function Home() {

    const supabase = createClient(cookies())

    const { data} = await supabase.auth.getSession()
     const {data : posts , error} = await supabase.from("posts").select("id,content,image,reply_count,created_at ,users(id,name,username,profile_image) ")

     console.log("The error is" , error)
     console.log("The posts are" , posts)
  return (
    <div>
      {posts && posts.length > 0 && posts.map((item , index) => 
      <PostCard post={item} key={index} />)}
    </div>
  );
}
