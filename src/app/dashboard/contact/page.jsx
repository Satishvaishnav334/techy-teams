'use client';
import { useForm } from "react-hook-form"
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next/client";
import { toast } from 'sonner'
export default function Page() {

  const { register, handleSubmit,  formState: { errors }, } = useForm()
  const router = useRouter();

  // useEffect(() => {
  //   const checkSession = () => {
  //     const token = getCookie('token')
  //     const name = getCookie('name')
  //     if (token) {
  //       router.replace(`/`)
  //     }
  //   }
  //   checkSession()
  //   setTimeout(() => {
  //     checkSession()
  //   }, 2000)
  // }, [])

  const onSubmit = async (e,data) => {
    e.preventDefault()
    try {
      const res = await axios.post("/api/auth/member-login", data)
      console.log(res.data)
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    finally {
      toast.success("Login Succesfully", { closeButton: true })
    }
  }
  useEffect(()=>{
    onSubmit()
  },[register])
  return (
    <div className="  flex flex-col items-center justify-center min-h-screen text-black bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Log In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="h-screen flex flex-col justify-center items-center">
        <label className="block font-semibold text-2xl  my-1">Username or Email</label>
        <input className="border border-gray-600 text-xl rounded-2xl w-full p-2"     {...register("mail", { required: "Email Address is required" })}
        aria-invalid={errors.mail ? "true" : "false"}
      />
        <label className="block font-semibold text-2xl  my-1">Password</label>
        <input className="border border-gray-600 text-xl rounded-2xl w-full p-2" {...register("lastName", { pattern: /^[A-Za-z]+$/i })} placeholder="password" />
           {errors.mail && <p role="alert">{errors.mail.message}</p>}
        {/* <label className="block font-semibold text-2xl  my-1">Email</label>
        <input className="border border-gray-600 text-xl rounded-2xl w-full p-2" type="number" {...register("age", { min: 18, max: 99 })} /> */}
        <button type="submit" className="bg-blue-600 mt-100 font-semibold text-white px-3 py-2 my-2 rounded-lg text-xl" defaultValue="Login" >Login</button>
      </form>
    </div>
  );
}


// 'use client'
// import { useForm } from "react-hook-form"


// export default function page() {
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//   } = useForm()
//   const onSubmit = (data) => console.log(data)


//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input
//         {...register("firstName", { required: true })}
//         aria-invalid={errors.firstName ? "true" : "false"}
//       />
//       {errors.firstName?.type === "required" && (
//         <p role="alert">First name is required</p>
//       )}


//       <input
//         {...register("mail", { required: "Email Address is required" })}
//         aria-invalid={errors.mail ? "true" : "false"}
//       />
//       {errors.mail && <p role="alert">{errors.mail.message}</p>}


//       <input type="submit" />
//     </form>
//   )
// }