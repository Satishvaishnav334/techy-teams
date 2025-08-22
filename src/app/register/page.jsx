'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from "sonner";
export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();
  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('name', name);
      const res = await axios.post("/api/auth/member-register", formData)
      toast.success(res.data.message, { closeButton: true })
      router.push('dashboard')
    } catch (error) {
      toast.error("Cannot Create Account ", { closeButton: true })
      console.error("Error fetching users:", error);
    }
  };

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
  return (
    <div className="  flex md:flex-row flex-col   items-center justify-around  h-[90vh] text-black   lg:gap-10 gap-5">
      <div className="bg-yellow-300 w-full h-full  ">

      </div>

      <div className="bg-blue-200 md:w-full sm:w-[70%] h-[75%]  md:m-10 m-2 rounded-2xl shadow-2xl shadow-black/80">

        <form onSubmit={handleLogIn} className="lg:p-10 p-5 flex flex-col gap-3 ">
          <h1 className="text-3xl font-bold ">Create Account</h1>
          <label className="block font-semibold text-2xl">Name</label>
          <input
            type="text"
            className="border border-gray-600 text-xl rounded-2xl w-full p-2"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <lable className="block font-semibold text-2xl ">Email</lable>
          <input
            type="text"
            className="border border-gray-600 text-xl rounded-2xl w-full p-2"
            placeholder="Enter Your Email Address"
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

          <button className="bg-blue-600 font-semibold text-white px-3 py-2 my-2 mt-5 rounded-lg text-xl" type="submit">Sign Up</button>
          <p className="mx-auto w-full">Login Here</p>
        </form>
      </div>
    </div>
    // <div className="  flex flex-col items-center justify-center min-h-screen text-black bg-gray-100">
    //   <h1 className="text-3xl font-bold mb-6">Log In</h1>
    //   <form onSubmit={handleLogIn} encType="multipart/form-data" className="p-4 m-2 bg-white rounded shadow-md">
    //     <label className="block font-semibold text-2xl  my-1">Name</label>
    //     <input
    //       type="text"
    //       className="border border-gray-600 text-xl rounded-2xl w-full p-2"
    //       placeholder="Enter Your Name"
    //       value={name}
    //       onChange={(e) => setName(e.target.value)}
    //     />
    //     <lable className="block font-semibold text-2xl  my-1">Email</lable>
    //     <input
    //       type="text"
    //       className="border border-gray-600 text-xl rounded-2xl w-full p-2"
    //       placeholder="Enter Your Email Address"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <label className="block font-semibold text-2xl  my-1">Password</label>
    //     <input
    //       type="password"
    //       className="border border-gray-600 text-xl rounded-2xl w-full p-2"
    //       placeholder="Enter Your Password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />

    //     <button className="bg-blue-600 font-semibold text-white px-3 py-2 my-2 rounded-lg text-xl" type="submit">Sign Up</button>
    //   </form>
    // </div>
  );
}
