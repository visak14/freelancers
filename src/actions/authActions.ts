"use server"
import { LoginValidator,  RegisterValidator } from '@/validaions/authSchema';
import vine, {errors} from '@vinejs/vine'

import { createClient} from '@/lib/supabase/supabaseServer'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function registerAction( prevState:any,  formdata:FormData) {
    const supabase = createClient(cookies())


   try{

    const data = {
        name: formdata.get("name"),
        username: formdata.get("username"),
        email: formdata.get("email"),
        password: formdata.get("password"),
        password_confirmation: formdata.get("password_confirmation")
    }

    const payload = await RegisterValidator.validate(data)
    const {data: userData, error} = await supabase
    .from("users")
    .select("id")
    .eq("username" , payload.username)

    if(userData && userData?.length > 0) {
        return {
            status: 400,
            errors: {
                username: "username already exist.please use another username"
            }
        }
    }

    const {error : signupErr}  = await supabase.auth.signUp({
        email: payload.email,
        password: payload.password,
        options: {
            data: {
                name: payload.name,
                username: payload.username
            }
        }
    })

    if(signupErr) {
            return {status: 400 , errors: {email: signupErr.message}}
    }


    await supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password
    }) 


    console.log("The user data is", userData)
    console.log("the error is ", error)
   }

   catch(error){
    if(error instanceof errors.E_VALIDATION_ERROR) {
        return {status: 400 , errors: error.messages}
    }
   }

   return redirect("/")
}


export async function loginAction(prevState: any , formdata: FormData) {
    
    const supabase = createClient(cookies())
    try {
        const data = {
            email: formdata.get("email"),
            password: formdata.get("password")
        }
     
    const payload = await LoginValidator.validate(data)
   
   
   const {error} = await supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password
    }) 

    if(error){
        return {
            status: 400, 
            errors: {
                email: error.message
            }
        }
    }


    console.log("the error is ", error)



    } catch (error) {
        if(error instanceof errors.E_VALIDATION_ERROR) {
            return {status: 400 , errors: error.messages}
        } 
    }

    return redirect("/")
} 