'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next/client";
import { toast } from 'sonner'
export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkSession = () => {
      const token = getCookie('token')
      const name = getCookie('name')
      if (token) {
        router.replace(`/`)
      }
    }
    checkSession()
    setTimeout(() => {
      checkSession()
    }, 2000)
  }, [])

  const handleLogIn = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      const res = await axios.post("/api/auth/member-login", formData)
      toast.success(res.data.message, { closeButton: true })
      router.push(`/dashboard`)
    } catch (error) {
      toast.error("Invalid email or password", { closeButton: true })
      console.log(" users:", error.message);
    }
    finally {
    }
  };

  return (
    <div className="  flex md:flex-row flex-col   items-center justify-around  h-[90vh] text-black   lg:gap-10 gap-5">
      <div className="bg-yellow-300 w-full h-full  ">

      </div>

      <div className="bg-blue-200 md:w-full sm:w-[70%] h-[65%]  md:m-10 m-2 rounded-2xl shadow-2xl shadow-black/80">
        <form onSubmit={handleLogIn} className="lg:p-10 p-5 flex flex-col gap-3 ">
          <h1 className="text-3xl font-bold mb-6">Log In</h1>
          <label className="block font-semibold text-2xl  my-1">Email</label>
          <input
            type="text"
            className="border border-gray-600 text-xl rounded-2xl w-full p-2"
            placeholder="Enter Your Email Address"
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
          <button className="bg-blue-600 hover:bg-blue-700 mt-5 font-semibold text-white px-3 py-2 my-2 rounded-lg text-xl" type="submit">Login</button>
          <p className="mx-auto w-full">Sign Up Here</p>
        </form>
      </div>
    </div>
  );
}