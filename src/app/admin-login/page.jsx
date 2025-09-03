'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next/client";
import Link from "next/link";
import { toast } from 'sonner'
import { useLoadingContext } from "@/components/context/LoadingContext";
import { Input, Typography } from "@material-tailwind/react";
import { useAdminContext } from "@/components/context/AdminContext";
export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { setLoading } = useLoadingContext()




  const handleLogIn = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      const res = await axios.post("/api/auth/admin-login", formData)
      toast.success(res.data.message, { closeButton: true })
      router.push(`/admin/dashboard`)
      setIsLogin(true)
    } catch (error) {
      console.log(" users:", error.message);
      // toast.error("Invalid email or password", { closeButton: true })
    }
    finally {
      setLoading(false)

    }
  };

  return (
    <div className="  flex md:flex-row flex-col   items-center justify-around  h-[90vh] text-black mb-15 md:mb-0  lg:gap-10 gap-5">


      <div className="bg-blue-200  w-[90%] lg:w-[30%] md:h-[55%]  md:m-10 m-2 rounded-2xl shadow-2xl shadow-black/50">
        <form onSubmit={handleLogIn} className="lg:p-10 p-5 flex flex-col gap-3 md:mx-5">
          <h1 className="text-3xl font-bold mb-6 text-center">Admin Log In</h1>
          <Typography variant="xl" className=" text-left font-medium !text-gray-900" >
            Username Or Email
          </Typography>
          <Input type="text" className=" focus:border-t-gray-900  border-gray-500 rounded-lg w-full p-2"
            placeholder="Enter Your Email Address OR Username *"
            required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            containerProps={{
              className: "min-w-full",
            }}
            labelProps={{
              className: "hidden",
            }}
          />

          <Typography variant="xl" className=" text-left font-medium !text-gray-900" >
            Password
          </Typography>
          <Input type="password" className=" focus:border-t-gray-900 border-gray-500 rounded-lg w-full p-2"
            placeholder="Enter Your Password *"
            required={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            containerProps={{
              className: "min-w-full",
            }}
            labelProps={{
              className: "hidden",
            }}
          />

          <button className="bg-blue-600 hover:bg-blue-700 mt-3 font-semibold text-white px-3 py-1 rounded-lg text-xl" type="submit">Login</button>

        </form>

      </div>
    </div>
  );
}