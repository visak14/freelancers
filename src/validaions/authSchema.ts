import vine from '@vinejs/vine'
import { customErrorReporter } from './customErrorReporter'



vine.errorReporter = () =>  new customErrorReporter()
const registerSchema = vine.object ({
    name: vine.string().minLength(2).maxLength(150),
    username: vine.string().minLength(2).maxLength(50),
    email: vine.string().email(),
    password: vine 
     .string()
     .minLength(6)
     .maxLength(32)
     .confirmed()

})


const loginSchema = vine.object ({
   
    email: vine.string().email(),
    password: vine 
     .string()
 
     

})

export const LoginValidator = vine.compile(loginSchema)
export const RegisterValidator = vine.compile(registerSchema)