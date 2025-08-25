'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next/client";
import Link from "next/link";
import { toast } from 'sonner'
import { useLoadingContext } from "@/components/context/LoadingContext";
import { Refresh } from "iconsax-react";
export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const {setLoading,setIsLogin ,refresh} = useLoadingContext()
  useEffect(() => {
    const checkSession = () => {
      const token = getCookie('token')
      if (token) {
        router.replace(`/`)
      }
    }
    checkSession()
    // window.location.reload();
    setTimeout(() => {
      checkSession()
    }, 2000)
  }, [])

  
  const handleLogIn = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      const res = await axios.post("/api/auth/member-login", formData)
      toast.success(res.data.message, { closeButton: true })
      router.push(`/dashboard`)
      setIsLogin(true)
    } catch (error) {
      toast.error("Invalid email or password", { closeButton: true })
      console.log(" users:", error.message);
    }
    finally {
      setLoading(false)
      refresh()
    }
  };

  return (
    <div className="  flex md:flex-row flex-col   items-center justify-around  h-[90vh] text-black mb-15 md:mb-0  lg:gap-10 gap-5">
      <div className="bg-yellow-300 w-full h-full flex justify-center items-center ">
        <h1 className="font-bold text-2xl">Branding </h1>
      </div>

      <div className="bg-blue-200 lg:w-full w-[90%] md:h-[65%]  md:m-10 m-2 rounded-2xl shadow-2xl shadow-black/50">
        <form onSubmit={handleLogIn} className="lg:p-10 p-5 flex flex-col gap-3 md:mx-5">
          <h1 className="text-3xl font-bold mb-6 text-center">Log In</h1>
          <label className="block font-semibold text-2xl  my-1">Email</label>
          <input
            type="text"
            className="border border-gray-600 text-xl rounded-2xl w-full p-2"
            placeholder="Enter Your Email Address OR Username"
            required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="block font-semibold text-2xl  my-1">Password</label>
          <input
            type="password"
            className="border border-gray-600 text-xl rounded-2xl w-full p-2"
            placeholder="Enter Your Password"
            required={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-blue-600 hover:bg-blue-700 mt-3 font-semibold text-white px-3 py-1 rounded-lg text-xl" type="submit">Login</button>

        </form>

        <p className="w-full flex  justify-center md:my-0 sm:py-5 p-3 md:py-0 ">
          I Don't have an account
          <Link href='/register' className="text-red-500 mx-2 font-bold"> Sign Up</Link>
        </p>
      </div>
    </div>
  );
}