import Login from "@/components/auth/Login"
import Register from "@/components/auth/Register"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Image from "next/image"

export default  function login() {
  return (
   <div className=" flex h-screen flex-col justify-center items-center">
    <div className=" ">
    <Image src="/images/logo_512.png" width={80} height={80}
    alt='logo' />
    <p className=" font-bold"> Freelacers</p>
    <p className=" text-sm"> A community of freelancers</p>
    </div>
     <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="password">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
       <Login/>
      </TabsContent>
      <TabsContent value="password">
        <Register/>
      </TabsContent>
    </Tabs>
   </div>
  )
}
