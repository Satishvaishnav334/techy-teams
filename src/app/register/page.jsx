'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { useLoadingContext } from "@/components/context/LoadingContext";
export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();
  const {setLoading} = useLoadingContext()
  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('name', name);
      const res = await axios.post("/api/auth/member-register", formData)
      toast.success(res.data.message, { closeButton: true })
      router.push('/dashboard')
    } catch (error) {
      toast.error(error.massage, { closeButton: true })
      console.error("Error fetching users:", error);
    }
    finally{
      setLoading(false)

    }
  };

  useEffect(() => {
    const checkSession = () => {
      const token = getCookie('token')
      if (token) {
        router.replace(`/dashboard`)
      }
    }
    checkSession()
    setTimeout(() => {
      checkSession()
    }, 2000)
  }, [])
  return (
    <div className="  flex md:flex-row flex-col   items-center justify-around  h-[90vh] text-black mb-15 md:mb-0  lg:gap-10 gap-5">
      <div className="bg-yellow-300 w-full h-full flex justify-center items-center ">
        <h1 className="font-bold text-2xl">Branding </h1>
      </div>

      {/* <div className="bg-blue-200 md:w-full sm:w-[70%] h-[75%]  md:m-10 m-2 rounded-2xl shadow-2xl shadow-black/50"> */}
            <div className="bg-blue-200 lg:w-full w-[90%] md:h-[75%]  md:m-10 m-2 rounded-2xl shadow-2xl shadow-black/50">


        <form onSubmit={handleLogIn} className="lg:p-10 p-5 sm:mx-5 flex flex-col gap-3 ">
          <h1 className="text-3xl font-bold text-center">Create New Account</h1>
          <label className="block font-semibold text-2xl">Name</label>
          <input
            type="text"
            className="border border-gray-600 text-xl rounded-2xl w-full p-2"
            placeholder="Enter Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <lable className="block font-semibold text-2xl ">Email</lable>
          <input
            type="text"
            className="border border-gray-600 text-xl rounded-2xl w-full p-2"
            placeholder="Enter Email Address "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="block font-semibold text-2xl ">Password</label>
          <input
            type="password"
            className="border border-gray-600 text-xl rounded-2xl w-full p-2"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="bg-blue-600 font-semibold text-white px-3 py-1 mt-3  rounded-lg text-xl" type="submit">Sign Up</button>
        </form>
        <p className="w-full flex  justify-center md:my-0 sm:py-5 p-3 md:py-0 ">
          I have an account
          <Link href='/login' className="text-red-500 mx-2 font-bold"> Login</Link>
        </p>
      </div>
    </div>  
  );
}
